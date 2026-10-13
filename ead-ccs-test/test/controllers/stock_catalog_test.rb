require "test_helper"

# /stock/:id is the record page with nothing of the site's own on it (StockCatalogController). Solr is not needed:
# the document is handed to the controller.
class StockCatalogTest < ActionDispatch::IntegrationTest
  DOC = SolrDocument.new("id" => "vernon-MHM00394", "title_tsim" => [ "Test record" ], "format" => [ "Image" ],
    "creator_display_ssim" => [ "Someone" ], "collection_ssim" => [ "Museum" ], "digital_asset_large_paths_ssim" => [ "/digital-assets/large/mhm00394.jpg" ],
    "response" => nil).tap { |doc| doc.instance_variable_set(:@response, Blacklight::Solr::Response.new({ "response" => { "docs" => [] } }, {})) }

  FakeService = Struct.new(:doc) do
    def fetch(*) = doc
  end

  # Stands in for Solr on this controller only
  module FakeSolr
    def search_service = FakeService.new(DOC)
  end
  StockCatalogController.prepend(FakeSolr)
  BrandedStockCatalogController.prepend(FakeSolr)

  test "renders Blacklight's own record page, none of the site's components" do
    get "/stock/vernon-MHM00394"
    assert_response :success
    assert_select "main#main-container.container"
    assert_select "#document.document h1"
    assert_select "dl.document-metadata"
    # spacing and table rows come from Bootstrap utility classes through Blacklight's own options
    assert_select "main#main-container.py-4"
    assert_select "h1.mb-4"
    assert_select "dl.document-metadata.border-top dt.border-bottom.py-2"
    assert_select "dl.document-metadata dd.border-bottom.py-2.mb-0"
    assert_select "#document .openseadragon-container picture[data-openseadragon] source[media=openseadragon]", 1
    assert_includes response.body, "/digital-assets/large/mhm00394.jpg"
    # the viewer comes before the details
    assert_operator response.body.index("openseadragon-container"), :<, response.body.index("document-metadata")
    assert_select ".site-header, .record-banner, .record-summary, .digital-assets, .persistent-link", false
    assert_select "link[href*='stock_blacklight']"
    assert_includes response.body, %(import "stock_application")
    assert_not_includes response.body, %(import "application")
  end

  test "the branded page has the UoM header, breadcrumb and footer around Blacklight's own record" do
    get "/branded-stock/vernon-MHM00394"
    assert_response :success
    assert_select ".site-header"
    assert_select ".breadcrumb-bar [aria-current=page]", text: "Test record"
    assert_select "footer, .site-footer"
    assert_select "#document.document h1"
    assert_select "dl.document-metadata"
    assert_select ".record-banner, .record-summary, .digital-assets, .persistent-link", false
  end
end
