require "test_helper"

class DefaultDigitalAssetsTest < ActionDispatch::IntegrationTest
  test "a search without a Digital asset choice is sent to the same search with With a digital asset applied" do
    get "/catalog", params: { search_field: "all_fields" }

    assert_redirected_to "/catalog?f%5Bhas_digital_asset%5D%5B%5D=with&search_field=all_fields"
  end

  test "other filters and the query are kept when the default is added" do
    get "/catalog", params: { q: "skull", f: { collection_ssim: [ "Grainger Museum" ] } }

    assert_response :redirect
    query = Rack::Utils.parse_nested_query(URI(response.location).query)
    assert_equal "skull", query["q"]
    assert_equal [ "Grainger Museum" ], query.dig("f", "collection_ssim")
    assert_equal [ "with" ], query.dig("f", "has_digital_asset")
  end

  test "a choice is respected: Without a digital asset, or the any_assets marker left by taking the filter off" do
    get "/catalog", params: { q: "skull", f: { has_digital_asset: [ "without" ] } }
    assert_not response.redirect?

    get "/catalog", params: { q: "skull", any_assets: "1" }
    assert_not response.redirect?
  end

  test "taking the applied filter off leaves the marker so the default is not applied again" do
    field = DigitalAssetFilterField.new(Blacklight::Configuration.new.tap { |c| c.add_facet_field("has_digital_asset", query: { with: { label: "With", fq: "x:true" } }) }.facet_fields["has_digital_asset"],
                                        Blacklight::SearchState.new({ f: { has_digital_asset: [ "with" ] } }.with_indifferent_access, Blacklight::Configuration.new))

    assert_equal "1", field.remove("with").params[DigitalAssetFilterField::ANY_ASSETS_PARAM]
  end

  test "the marker is kept by the links that change the view, sort and page, so the filter stays off" do
    config = CatalogController.blacklight_config

    assert_includes config.search_state_fields, :any_assets
    assert_equal "1", Blacklight::SearchState.new(ActionController::Parameters.new(q: "skull", any_assets: "1"), config).params[:any_assets]
  end
end
