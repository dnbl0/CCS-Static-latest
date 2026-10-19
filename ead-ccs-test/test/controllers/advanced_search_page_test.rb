require "test_helper"

# The advanced search page (the CCS design, Figma "Advanced Search"): Blacklight's own form under a page banner, beside the search tips;
# a form sent with nothing in it goes back with a notification instead of searching every record.
class AdvancedSearchPageTest < ActionDispatch::IntegrationTest
  EMPTY_FORM = { op: "must", clause: { "0" => { field: "all_fields", query: "" }, "1" => { field: "title", query: "" } }, sort: "relevance" }.freeze

  test "the page has the page banner as its one h1, then the form and the search tips" do
    get "/catalog/advanced"

    assert_response :success
    assert_select "h1", count: 1
    assert_select ".page-banner h1", "Advanced Search"
    assert_select ".page-banner .page-banner__desc", count: 0
    assert_select ".advanced-search__columns .advanced-search__form form.advanced"
    assert_select ".advanced-search__columns .advanced-search__tips section.advanced-search-tips h2", "Search tips"
  end

  test "the match heading reads 'Find items that match all of the fields below' with the operator menu in it" do
    get "/catalog/advanced"

    assert_select "h2.query-criteria-heading", /Find items that match/
    assert_select "h2.query-criteria-heading select#op option", count: 2
    assert_select "h2.limit-criteria-heading", /have these attributes/
  end

  test "the search tips are a well-formed list of eight tips" do
    get "/catalog/advanced"

    assert_select "ul.advanced-help > li", count: 8
    assert_select ".advanced-search-tips h4", count: 0
  end

  test "no notification until the form has been sent empty" do
    get "/catalog/advanced"

    assert_select ".advanced-search__notice", count: 0
  end

  test "a form sent with nothing in it goes back to the form with a notification, keeping the all/any choice" do
    get "/catalog", params: EMPTY_FORM

    assert_redirected_to "/catalog/advanced?op=must"
    follow_redirect!
    assert_select ".advanced-search__notice[role=alert]" do
      assert_select ".advanced-search__notice-title", "There is a problem with your search"
      assert_select ".advanced-search__notice-body", "Enter at least one search term, or choose an attribute to search by."
    end

    get "/catalog/advanced"
    assert_select ".advanced-search__notice", count: 0 # shown once
  end

  test "a term, an attribute or a range is something to search for" do
    [
      EMPTY_FORM.merge(clause: { "0" => { field: "all_fields", query: "skull" } }),
      EMPTY_FORM.merge(f_inclusive: { collection_ssim: [ "Grainger Museum Collection" ] }),
      EMPTY_FORM.merge(range: { date_start_isi: { begin: "1900", end: "1950" } })
    ].each do |params|
      get "/catalog", params: params

      assert_response :success, params.inspect
    end
  end

  test "a search from the search bar is not an advanced search" do
    get "/catalog", params: { q: "", search_field: "all_fields", f: { collection_ssim: [ "Grainger Museum Collection" ] } }

    assert_response :success
  end
end
