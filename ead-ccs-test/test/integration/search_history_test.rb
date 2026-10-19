require "test_helper"

# CCS-143 uses Blacklight's own search history, as it comes (searches saved in the session, the /search_history page with its
# recent-searches table and Clear history button): nothing here overrides it. Grouping by day (CCS-206) is not in the MVP.
class SearchHistoryTest < ActionDispatch::IntegrationTest
  test "searches are saved and listed on Blacklight's own history page, newest first" do
    get "/catalog", params: { q: "skull" }
    get "/catalog", params: { q: "violin" }

    get "/search_history"

    assert_response :success
    assert_select "h1.page-heading", "Search History"
    assert_select "table.search-history td.query a", count: 2
    assert_select "table.search-history tr:first-child td.query", text: /violin/
    assert_select "a[data-turbo-method=delete]", text: "Clear Search History"
    assert_select ".search-history-day", count: 0 # no custom day headings
  end

  test "the history page is Blacklight's own view, not an override" do
    assert_not Rails.root.join("app/views/search_history").exist?
    assert_not Rails.root.join("app/helpers/search_history_helper.rb").exist?
  end
end
