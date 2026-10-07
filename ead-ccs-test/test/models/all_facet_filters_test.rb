require "test_helper"

class AllFacetFiltersTest < ActiveSupport::TestCase
  def config = CatalogController.blacklight_config

  test "pairs lists every value of the list facets in f_all, ignoring range and query facets and unknown names" do
    params = { f_all: { "collection_ssim" => [ "A", "B" ], "has_digital_asset" => [ "with" ], "date_start_isi" => [ "1900" ], "nope" => [ "x" ] } }.with_indifferent_access

    assert_equal [ [ "collection_ssim", "A" ], [ "collection_ssim", "B" ] ], AllFacetFilters.pairs(params, config)
  end

  test "without takes one value out, and the whole parameter when none are left" do
    params = { q: "art", f_all: { "collection_ssim" => [ "A", "B" ] } }.with_indifferent_access

    assert_equal [ "B" ], AllFacetFilters.without(params, "collection_ssim", "A").dig(:f_all, "collection_ssim")
    assert_nil AllFacetFilters.without(AllFacetFilters.without(params, "collection_ssim", "A"), "collection_ssim", "B")[:f_all]
  end

  test "the search builder adds one filter per value, so a record has to have all of them" do
    builder = SearchBuilder.new(nil)
    builder.define_singleton_method(:blacklight_params) { { f_all: { "collection_ssim" => [ "A", "B" ] } }.with_indifferent_access }
    builder.define_singleton_method(:blacklight_config) { CatalogController.blacklight_config }
    solr = {}
    builder.add_all_facet_filters(solr)

    assert_equal [ "{!term f=collection_ssim}A", "{!term f=collection_ssim}B" ], solr[:fq]
  end

  test "f_all is kept in the search state like f and f_inclusive" do
    state = Blacklight::SearchState.new(ActionController::Parameters.new(f_all: { collection_ssim: [ "A" ] }), config)

    assert_equal [ "A" ], state.params.dig(:f_all, :collection_ssim)
  end
end
