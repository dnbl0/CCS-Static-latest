require "test_helper"

# /stock/:id is the record page with nothing of the site's own on it (StockCatalogController). Solr is not needed:
# the document is handed to the controller.
class StockCatalogTest < ActionDispatch::IntegrationTest
  DOC = SolrDocument.new("id" => "vernon-MHM00394", "title_tsim" => [ "Test record" ], "format" => [ "Image" ],
    "creator_display_ssim" => [ "Dolmetsch, Arnold (24 February 1858 \u2013 28-Feb-40) Creator", "Estey Organ Company (1852 \u2013 1961) Maker" ],
    "subject_ssim" => [ "Music" ], "collection_ssim" => [ "Museum" ], "production_place_ssim" => [ "Paris", "France" ],
    "classification_ssim" => [ "Primary", "Secondary" ], "digital_asset_large_paths_ssim" => [ "/digital-assets/large/mhm00394.jpg" ],
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
    assert_select "main#main-container.py-4"
    assert_select "header .py-4", false # the header shares container_classes; it must not be padded
    assert_select "#document .openseadragon-container picture[data-openseadragon] source[media=openseadragon]", 1
    assert_includes response.body, "/digital-assets/large/mhm00394.jpg"
    # the viewer comes before the details
    assert_operator response.body.index("openseadragon-container"), :<, response.body.index("document-metadata")
    assert_select ".site-header, .record-banner, .record-summary, .digital-assets, .persistent-link", false
    assert_select "link[href*='stock_blacklight']"
    assert_includes response.body, %(import "stock_application")
    assert_not_includes response.body, %(import "application")
  end

  test "the details sit under an Object details heading, labelled from the CCS Field labels - Updated sheet" do
    get "/stock/vernon-MHM00394"
    assert_select "section[aria-labelledby=object-details-heading] > h2#object-details-heading", text: "Object details"
    assert_operator response.body.index("Object details"), :<, response.body.index("document-metadata")
    assert_select "dl.document-metadata dt", text: "Creator"
    assert_select "dl.document-metadata dt", text: "Collection"
    # the sheet's own order: Object Type (2), Creator (4), Place (6), Collection (19), Classification (21), Subject (22)
    labels = css_select("dl.document-metadata dt").map { |dt| dt.text.strip }
    assert_equal [ "Creator", "Place", "Collection", "Classification", "Subject" ], labels - [ "Object Type" ]
    assert_select "dl.document-metadata dt", text: "Related Parent Record", count: 0
    # Creator: a person (EMu's "Family, Given") gets the sheet's b./d. form; an organisation keeps its plain dates
    assert_select "dl.document-metadata dd.blacklight-creator_display_ssim", text: "Dolmetsch, Arnold (b. 24 February 1858 - d. 28-Feb-40) Creator"
    assert_select "dl.document-metadata dd.blacklight-creator_display_ssim", text: "Estey Organ Company (1852 \u2013 1961) Maker"
    # Classification and Subject are links to the real catalog's filters
    assert_select "dd.blacklight-classification_ssim a[href^='/catalog'][href*='f%5Bclassification_ssim%5D%5B%5D=']", 2
    assert_select "dd.blacklight-subject_ssim a[href^='/catalog'][href*='f%5Bsubject_ssim%5D%5B%5D=Music']", 1
    # the sheet's joins: Place "with a comma", Classification hyphenated on one line
    assert_select "dl.document-metadata dd.blacklight-production_place_ssim", text: "Paris, France"
    assert_select "dl.document-metadata dd.blacklight-classification_ssim", text: "Primary - Secondary"
    # labels are left-aligned: Blacklight's .dl-invert right-aligns them, Bootstrap's text-md-start overrides it
    assert_select "dl.document-metadata dt.text-md-start", minimum: 1
    assert_select "dl.document-metadata dt:not(.text-md-start)", false
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
