require "test_helper"

# CCS-143 and CCS-206 use Blacklight's own search history (searches saved in the session, the /search_history page).
# What this app adds is the day headings and a session cookie that outlasts the browser, so past days can show.
class SearchHistoryTest < ActionDispatch::IntegrationTest
  test "searches are saved and listed under day headings, newest first" do
    get "/catalog", params: { q: "skull" }
    get "/catalog", params: { q: "violin" }
    Search.all.find { |search| search.query_params["q"] == "skull" }.update_columns(updated_at: 2.days.ago)

    get "/search_history"

    assert_response :success
    assert_select "section.search-history-day h2", text: "Today"
    assert_select "section.search-history-day h2", text: "2 days ago"
    assert_select "section.search-history-day", text: /violin/ do
      assert_select "h2", text: "Today"
    end
  end

  test "the session cookie lasts 30 days so the history survives closing the browser" do
    get "/catalog", params: { q: "skull" }

    cookie = response.headers["Set-Cookie"].to_s
    assert_match(/_ccs_session=/, cookie)
    expires = Time.httpdate(cookie[/expires=([^;]+)/i, 1])
    assert_in_delta 30.days.from_now.to_f, expires.to_f, 1.day.to_f
  end
end
