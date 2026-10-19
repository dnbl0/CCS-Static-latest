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
    assert_select ".home-card__text a[href=?]", "https://museumsandcollections.unimelb.edu.au/collections"
    assert_select ".ccs-section--help, .ccs-section--faq", count: 0
  end

  test "a bare search page goes to the home page with the hero search" do
    get "/catalog"

    assert_redirected_to "/"
  end

  test "every page carries the sticky search bar: a GET search form, hidden until the banner has scrolled away" do
    [ "/", "/help", "/about" ].each do |path|
      get path

      assert_select ".sticky-search[data-controller=sticky-search][inert][aria-hidden=true]", count: 1
      assert_select ".sticky-search form.input-group[action=?][method=get]", "/catalog"
      assert_select ".sticky-search input[name=search_field][value=all_fields]"
      assert_select ".sticky-search label[for=sticky-search-q]"
    end
  end

  test "the sticky search bar keeps the current query" do
    get "/catalog", params: { q: "skull", search_field: "all_fields" }

    assert_select ".sticky-search input#sticky-search-q[value=skull]"
  end
end
