require "test_helper"
require "view_component/test_helpers"
require "capybara/minitest"

# The search results layout follows Europeana's (sidebar on the left): see components/results_layout.css.
class ResultsLayoutTest < ActiveSupport::TestCase
  include ViewComponent::TestHelpers
  include Capybara::Minitest::Assertions

  Presenter = Struct.new(:document)
  STYLES = Rails.root.join("app/assets/stylesheets/components")

  def page = Capybara::Node::Simple.new(rendered_content)

  def config = CatalogController.blacklight_config

  def card(fields) = NexusCcs::ResultCardComponent.new(document: Presenter.new(SolrDocument.new(fields)))

  test "the sidebar is a fluid column of clamp(220px, 25%, 320px) from 992px" do
    css = STYLES.join("results_layout.css").read

    assert_includes css, "--sidebar-width: clamp(220px, 25%, 320px);"
    assert_match(/@media \(min-width: 992px\) \{\s+#main-container > \.row \{\s+flex-wrap: nowrap;/, css)
  end

  test "result columns follow Europeana's breakpoints with a 24px gutter" do
    css = STYLES.join("results_layout.css").read
    columns = css.scan(/@media \(min-width: (\d+)px\) \{\s+\.documents-gallery, \.documents-masonry \{ --result-columns: (\d+); \}/)

    assert_equal [ %w[768 2], %w[1200 3], %w[1460 4], %w[1880 5], %w[2520 6], %w[3020 7] ], columns
    assert_includes css, "--results-gutter: 1.5rem;"
  end

  test "the mosaic's layout polyfill gets plain repeat() and 1fr, which it can parse" do
    css = STYLES.join("results_layout.css").read
    assert_match(/\.documents-masonry \{\s+grid-template-columns: repeat\(var\(--result-columns\), 1fr\);/, css)
  end

  test "below 992px the sidebar is a drawer that slides from the left, 320px at most and 75vw at most" do
    css = STYLES.join("filter_drawer.css").read

    drawer = css[/@media \(max-width: 991\.98px\) \{.*?\n  #sidebar \{(.*?)\n  \}/m, 1]

    assert_includes drawer, "position: fixed;"
    assert_includes drawer, "inset: 0 auto 0 0;" # the left edge
    assert_includes drawer, "z-index: 1050;"
    assert_includes drawer, "width: 20rem;"
    assert_includes drawer, "max-width: 75vw;"
    assert_includes drawer, "transform: translateX(-100%);"
    assert_includes css, "rgb(0 0 0 / 70%)"
  end

  test "the filter sidebar, toggle and list card are registered with Blacklight" do
    assert_equal NexusCcs::FilterSidebarComponent, config.index.sidebar_component
    assert_equal NexusCcs::ResultCardComponent, config.view.list.document_component
    assert_equal NexusCcs::FilterToggleComponent, config.index.collection_actions[:filters_toggle].component
  end

  test "the list card's eyebrow is the collection and its footer the licence and format" do
    result = card("collection_ssim" => [ "Medical History Museum" ], "licence_type_ssim" => [ "Copyright - Current" ], "digital_asset_format_ssim" => [ "Image" ])

    assert_equal "Medical History Museum", result.collection
    assert_equal [ "Copyright - Current", "Image" ], result.footer_items
  end

  test "the list card leaves out what the record does not have" do
    result = card("title_tsim" => [ "Untitled" ])

    assert_nil result.collection
    assert_empty result.footer_items
  end

  test "the Filters button says how many filters are applied" do
    with_controller_class(CatalogController) do
      with_request_url("/catalog?q=skull&f[collection_ssim][]=A&f[object_type_ssim][]=B&f[object_type_ssim][]=C") do
        render_inline(NexusCcs::FilterToggleComponent.new)
      end
    end

    assert_selector "button.filters-toggle.d-lg-none[aria-haspopup=dialog][data-controller=filter-toggle]", text: "Filters"
    assert_selector ".filters-toggle__count", text: "2 applied" # two facets, not three values
  end

  test "the Filters button shows no count when nothing is applied" do
    with_controller_class(CatalogController) do
      with_request_url("/catalog?q=skull") { render_inline(NexusCcs::FilterToggleComponent.new) }
    end

    assert_selector "button.filters-toggle"
    assert_no_selector ".filters-toggle__count"
  end
end
