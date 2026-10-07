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

  test "the bare search page is every record with a digital asset, as the mosaic" do
    get "/catalog"

    assert_redirected_to "/catalog?f%5Bhas_digital_asset%5D%5B%5D=with&search_field=all_fields&view=masonry"
  end
end
