require "test_helper"

# The app has no user model, so bookmarks are unavailable. Blacklight 9.0.0 raised
# NameError here (see BookmarksController); it should redirect with the login notice.
class BookmarksTest < ActionDispatch::IntegrationTest
  test "bookmarks page redirects instead of raising when there is no user" do
    get "/bookmarks"
    assert_redirected_to root_path
  end
end
