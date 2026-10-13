require "test_helper"

class LandingTest < ActionDispatch::IntegrationTest
  test "the front page is the home page" do
    get "/"

    assert_response :success
    assert_select "body.page-home h1", "Cultural Collections"
    assert_select ".ccs-hero__search search form"
    assert_select ".ccs-hero__search a.advanced_search[href=?]", "/catalog/advanced"
    assert_select ".ccs-card__title a", count: 5
  end

  test "a bare search page goes to the home page with the hero search" do
    get "/catalog"

    assert_redirected_to "/"
  end
end
