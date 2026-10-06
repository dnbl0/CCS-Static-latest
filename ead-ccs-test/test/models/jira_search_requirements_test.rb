require "test_helper"

# Search requirements from the CCS Jira board (label CCS-2026) that the prototype must meet, kept as tests
# so a story marked Done in the developers' environment stays done here.
class JiraSearchRequirementsTest < ActiveSupport::TestCase
  CONF = Rails.root.join("solr/conf")

  test "CCS-124: the no-results message uses the wording from the story" do
    assert_equal "No results found and no suggestions are available for this search phrase.", I18n.t("blacklight.search.zero_results.title")
  end

  test "CCS-33: the query is cut to 255 characters before searching" do
    host = Class.new do
      def self.prepend_before_action(*) = nil
      include QueryLimit
      attr_reader :params

      def initialize(query) = @params = { q: query }
      public :limit_query_length
    end

    long = host.new("a" * 300).tap(&:limit_query_length)
    short = host.new("skull").tap(&:limit_query_length)

    assert_equal 255, long.params[:q].length
    assert_equal "skull", short.params[:q]
  end

  test "CCS-116: synonyms apply to queries only, and the synonym file holds the curated vocabulary" do
    schema = Nokogiri::XML(CONF.join("schema.xml").read)
    text = schema.at_xpath("//fieldType[@name='text']")

    assert text.at_xpath("analyzer[@type='query']/filter[@class='solr.SynonymGraphFilterFactory']"), "query analyzer needs the synonym filter"
    assert_nil text.at_xpath("analyzer[@type='index']/filter[@class='solr.SynonymGraphFilterFactory']"), "synonyms must not be applied at index time"

    rules = CONF.join("synonyms.txt").read.lines.map(&:strip).reject { |line| line.empty? || line.start_with?("#") }
    assert_includes rules, "doctor, physician, surgeon, clinician, medic"
    assert(rules.any? { |rule| rule.start_with?("instrument =>") && rule.include?("harp") })
    assert rules.none? { |rule| rule.include?("aaa") || rule.include?("pixima") }, "Solr's sample synonyms should be gone"
  end

  test "CCS-116: a specific word never widens to a general one" do
    rules = CONF.join("synonyms.txt").read.lines.grep(/=>/)
    left_sides = rules.map { |rule| rule.split("=>").first.strip }

    assert_not_includes left_sides, "harp"
    assert_not_includes left_sides, "doctor"
  end

  test "CCS-206: search history headings are Today, Yesterday, then N days ago" do
    today = Date.new(2026, 10, 6)
    helper = Object.new.extend(SearchHistoryHelper)

    assert_equal "Today", helper.history_day_label(today, today: today)
    assert_equal "Yesterday", helper.history_day_label(today - 1, today: today)
    assert_equal "2 days ago", helper.history_day_label(today - 2, today: today)
    assert_equal "4 days ago", helper.history_day_label(today - 4, today: today)
  end

  test "the service runs in Melbourne time, so history days match its users' days" do
    assert_equal "Melbourne", Time.zone.name
  end
end
