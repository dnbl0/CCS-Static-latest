require "test_helper"

# Search requirements from the CCS Jira board (label CCS-2026) that the prototype must meet, kept as tests
# so a story marked Done in the developers' environment stays done here.
class JiraSearchRequirementsTest < ActionDispatch::IntegrationTest
  CONF = Rails.root.join("solr/conf")

  test "CCS-124: the no-results message uses the wording from the story" do
    assert_equal "No results found and no suggestions are available for this search phrase.", I18n.t("blacklight.search.zero_results.title")
  end

  test "CCS-33: the query is cut to 255 characters" do
    assert_equal 255, QueryRules.clean("a" * 300).length
    assert_equal "skull", QueryRules.clean("skull")
  end

  test "CCS-33: special characters are not allowed in a search" do
    {
      "skull!" => "skull",
      "red+blue" => "red blue",
      "*:*" => "",
      "title_tsim:skull" => "title tsim skull",
      "{!lucene}skull" => "lucene skull",
      "[1 TO 5]" => "1 TO 5",
      "50% off\\n" => "50 off n",
      "  many   spaces " => "many spaces"
    }.each { |typed, searched| assert_equal searched, QueryRules.clean(typed), typed.inspect }
  end

  test "CCS-33 and CCS-34: what exact phrase and Boolean searches need, and real names, survive" do
    [ '"compound monocular microscope"', "skull AND (bird OR monkey)", "O'Brien", "Grainger, Percy", "1973.0004", "Lin-Manuel", "caf\u00e9", "\u4e2d\u6587" ].each do |text|
      assert_equal text, QueryRules.clean(text), text
    end
  end

  test "CCS-33: a search of only special characters asks for a valid search string, and never reaches Solr" do
    get "/catalog", params: { q: "!!!" }

    assert_redirected_to root_path
    assert_equal "Please enter a valid search string.", flash[:alert]
  end

  test "CCS-33: the same rule applies to the JSON API and to advanced search fields" do
    get "/catalog.json", params: { q: "*:*" }
    assert_response :unprocessable_content

    get "/catalog", params: { clause: { "0" => { field: "title", query: "{!}" } } }
    assert_redirected_to root_path
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
