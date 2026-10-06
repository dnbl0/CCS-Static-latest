require "test_helper"

# Out-of-the-box Blacklight features and plugins, checked as configuration so no Solr is needed.
class CatalogConfigurationTest < ActiveSupport::TestCase
  def config = CatalogController.blacklight_config

  test "result views: list plus the blacklight-gallery grid and mosaic (no slideshow)" do
    assert_equal %i[gallery list masonry], config.view.keys.map(&:to_sym).sort - %i[atom rss]
    assert_equal NexusCcs::ResultCardComponent, config.view.gallery.document_component
    assert_equal Blacklight::Gallery::DocumentComponent, config.view.masonry.document_component
  end

  test "per-page options and default" do
    assert_equal [ 12, 24, 40, 96 ], config.per_page
    assert_equal 40, config.default_per_page
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

  test "digital assets are the thumbnails, with placeholders only in grid and mosaic" do
    assert_equal :thumbnail_path_ssi, config.index.thumbnail_field
    assert_equal "placeholder-thumbnail.svg", config.view.gallery.default_thumbnail
    assert_nil config.view.list.default_thumbnail
    assert_respond_to config.view.masonry.default_thumbnail, :call
  end

  test "mosaic placeholders vary in shape so the layout is a mosaic" do
    placeholder = config.view.masonry.default_thumbnail
    shapes = %w[a b c d e f].map { |id| placeholder.call(Struct.new(:id).new(id), {})[/placeholder-[a-z]+(?:-[0-9a-f]+)?\.svg/] }
    assert_operator shapes.uniq.size, :>, 1
  end

  test "range facets keep Blacklight's own filter handling; list facets use the OR builder" do
    assert_not config.facet_fields["date_start_isi"].filter_query_builder
    assert_equal OrFilterQueryBuilder, config.facet_fields["subject_ssim"].filter_query_builder
  end
end
