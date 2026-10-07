require "test_helper"

class LandingTest < ActionDispatch::IntegrationTest
  test "the bare front page is every record with a digital asset, as the mosaic" do
    get "/"

    assert_redirected_to "/?f%5Bhas_digital_asset%5D%5B%5D=with&search_field=all_fields&view=masonry"
  end
end
