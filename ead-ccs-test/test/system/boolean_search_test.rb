require "application_system_test_case"

# The Advanced search tips promise "match all/any", "+" (required), "-" (exclude), "OR"/"AND"/"NOT" with parentheses and
# quotes. These check each against the real index by comparing result counts, so they do not depend on exact numbers.
class BooleanSearchTest < ApplicationSystemTestCase
  NOMATCH = "zzzqxqxnomatch".freeze

  setup do
    page.driver.set_cookie("country_acknowledged", "1")
  end

  # The number of records a search finds, from the JSON API (the same search as the page)
  def total(params)
    visit search_catalog_path(params.merge(format: :json))
    JSON.parse(page.text).dig("meta", "pages", "total_count")
  end

  test "several plain terms must all match, but + makes a term required and the rest optional" do
    skull = total(q: "skull")
    assert_operator skull, :>, 0

    assert_equal 0, total(q: "skull #{NOMATCH}")
    assert_equal skull, total(q: "+skull #{NOMATCH}")
  end

  test "- and NOT exclude a term, OR and parentheses combine terms" do
    skull = total(q: "skull")

    assert_equal skull, total(q: "skull -#{NOMATCH}")
    assert_equal 0, total(q: "skull -skull")
    assert_equal 0, total(q: "skull NOT skull")
    assert_equal skull, total(q: "skull OR #{NOMATCH}")
    assert_equal skull, total(q: "(skull OR #{NOMATCH}) AND skull")
    assert_equal skull, total(q: "\"skull\"")
  end

  test "the same operators work inside an Advanced search field" do
    skull = total(q: "skull")
    clause = ->(query) { { op: "must", clause: { "0" => { field: "all_fields", query: query } } } }

    assert_equal skull, total(clause.call("+skull #{NOMATCH}"))
    assert_equal skull, total(clause.call("skull OR #{NOMATCH}"))
    assert_equal 0, total(clause.call("skull NOT skull"))
    assert_equal skull, total(clause.call("skull -#{NOMATCH}"))
  end

  # The match menu is a styled select over a hidden <select id="op">; set its value and submit the form
  def search_advanced(title:, subject:, op:)
    visit advanced_search_catalog_path
    # the form starts with one row for each search field, in the order of the menu: all fields, title, creator, subject, description
    fill_in "clause_1_query", with: title
    fill_in "clause_3_query", with: subject
    find("select#op", visible: :all).execute_script("this.value = '#{op}'")
    find("form.advanced").evaluate_script("this.requestSubmit()")
  end

  test "match all needs every field filled in to match, match any needs one" do
    search_advanced(title: "skull", subject: NOMATCH, op: "must")
    assert_current_path(/op=must/)
    assert_selector ".results-empty"

    search_advanced(title: "skull", subject: NOMATCH, op: "should")
    assert_current_path(/op=should/)
    assert_selector ".result-card", minimum: 1
  end

  test "the Search tips card has a well-formed heading and a closed list item for every tip" do
    visit advanced_search_catalog_path

    assert_selector "section.advanced-search-tips h2", text: "Search tips"
    assert_selector "ul.advanced-help > li", count: 8
    assert_equal 0, page.evaluate_script("document.querySelectorAll('ul.advanced-help li li').length")
  end
end
