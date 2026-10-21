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

  test "match all needs every field filled in to match, match any needs one" do
    visit advanced_search_catalog_path
    fill_in "Title", with: "skull"
    fill_in "Subject", with: NOMATCH
    find("select#op", visible: :all).find("option[value=must]", visible: :all).select_option
    find("form.advanced").evaluate_script("this.requestSubmit()")
    assert_selector ".results-empty"

    visit advanced_search_catalog_path
    fill_in "Title", with: "skull"
    fill_in "Subject", with: NOMATCH
    find("select#op", visible: :all).find("option[value=should]", visible: :all).select_option
    find("form.advanced").evaluate_script("this.requestSubmit()")
    assert_selector ".result-card", minimum: 1
  end

  test "the Search tips card has a well-formed heading and a closed list item for every tip" do
    visit advanced_search_catalog_path

    assert_selector ".advanced-search-form h2.card-title", text: "Search tips"
    assert_selector "ul.advanced-help > li", count: 8
    assert_equal 0, page.evaluate_script("document.querySelectorAll('ul.advanced-help li li').length")
  end
end
