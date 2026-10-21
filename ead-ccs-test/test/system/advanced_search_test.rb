require "application_system_test_case"

# The advanced search page (the CCS design, Figma "Advanced Search"): Blacklight's own form under a page banner, beside the search tips.
class AdvancedSearchTest < ApplicationSystemTestCase
  setup { page.driver.set_cookie("country_acknowledged", "1") }

  test "the page banner is the one h1, with the form and the search tips beside each other" do
    visit "/catalog/advanced"

    assert_selector "h1", count: 1
    assert_selector ".page-banner h1", text: "Advanced Search"
    assert_no_selector ".page-banner .page-banner__desc"
    assert_selector ".advanced-search__form form.advanced"
    assert_selector ".advanced-search__tips section.advanced-search-tips h2", text: "Search tips"
    assert_selector "ul.advanced-help > li", count: 8
  end

  test "the match heading reads 'Find items that match all of the fields below'" do
    visit "/catalog/advanced"

    assert_selector "h2.query-criteria-heading", text: /Find items that match .* of the fields below/m
    assert_selector "h2.query-criteria-heading select#op option", count: 2, visible: :all
    assert_selector "h2.limit-criteria-heading", text: /have these attributes/
  end

  test "the form and the tips sit side by side on desktop and stack on a tablet" do
    visit "/catalog/advanced"
    form, tips = %w[.advanced-search__form .advanced-search__tips].map { |s| find(s).evaluate_script("this.getBoundingClientRect().toJSON()") }
    assert_operator tips["left"], :>=, form["right"]
    assert_in_delta 376, tips["width"], 1

    page.driver.resize(820, 1000)
    visit "/catalog/advanced"
    form, tips = %w[.advanced-search__form .advanced-search__tips].map { |s| find(s).evaluate_script("this.getBoundingClientRect().toJSON()") }
    assert_operator tips["top"], :>=, form["bottom"]
  ensure
    page.driver.resize(1440, 900)
  end

  test "a form sent with nothing in it shows the notification once, and a search with a term does not" do
    visit "/catalog/advanced"
    assert_no_selector ".advanced-search__notice"

    click_button "advanced-search-submit"
    assert_current_path "/catalog/advanced?op=must"
    assert_selector ".advanced-search__notice[role=alert]", text: "There is a problem with your search"
    assert_text "Enter at least one search term, or choose an attribute to search by."

    visit "/catalog/advanced"
    assert_no_selector ".advanced-search__notice"

    fill_in "clause_0_query", with: "skull"
    click_button "advanced-search-submit"
    assert_selector ".constraints-label"
    assert_no_selector ".advanced-search__notice"
  end

  test "no attribute lists more than 100 values, so the page stays a usable size" do
    visit "/catalog/advanced"

    counts = all(".advanced-facet-limits .facet-values", visible: :all).map { |list| list.all("li", visible: :all).size }
    assert_not_empty counts
    assert_operator counts.max, :<=, 100
  end
end
