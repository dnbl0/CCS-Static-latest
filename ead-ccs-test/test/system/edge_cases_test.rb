require "application_system_test_case"

# Hand-edited and out-of-date addresses that reach the results page. They need Solr, so they run with the system tests.
class EdgeCasesTest < ApplicationSystemTestCase
  setup { page.driver.set_cookie("country_acknowledged", "1") }

  test "an advanced search row for a field this site does not search is ignored, and the search still runs" do
    visit "/catalog?any_assets=1&q=skull&search_field=all_fields&clause[0][field]=nope&clause[0][query]=x"

    assert_selector ".result-card"
    assert_no_text "Routing Error"
    assert_no_text "Something went wrong"
  end

  test "a date range with From later than To is dropped, the search runs, and the visitor is told" do
    visit "/catalog?any_assets=1&q=skull&search_field=all_fields&range[date_start_isi][begin]=2000&range[date_start_isi][end]=1000"

    assert_text "The From year must not be later than the To year, so the date range was not used."
    assert_selector ".result-card"
    assert_no_selector "[href*='range%5Bdate_start_isi%5D']", text: /1000/
  end

  test "paging far past the last page shows a page, not an error" do
    visit "/catalog?any_assets=1&q=skull&search_field=all_fields&page=99999"

    assert_no_text "Something went wrong"
    assert_selector ".site-header"
  end
end
