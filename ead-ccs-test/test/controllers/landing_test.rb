require "test_helper"

class LandingTest < ActionDispatch::IntegrationTest
  test "the front page is the home page" do
    get "/"

    assert_response :success
    assert_select "body.page-home h1", "Cultural Collections"
    assert_select ".ccs-hero__search search form"
    assert_select ".ccs-hero__search a.advanced_search[href=?]", "/catalog/advanced"
    assert_select ".home-card__title a", count: 6
    assert_select ".home-about__statement", count: 1
    assert_select ".home-collections__more a[href=?]", "https://museumsandcollections.unimelb.edu.au/collections"
    assert_select ".ccs-section--help, .ccs-section--faq", count: 0
  end

  test "a bare search page goes to the home page with the hero search" do
    get "/catalog"

    assert_redirected_to "/"
  end
end
