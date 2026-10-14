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

  MULTI = SolrDocument.new(DOC.to_h.merge("id" => "multi", "digital_asset_large_paths_ssim" => %w[/digital-assets/large/a.jpg /digital-assets/large/b.jpg /digital-assets/large/c.jpg],
    "digital_asset_paths_ssim" => %w[/digital-assets/thumbs/a.jpg /digital-assets/thumbs/b.jpg /digital-assets/thumbs/c.jpg])).tap { |doc| doc.instance_variable_set(:@response, DOC.response) }

  PD = SolrDocument.new(DOC.to_h.merge("id" => "pd", "licence_type_ssim" => [ "Public domain - Copyright expired" ],
    "rights_ssim" => [ "[Public domain - Copyright expired] Public Domain / no known copyright restrictions" ])).tap { |doc| doc.instance_variable_set(:@response, DOC.response) }

  FakeService = Struct.new(:doc) do
    def fetch(*) = doc
  end

  # Stands in for Solr on this controller only
  module FakeSolr
    def search_service = FakeService.new({ "multi" => MULTI, "pd" => PD }.fetch(params[:id], DOC))
  end
  StockCatalogController.prepend(FakeSolr)
  BrandedStockCatalogController.prepend(FakeSolr)

  test "renders Blacklight's own record page, none of the site's components" do
    get "/stock/vernon-MHM00394"
    assert_response :success
    assert_select "main#main-container.container"
    assert_select "#document.document h1"
    assert_select "table.document-metadata"
    assert_select "main#main-container.py-5" # 3rem above and below
    assert_select "header .py-5", false # the header shares container_classes; it must not be padded
    assert_select "picture[data-openseadragon] source[media=openseadragon]", 1
    assert_includes response.body, "/digital-assets/large/mhm00394.jpg"
    # the viewer comes before the details
    assert_operator response.body.index("data-openseadragon"), :<, response.body.index("document-metadata")
    assert_select ".site-header, .record-banner, .record-summary, .digital-assets, .persistent-link", false
    assert_select "link[href*='stock_blacklight']"
    assert_includes response.body, %(import "stock_application")
    assert_not_includes response.body, %(import "application")
  end

  test "the details sit under an Object details heading, labelled from the CCS Field labels - Updated sheet" do
    get "/stock/vernon-MHM00394"
    # Europeana's item page: the viewer, the title, who provides the item, then three tabs. "Object details" (every sheet field
    # the record has a value for except the copyright ones, in the sheet's order), "Copyright" (the caption, credit line,
    # copyright, licence, advisory and terms of use) and "Permalink"; a field with no value has no row, and the title (the
    # heading) is not repeated. No "Good to know" tab and no related-collections section.
    assert_select "#document h1", text: "Test record"
    %w[object-details copyright permalink].each { |id| assert_select ".nav-tabs button[data-bs-target='##{id}-pane']" }
    assert_select ".nav-tabs button", 3
    assert_select "#good-to-know-pane", false
    assert_select "[aria-labelledby=related-collections-heading]", false
    assert_not_includes response.body, "Discover related collections"
    details = css_select("#object-details-pane th").map { |th| th.text.strip }
    copyright = css_select("#copyright-pane th").map { |th| th.text.strip }
    assert_equal [ "Creator", "Place", "Collection", "Classification", "Subject" ], details
    assert_equal [ "Copyright", "Credit Line", "Caption" ], copyright
    # the media metadata (the sheet's DAM fields: licence type, advisory, terms of use, producer) is in the media band's modal
    assert_equal [ "Licence Type", "Advisory", "Terms of Use" ], css_select(".modal th").map { |th| th.text.strip }
    assert_select ".modal .modal-title", text: "Media metadata"
    assert_select "#copyright-pane a[href='/help#copyright']", text: "About copyright and terms of use"
    # the permalink, as the design has it: one row of the same table as the other tabs, "Persistent link", the record's page in the
    # site's catalog and a copy icon button (the site's clipboard script) right after it
    assert_select "#permalink-pane table.table-borderless tbody tr", 1
    assert_select "#permalink-pane th[scope=row]", text: "Persistent link"
    assert_select "#permalink-pane td a[href$='/catalog/vernon-MHM00394'][data-clipboard-target=source]", text: /\/catalog\/vernon-MHM00394/
    assert_select "#permalink-pane td button[data-action='clipboard#copy'][aria-label='Copy link'][data-tooltip-title='Copy link'] svg", 1
    assert_select "#permalink-pane article.card, #permalink-pane footer, #permalink-pane input", false
    assert_select "p", text: /provided and maintained by\s*Museum/
    # the licence is a badge with its icon in the Copyright row (not in the media toolbar), above the rights note
    assert_select "section[aria-label='Media toolbar'] .badge", false
    assert_select "#copyright-pane td.blacklight-rights_ssim p .badge svg path", 1
    assert_select "#copyright-pane td.blacklight-rights_ssim p .badge", text: /Copyright - Current/
    # the Copyright card's data is in the table: copyright, credit line, licence, terms of use, advisory, caption
    assert_select "td.blacklight-rights_ssim", text: /\[Copyright - Current\] Used with permission\./
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

  test "the media band follows the CCS design: dark band with the title, the image, a light toolbar with the licence, info and full screen" do
    get "/branded-stock/vernon-MHM00394"
    # a full-width band above the page container, in the layout's slot; one wrapper for band, toolbar and modal (OpenSeadragon's full screen needs the toolbar's parent not to be the body)
    assert_operator response.body.index("Media viewer"), :<, response.body.index('id="main-container"')
    assert_select "article[aria-label=Media] > section.bg-black[aria-label='Media viewer'] header p", text: "Test record"
    assert_select "article[aria-label=Media] picture.osd-image[data-openseadragon]"
    assert_select "article[aria-label=Media] > section[aria-label='Media toolbar'] button[id$=-full-page]", 1
    assert_select "section[aria-label='Media toolbar'] button[data-bs-toggle=modal][aria-label='Media metadata']", 1
    assert_select ".modal.fade[aria-labelledby]", 1
    # Bootstrap tooltips on the info and full screen buttons (no native title as well)
    assert_select "section[aria-label='Media toolbar'] button[data-bs-toggle=modal][data-tooltip-title='Media metadata']:not([title])", 1
    assert_select "section[aria-label='Media toolbar'] button[id$=-full-page][data-tooltip-title='Full screen']:not([title])", 1
    # one image: nothing to page through
    assert_select "button[id$=-previous], button[id$=-next], [data-media-thumbnails]", false
    # no zoom in the first release: no zoom or home buttons, the mouse and keyboard do not navigate
    assert_select "[id$=-zoom-in], [id$=-zoom-out], [id$=-home]", false
    config = JSON.parse(css_select("[data-openseadragon]").first["data-openseadragon"])
    assert_equal false, config["showZoomControl"]
    assert_equal false, config["mouseNavEnabled"]
    assert_equal css_select("section[aria-label='Media toolbar']").first["id"], config["toolbar"]
    assert_not_includes response.body, "div.bg-black"
  end

  test "a record with several images has round previous and next buttons and a row of 80px thumbnails" do
    get "/branded-stock/multi"
    assert_select "article[aria-label=Media] button[id$=-previous].rounded-circle[aria-label='Previous image']", 1
    assert_select "article[aria-label=Media] button[id$=-next].rounded-circle[aria-label='Next image']", 1
    assert_select "nav[data-media-thumbnails][aria-label=Images] button[data-page]", 3
    assert_select "nav[data-media-thumbnails] img[width='80'][height='80'][src='/digital-assets/thumbs/b.jpg']", 1
    config = JSON.parse(css_select("[data-openseadragon]").first["data-openseadragon"])
    assert_equal true, config["sequenceMode"]
    assert_equal false, config.key?("showReferenceStrip")
    assert_equal css_select("nav[data-media-thumbnails]").first["data-viewer"], css_select("picture[data-openseadragon]").first["id"]
    assert_includes response.body, %("stock_media_viewer":)
  end

  test "a public domain record's licence badge has the Public Domain Mark icon and links to its page" do
    get "/branded-stock/pd"
    assert_select "#copyright-pane td.blacklight-rights_ssim a.badge[href='https://creativecommons.org/publicdomain/mark/1.0/'][target=_blank][rel=noopener]" do
      assert_select "svg[viewBox='0 0 496 512']", 1
      assert_select "span", text: "Public domain - Copyright expired"
      assert_select ".visually-hidden", text: "(opens in new window)"
    end
  end

  test "the licence badge picks its icons as Europeana's rights statements do" do
    icons = ->(licence) { StockLicenceBadgeComponent.new(licence: licence).statement }
    assert_equal({ icons: %w[pd], url: StockLicenceBadgeComponent::PUBLIC_DOMAIN_MARK }, icons.("Public domain - Copyright expired"))
    assert_equal %w[zero], icons.("CC0").fetch(:icons)
    assert_equal({ icons: %w[cc by], url: "https://creativecommons.org/licenses/by/4.0/" }, icons.("CC BY"))
    assert_equal({ icons: %w[cc by sa], url: "https://creativecommons.org/licenses/by-sa/4.0/" }, icons.("CC BY-SA"))
    assert_equal %w[cc by nc nd], icons.("CC BY-NC-ND").fetch(:icons)
    assert_equal({ icons: %w[copyright], url: nil }, icons.("Copyright - Current"))
    assert_equal({ icons: %w[copyright], url: nil }, icons.("Reproduction Licence - Current"))
    assert_equal({ icons: [], url: nil }, icons.("Something else"))
    assert_not StockLicenceBadgeComponent.new(licence: "").render?
    assert(StockLicenceIcons::PATHS.values.all? { |view_box, path| view_box.present? && path.start_with?("M") })
  end

  test "the search constraints and Back to search / Previous / Next above a record are left out" do
    assert_equal StockPageHeaderComponent, StockCatalogController.blacklight_config.show.document_header_component
    assert_equal StockPageHeaderComponent, BrandedStockCatalogController.blacklight_config.show.document_header_component
    # even when the record was reached from a search (a search context), the header is not drawn
    header = StockPageHeaderComponent.new(document: DOC, search_context: { "next" => "x" }, search_session: { "id" => 1 })
    assert_not header.render?
    get "/branded-stock/vernon-MHM00394"
    assert_select "#appliedParams, .pagination-search-widgets", false
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
