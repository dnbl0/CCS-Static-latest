require "test_helper"

# A form sent with nothing in it goes back to the advanced search form (the redirect happens before Solr is asked anything).
# The page itself is checked in test/system/advanced_search_test.rb, which has Solr.
class AdvancedSearchPageTest < ActionDispatch::IntegrationTest
  EMPTY_FORM = { op: "must", clause: { "0" => { field: "all_fields", query: "" }, "1" => { field: "title", query: "" } }, sort: "relevance" }.freeze

  test "a form sent with nothing in it goes back to the form, keeping the all/any choice" do
    get "/catalog", params: EMPTY_FORM

    assert_redirected_to "/catalog/advanced?op=must"
  end

  test "a term, an attribute or a range is something to search for, so there is no redirect" do
    [
      EMPTY_FORM.merge(clause: { "0" => { field: "all_fields", query: "skull" } }),
      EMPTY_FORM.merge(f_inclusive: { collection_ssim: [ "Grainger Museum Collection" ] }),
      EMPTY_FORM.merge(range: { date_start_isi: { begin: "1900", end: "1950" } }),
      { q: "", search_field: "all_fields", f: { collection_ssim: [ "Grainger Museum Collection" ] } } # the search bar, not the form
    ].each do |params|
      get "/catalog", params: params.merge(any_assets: "1")

      assert_not response.redirect?, params.inspect
    end
  end
end
