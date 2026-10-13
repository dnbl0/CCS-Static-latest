require "test_helper"

# /stock/:id is the record page with nothing of the site's own on it (StockCatalogController). Solr is not needed:
# the document is handed to the controller.
class StockCatalogTest < ActionDispatch::IntegrationTest
  DOC = SolrDocument.new("id" => "vernon-MHM00394", "title_tsim" => [ "Test record" ], "format" => [ "Image" ],
    "creator_display_ssim" => [ "Dolmetsch, Arnold (24 February 1858 \u2013 28-Feb-40) Creator", "Estey Organ Company (1852 \u2013 1961) Maker" ],
    "subject_ssim" => [ "Music" ], "collection_ssim" => [ "Museum" ], "rights_ssim" => [ "[Copyright - Current] Used with permission." ],
    "credit_line_tsim" => [ "Gift of Someone, 1970" ],
    "licence_type_ssim" => [ "Copyright - Current" ], "production_place_ssim" => [ "Paris", "France" ],
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
    assert_select "table.document-metadata"
    assert_select "main#main-container.py-4"
    assert_select "header .py-4", false # the header shares container_classes; it must not be padded
    assert_select ".openseadragon-container picture[data-openseadragon] source[media=openseadragon]", 1
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
    # Europeana's item page: the title, who provides the item, then four tabs. "Good to know" (creator, date, place, object type,
    # collection), "Object details" (every other sheet field the record has a value for, in the sheet's order), "Copyright"
    # (the caption, credit line, copyright, licence, advisory and terms of use) and "Permalink"; a field with no value has no
    # row, and the title (the heading) is not repeated
    assert_select "#document h1", text: "Test record"
    %w[good-to-know object-details copyright permalink].each { |id| assert_select ".nav-tabs button[data-bs-target='##{id}-pane']" }
    good = css_select("#good-to-know-pane th").map { |th| th.text.strip }
    details = css_select("#object-details-pane th").map { |th| th.text.strip }
    copyright = css_select("#copyright-pane th").map { |th| th.text.strip }
    assert_equal [ "Creator", "Place", "Collection" ], good
    assert_equal [ "Creator", "Place", "Collection", "Classification", "Subject" ], details
    assert_equal [ "Copyright", "Credit Line", "Licence Type", "Advisory", "Terms of Use", "Caption" ], copyright
    assert_select "#copyright-pane a[href='/help#copyright']", text: "About copyright and terms of use"
    # the permalink: the record's page in the site's catalog, a copy button, the accession-number note and a link to the record
    assert_select "#permalink-pane input[readonly][value$='/catalog/vernon-MHM00394']"
    assert_select "#permalink-pane button[data-action='clipboard#copy']", text: "Copy link"
    assert_select "#permalink-pane a[href$='/catalog/vernon-MHM00394']", text: "View full record"
    assert_select "p", text: /provided and maintained by\s*Museum/
    assert_select "section[aria-labelledby=related-collections-heading] a[href^='/catalog'][href*='collection_ssim']", minimum: 1
    # the viewer is on a full-width black stage above the page's container, a black bar of controls under it; the licence badge is in the page
    assert_select "div.bg-black .openseadragon-container picture.osd-image"
    assert_select "div.bg-black .osd-toolbar a[id$=-full-page]"
    assert_operator response.body.index("bg-black"), :<, response.body.index('id="main-container"')
    assert_select "#main-container .badge", text: "Copyright - Current"
    # the Copyright card's data is in the table: copyright, credit line, licence, terms of use, advisory, caption
    assert_select "td.blacklight-rights_ssim", text: "[Copyright - Current] Used with permission."
    assert_select "td.blacklight-credit_line_tsim", text: "Gift of Someone, 1970"
    assert_select "td.blacklight-licence_type_ssim", text: "Copyright - Current"
    assert_select "td.blacklight-gap_29_derived", text: "Used with permission."
    assert_select "td.blacklight-gap_28_derived", text: /not appropriate today/
    assert_select "td.blacklight-caption", text: /Test record\..*Used with permission\.\.?/
    assert_not_includes response.body, "Not available"
    # Creator: a person (EMu's "Family, Given") gets the sheet's b./d. form; an organisation keeps its plain dates
    assert_select "table.document-metadata td.blacklight-creator_display_ssim div", text: "Dolmetsch, Arnold (b. 24 February 1858 - d. 28-Feb-40) Creator"
    assert_select "table.document-metadata td.blacklight-creator_display_ssim div", text: "Estey Organ Company (1852 \u2013 1961) Maker"
    # Classification and Subject are links to the real catalog's filters
    assert_select "td.blacklight-classification_ssim a[href^='/catalog'][href*='f%5Bclassification_ssim%5D%5B%5D=']", 2
    assert_select "td.blacklight-subject_ssim a[href^='/catalog'][href*='f%5Bsubject_ssim%5D%5B%5D=Music']", 1
    # the sheet's joins: Place "with a comma", Classification hyphenated on one line
    assert_select "table.document-metadata td.blacklight-production_place_ssim", text: "Paris, France"
    assert_select "table.document-metadata td.blacklight-classification_ssim", text: "Primary - Secondary"
    # a Bootstrap table that scrolls sideways when narrow, a row header per field, label left and value right
    assert_select ".table-responsive > table.table.table-borderless.document-metadata"
    assert_select "td.border-bottom", minimum: 1
    assert_select "table.document-metadata th[scope=row]", minimum: 1
    assert_select "table.document-metadata th:not([scope=row])", false
  end

  test "the viewer toolbar has full page but no zoom in, zoom out or home" do
    get "/stock/vernon-MHM00394"
    assert_select ".osd-toolbar a[id$=-full-page]", 1
    assert_select ".osd-toolbar a[id$=-zoom-in], .osd-toolbar a[id$=-zoom-out], .osd-toolbar a[id$=-home]", false
    config = JSON.parse(css_select("[data-openseadragon]").first["data-openseadragon"])
    assert_equal false, config["showZoomControl"]
    assert_equal false, config["showHomeControl"]
    assert_nil config["zoomInButton"]
    assert_equal true, config.key?("fullPageButton")
    assert_equal false, config.dig("gestureSettingsMouse", "scrollToZoom")
    # the thumbnail strip stays, and full page brings the toolbar with it
    assert_equal false, config["autoHideControls"]
    assert_select ".osd-toolbar[id$=-toolbar]", 1
    assert_equal css_select(".osd-toolbar").first["id"], config["toolbar"]
    assert_select ".osd-toolbar a[role=button]", minimum: 1
    assert_select "picture.osd-image.d-block"
    assert_select "picture.osd-image.row", false
    assert_includes response.body, %("stock_osd_viewer_fixes":) # pinned, and imported by both pages' scripts
  end

  test "the record has the full width: no empty sidebar column, even with view annotations on" do
    get "/branded-stock/vernon-MHM00394"
    assert_select "#sidebar", false
    assert_select "section#content", false
    assert_select "main#main-container .row > section.col-md-12 #document"
  end

  test "the branded page has the UoM header, breadcrumb and footer around Blacklight's own record" do
    get "/branded-stock/vernon-MHM00394"
    assert_response :success
    assert_select ".site-header"
    assert_select ".breadcrumb-bar [aria-current=page]", text: "Test record"
    assert_select "footer, .site-footer"
    assert_select "#document.document h1"
    assert_select "table.document-metadata"
    assert_select ".record-banner, .record-summary, .digital-assets, .persistent-link", false
  end
end
