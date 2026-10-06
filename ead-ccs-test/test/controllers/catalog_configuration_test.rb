require "test_helper"

# Out-of-the-box Blacklight features and plugins, checked as configuration so no Solr is needed.
class CatalogConfigurationTest < ActiveSupport::TestCase
  def config = CatalogController.blacklight_config

  test "result views: list plus the blacklight-gallery grid, mosaic and slideshow" do
    assert_equal %i[gallery list masonry slideshow], config.view.keys.map(&:to_sym).sort - %i[atom rss]
    assert_equal Blacklight::Gallery::DocumentComponent, config.view.gallery.document_component
    assert_equal Blacklight::Gallery::DocumentComponent, config.view.masonry.document_component
    assert_equal Blacklight::Gallery::SlideshowComponent, config.view.slideshow.document_component
  end

  test "per-page options and default" do
    assert_equal [ 12, 24, 48, 96 ], config.per_page
    assert_equal 24, config.default_per_page
  end

  test "sort fields: relevance, title both ways, date both ways" do
    assert_equal %w[date-asc date-desc relevance title title-desc], config.sort_fields.keys.sort
    assert_equal "title_si desc", config.sort_fields["title-desc"].sort
  end

  test "search fields: all, title, creator, subject" do
    assert_equal %w[all_fields creator subject title], config.search_fields.keys.sort
  end

  test "advanced search is on and carries the facets" do
    assert config.advanced_search.enabled
  end

  test "parent/child pivot facet over collection and named collection" do
    assert_equal %w[collection_ssim named_collection_ssim], config.facet_fields["collection_pivot"].pivot
  end

  test "date has a range-limit facet and query facets provide yes/no toggles" do
    assert config.facet_fields["date_start_isi"].range
    assert_equal %w[date description], config.facet_fields["record_includes"].query.keys.map(&:to_s).sort
  end

  test "range, pivot and query facets keep Blacklight's own filter handling" do
    %w[date_start_isi collection_pivot record_includes].each do |key|
      assert_not_equal OrFilterQueryBuilder, config.facet_fields[key].filter_query_builder, "#{key} must keep Blacklight's own filter builder"
    end
    assert_equal OrFilterQueryBuilder, config.facet_fields["subject_ssim"].filter_query_builder
  end

  test "cultural and language group facets only show once a collection is selected" do
    facet = config.facet_fields["cultural_group_ssim"]
    with = Struct.new(:params).new(ActionController::Parameters.new(f: { collection_ssim: [ "University Art Collection" ] }))
    without = Struct.new(:params).new(ActionController::Parameters.new({}))

    assert facet.if.call(with, facet, nil)
    assert_not facet.if.call(without, facet, nil)
  end

  test "every facet field the controller uses is emitted by an indexer" do
    emitted = %w[emu_source vernon_source].sum("") { |name| File.read(Rails.root.join("app/indexers/collections/#{name}.rb")) }
    config.facet_fields.each_value do |facet|
      next if facet.query || facet.pivot || facet.show == false
      field = facet.field || facet.key
      assert_includes emitted, field, "#{field} is not emitted by an indexer (the index would lack this facet)" unless field == "format"
    end
  end

  test "views use the placeholder thumbnail until an image field is indexed" do
    assert_nil config.index.thumbnail_field
    %i[gallery masonry slideshow].each { |view| assert_equal "placeholder-thumbnail.svg", config.view[view].default_thumbnail }
  end
end
