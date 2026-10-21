require "application_system_test_case"

# The Advanced search form after SearchWorks': rows with a field, a match type (contains all / any, excludes) and the words,
# which can be added and removed, and a match menu (includes all / includes any / excludes all) on every list filter.
# Search results are compared by count, from the JSON API, so they do not depend on exact numbers.
class AdvancedSearchRowsTest < ApplicationSystemTestCase
  NOMATCH = "zzzqxqxnomatch".freeze
  FILTER = "classification_ssim".freeze

  setup { page.driver.set_cookie("country_acknowledged", "1") }

  def total(params)
    visit search_catalog_path(params.merge(format: :json))
    JSON.parse(page.text).dig("meta", "pages", "total_count")
  end

  def submit_form = find("form.advanced").evaluate_script("this.requestSubmit()")

  def row_count = all(".advanced-search-row").size

  test "the form starts with a row for each search field, each with a field, a match type and the words" do
    visit advanced_search_catalog_path

    assert_equal 5, row_count
    assert_equal %w[all_fields title creator subject description], all(".advanced-search-row__field select").map(&:value)
    assert_equal [ "Contains all", "Contains any", "Excludes" ], first(".advanced-search-row__type select").all("option", visible: :all).map { |option| option.text(:all) }
    assert_equal [ "all" ], all(".advanced-search-row__type select").map(&:value).uniq
    assert_selector ".advanced-search-rows__add", text: "Add a field"
  end

  test "Add a field adds a row and focuses it, and the cross removes a row" do
    visit advanced_search_catalog_path
    click_button "Add a field"

    assert_equal 6, row_count
    assert_match(/\Aclause\[\d+\]\[query\]\z/, page.evaluate_script("document.activeElement.name"))
    assert_equal 6, all("input[name$='[query]']").map { |input| input[:name] }.uniq.size

    all(".advanced-search-row__remove").first.click
    assert_equal 5, row_count
  end

  test "removing the last row clears it instead, so the form never has no rows" do
    visit advanced_search_catalog_path
    (row_count - 1).times { all(".advanced-search-row__remove").last.click }
    assert_equal 1, row_count

    fill_in "clause_0_query", with: "skull"
    find(".advanced-search-row__remove").click
    assert_equal 1, row_count
    assert_equal "", find("#clause_0_query").value
  end

  test "an added row can search another field, and its words are searched" do
    visit advanced_search_catalog_path
    click_button "Add a field"
    row = all(".advanced-search-row").last
    row.find("select[name$='[field]']").select "Title"
    row.find("input[name$='[query]']").set "skull"
    submit_form

    assert_selector ".result-card", minimum: 1
    assert_selector ".constraints-container .filter", text: /title\s+skull/i
  end

  test "Contains all needs every word, Contains any needs one" do
    visit advanced_search_catalog_path
    fill_in "clause_0_query", with: "skull #{NOMATCH}"
    find("#clause_0_type").select "Contains all"
    submit_form
    assert_selector ".results-empty"

    visit advanced_search_catalog_path
    fill_in "clause_0_query", with: "skull #{NOMATCH}"
    find("#clause_0_type").select "Contains any"
    submit_form
    assert_selector ".result-card", minimum: 1
    assert_selector ".constraints-container .filter", text: /any of skull/i
  end

  test "an Excludes row leaves out the records that have its words" do
    skull = total(clause: { "0" => { field: "all_fields", query: "skull", type: "all" } })
    all_records = total(q: "")

    visit advanced_search_catalog_path
    fill_in "clause_0_query", with: "skull"
    find("#clause_0_type").select "Excludes"
    submit_form
    assert_selector ".constraints-container .filter", text: /not skull/i
    assert_equal all_records - skull, total(clause: { "0" => { field: "all_fields", query: "skull", type: "none" } })
  end

  test "each list filter has a match menu with includes all, includes any and excludes all, starting at includes any" do
    visit advanced_search_catalog_path

    menu = find("#match_#{FILTER}", visible: :all)
    assert_equal [ "Includes all", "Includes any", "Excludes all" ], menu.all("option", visible: :all).map { |option| option.text(:all) }
    assert_equal "or", menu.value
  end

  test "Includes all, Includes any and Excludes all combine the ticked values as they say" do
    a, b = "Archive", "Documents and publications"
    only_a = total(f: { FILTER => [ a ] })
    only_b = total(f: { FILTER => [ b ] })
    both = total(f: { FILTER => [ a, b ] })
    either = total(f_inclusive: { FILTER => [ a, b ] })
    all_records = total(q: "")

    assert_operator either, :>=, [ only_a, only_b ].max
    assert_equal only_a + only_b - both, either
    assert_equal all_records - either, total(f: { "-#{FILTER}" => [ a, b ] })
  end

  test "ticking values and choosing Excludes all searches without them, shows a Not pill, and the form shows it again" do
    all_records = total(q: "")
    archive = total(f: { FILTER => [ "Archive" ] })

    visit advanced_search_catalog_path
    find("#match_#{FILTER}", visible: :all).execute_script("this.value = 'not'")
    check_value = "Archive"
    find("input[name='f_inclusive[#{FILTER}][]'][value='#{check_value}']", visible: :all).execute_script("this.click()")
    submit_form

    assert_current_path(/f%5B-#{FILTER}%5D/)
    assert_selector ".constraints-container .filter", text: /not archive/i
    assert_equal all_records - archive, total(f: { "-#{FILTER}" => [ "Archive" ] })

    visit advanced_search_catalog_path(f: { "-#{FILTER}" => [ "Archive" ] })
    assert_equal "not", find("#match_#{FILTER}", visible: :all).value
    assert find("input[name='f_inclusive[#{FILTER}][]'][value='Archive']", visible: :all).checked?
  end
end
