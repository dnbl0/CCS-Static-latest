require "application_system_test_case"

# axe-core (WCAG 2.1 A and AA) over the pages and the states people reach by clicking
class AccessibilityTest < ApplicationSystemTestCase
  setup { page.driver.set_cookie("country_acknowledged", "1") }

  PAGES = {
    "home" => "/",
    "browse collections" => "/collections",
    "a collection" => "/collections/grainger-museum",
    "help" => "/help",
    "search tips" => "/help/search-tips",
    "indigenous cultural data" => "/help/indigenous-data",
    "contact" => "/contact"
  }.freeze

  PAGES.each do |name, path|
    test "#{name} has no axe violations" do
      visit path
      assert_accessible
    end
  end

  test "the check fails on a page with a violation, so a pass means something" do
    visit "/contact"
    page.execute_script("document.body.insertAdjacentHTML('beforeend', '<img src=\"/icon.png\"><button></button>')")

    error = assert_raises(Minitest::Assertion) { assert_accessible }
    assert_match(/image-alt/, error.message)
    assert_match(/button-name/, error.message)
  end

  test "search results have no axe violations" do
    visit search_catalog_path(q: "skull")
    assert_selector ".result-card"
    assert_accessible
  end

  test "a record page has no axe violations" do
    visit search_catalog_path(q: "skull")
    first(".result-card .document-title-heading a").click
    assert_selector "h1"
    assert_accessible
  end

  # The new record pages (/stock/:id and /branded-stock/:id), which exist for the two records of StockRecords only: one with several images and
  # one with a single image. They are given stand-in records with images, a licence, a rights note and the other fields the page draws, because
  # the test index has no digital asset files, so the viewer, thumbnails, tabs and the media metadata modal would not be on the page to check.
  # axe runs in every state people reach by clicking: the default tab, each other tab, and the modal. What axe cannot judge (the image's text
  # alternative, the tab order and focus rings) is asserted in test/controllers/stock_catalog_test.rb.
  module StockSolr
    mattr_accessor :documents

    def search_service
      return super unless StockSolr.documents

      Struct.new(:doc) { def fetch(*) = doc }.new(StockSolr.documents.fetch(params[:id]))
    end
  end
  StockCatalogController.prepend(StockSolr)
  CatalogController.prepend(StockSolr)
  BrandedStockCatalogController.prepend(StockSolr)

  def stock_document(id, images, media = [])
    fields = { "id" => id, "title_tsim" => [ "Untitled [Timber eucalypt specimen cabinet]" ], "format" => [ "Object" ],
               "object_type_ssim" => [ "chest of drawers", "Item" ], "production_date_ssim" => [ "[c. 1919—20]" ],
               "creator_display_ssim" => [ "Grimwade, Sir Wilfrid Russell CBE (1879 \u2013 1955)" ], "production_place_ssim" => [ "Oceania", "Australia" ],
               "accession_number_ssim" => [ "1973.0755.000.A.000.L" ], "collection_ssim" => [ "University Art Collection" ],
               "classification_ssim" => [ "Architecture, buildings and furniture", "furniture - storage / display" ], "subject_ssim" => [ "Architecture, design and furniture" ],
               "licence_type_ssim" => [ "Public domain - Copyright expired" ], "credit_line_tsim" => [ "The University of Melbourne Art Collection" ],
               "rights_ssim" => [ "[Public domain - Copyright expired] Public Domain / no known copyright restrictions" ],
               "digital_asset_large_paths_ssim" => images.map { |name| "/digital-assets/large/#{name}.jpg" },
               "digital_asset_paths_ssim" => images.map { |name| "/digital-assets/thumbs/#{name}.jpg" } }
    fields["digital_media_ssim"] = media if media.any?
    SolrDocument.new(fields).tap { |doc| doc.instance_variable_set(:@response, Blacklight::Solr::Response.new({ "response" => { "docs" => [] } }, {})) }
  end

  teardown { StockSolr.documents = nil }

  # Bootstrap fades a tab pane and a modal in; axe measured mid-fade reads washed-out colours. Waits until the element is fully opaque.
  def wait_until_opaque(selector)
    Timeout.timeout(5) { sleep 0.05 until page.evaluate_script("getComputedStyle(document.querySelector(#{selector.to_json})).opacity") == "1" }
  end

  StockRecords::IDS.product(%w[stock branded-stock]).each do |id, prefix|
    test "the new record page /#{prefix}/#{id} has no axe violations in any tab or with the media metadata modal open" do
      StockSolr.documents = { "emu-9044" => stock_document("emu-9044", %w[a b c d]), "vernon-MHM00394" => stock_document("vernon-MHM00394", %w[a]) }
      visit "/#{prefix}/#{id}"
      assert_selector "h1"
      assert_selector "[role=img][aria-label]"
      assert_selector "[data-media-thumbnails] button", count: 4 if id == "emu-9044"
      assert_accessible

      %w[copyright permalink].each do |tab|
        find("##{tab}-tab").click
        assert_selector "##{tab}-pane.show.active"
        wait_until_opaque("##{tab}-pane")
        assert_accessible
      end

      find("button[data-bs-toggle=modal][aria-label='Media metadata']").click
      assert_selector ".modal.show"
      wait_until_opaque(".modal.show")
      assert_accessible
    end
  end

  # The record page's media band (/catalog/:id), after the CCS UI "Record" (Figma 429:36672): the title, byline and tags on the left and, when the record
  # has digital assets, blacklight-gallery's viewer on the right. The three designed states are checked here: no asset, one asset, several assets.
  def band_geometry
    page.evaluate_script(<<~JS)
      (() => {
        const rect = (selector) => { const e = document.querySelector(selector); if (!e) return null; const b = e.getBoundingClientRect(); return { left: b.left, width: b.width, height: b.height, bottom: b.bottom } }
        return { band: rect('.digital-assets'), text: rect('.digital-assets__text'), column: rect('.digital-assets__viewer-column'), display: rect('.digital-assets__display'),
                 page: { clientWidth: document.documentElement.clientWidth, scrollWidth: document.documentElement.scrollWidth } }
      })()
    JS
  end

  test "no asset: the band is the title, byline and tags alone, with no axe violations" do
    StockSolr.documents = { "emu-9044" => stock_document("emu-9044", []) }
    visit "/catalog/emu-9044"
    assert_selector ".digital-assets h1#record-title", text: "Untitled [Timber eucalypt specimen cabinet]"
    assert_selector ".digital-assets .record-tag", count: 2
    assert_no_selector ".digital-assets__viewer-column"
    assert_no_selector ".record-banner"
    assert_equal 1, page.all("h1").size
    assert_accessible
  end

  test "one asset: the viewer in a 3:2 box on the right of the title, with no thumbnails, no previous and next, and no axe violations" do
    page.driver.resize(1440, 900)
    StockSolr.documents = { "vernon-MHM00394" => stock_document("vernon-MHM00394", %w[1973_0004_000_000_1]) }
    visit "/catalog/vernon-MHM00394"
    assert_selector "picture.digital-assets__viewer canvas"
    assert_no_selector ".digital-assets__others"
    assert_no_selector "button[aria-label=Previous]"

    geometry = band_geometry
    assert_in_delta 0.4611, geometry["text"]["width"] / geometry["band"]["width"], 0.01, "the title column is not the design's 664 of 1440"
    assert_in_delta 1.5, geometry["display"]["width"] / geometry["display"]["height"], 0.02, "the viewer's box is not 3:2"
    assert_operator geometry["display"]["left"], :>, geometry["text"]["left"] + geometry["text"]["width"] - 1, "the viewer is not to the right of the title"
    assert_accessible
  end

  test "several assets: the viewer, the thumbnails beside it, previous and next that step through them, and no axe violations" do
    page.driver.resize(1440, 900)
    media = [ "video|video/mp4|/m/interview.mp4|Interview", "audio|audio/mpeg|/m/oral.mp3|Oral history", "pdf|application/pdf|/m/catalogue.pdf|Catalogue entry" ]
    StockSolr.documents = { "emu-9044" => stock_document("emu-9044", %w[1973_0004_000_000_1 1973_0071_000_000], media) }
    visit "/catalog/emu-9044"
    assert_selector "picture.digital-assets__viewer canvas"
    assert_selector "a.digital-assets__other", count: 5
    assert_selector "a.digital-assets__other[aria-current=true]", count: 1
    assert_selector "button[aria-label=Previous][disabled]"
    assert_no_selector "figure.digital-assets__media", visible: :visible
    assert_accessible

    current = -> { page.evaluate_script("[...document.querySelectorAll('.digital-assets__other')].findIndex(a => a.getAttribute('aria-current') === 'true')") }
    click_on "Next"
    assert_equal 1, current.call
    assert_equal 1, page.evaluate_script("document.querySelector('.digital-assets__viewer').osdViewer.currentPage()")
    assert_selector "button[aria-label=Previous]:not([disabled])"

    click_on "Next"
    assert_equal 2, current.call
    assert_selector "figure.digital-assets__media video", visible: :visible
    assert_no_selector "figure.digital-assets__main", visible: :visible
    assert_accessible

    click_on "Next"
    click_on "Next"
    assert_equal 4, current.call
    assert_selector "figure.digital-assets__media object", visible: :visible
    assert_selector "button[aria-label=Next][disabled]"
    assert_accessible

    click_on "Previous"
    assert_equal 3, current.call
    all("a.digital-assets__other").first.click
    assert_selector "figure.digital-assets__main", visible: :visible
    assert_no_selector "figure.digital-assets__media", visible: :visible
    assert_selector "button[aria-label=Previous][disabled]"

    find("button[aria-controls=media-metadata]").click
    assert_selector "#media-metadata.is-open"
    assert_accessible
  end

  # The band, with the site header and breadcrumb above it, is on a laptop-sized screen without scrolling, and the closed Media metadata panel (waiting
  # off the band's right edge) does not widen the page.
  test "a catalog record's media band fits a laptop screen with no sideways scrolling" do
    page.driver.resize(1280, 800)
    StockSolr.documents = { "emu-9044" => stock_document("emu-9044", %w[1973_0004_000_000_1 1973_0071_000_000 1973_0084_000_000]), "vernon-MHM00394" => stock_document("vernon-MHM00394", %w[1973_0004_000_000_1]) }

    %w[emu-9044 vernon-MHM00394].each do |id|
      visit "/catalog/#{id}"
      assert_selector "picture.digital-assets__viewer canvas"
      geometry = band_geometry
      assert_operator geometry["band"]["bottom"], :<=, 800, "#{id}: the media band ends at #{geometry["band"]["bottom"]}px on an 800px screen"
      assert_equal geometry["page"]["clientWidth"], geometry["page"]["scrollWidth"], "#{id}: the page scrolls sideways"
    end
  end

  # openseadragon-rails writes the viewer's height at start as fixed pixels and OpenSeadragon only notices the window, so a screen of another size, or
  # a window dragged to one, left the image the size it was. The viewer follows the page, and the image is refitted.
  test "a catalog record's image is refitted when the window changes size" do
    StockSolr.documents = { "emu-9044" => stock_document("emu-9044", %w[1973_0004_000_000_1 1973_0071_000_000]) }
    page.driver.resize(1280, 800)
    visit "/catalog/emu-9044"
    assert_selector "picture.digital-assets__viewer canvas"

    fitted = "(() => { const p = document.querySelector('.digital-assets__viewer'), v = p.osdViewer; const size = v.viewport.getContainerSize();
                 return { styled: p.style.height, picture: [p.offsetWidth, p.offsetHeight], viewer: [size.x, size.y],
                          home: Math.abs(v.viewport.getZoom() - v.viewport.getHomeZoom()) < 0.001 } })()"
    before = page.evaluate_script(fitted)
    assert_equal "", before["styled"], "the viewer's height is fixed in pixels"
    assert_equal before["picture"], before["viewer"]

    page.driver.resize(1700, 1200)
    Timeout.timeout(5) { sleep 0.1 until page.evaluate_script("document.querySelector('.digital-assets__viewer').offsetWidth") > before["picture"][0] }
    Timeout.timeout(5) { sleep 0.1 until page.evaluate_script(fitted)["viewer"] == page.evaluate_script(fitted)["picture"] }
    after = page.evaluate_script(fitted)
    assert_operator after["picture"][0], :>, before["picture"][0]
    assert_equal after["picture"], after["viewer"], "OpenSeadragon was not told the viewer's new size"
    assert after["home"], "the image was not fitted to the new size"
  end

  test "the home page with the Acknowledgement of Country open has no axe violations" do
    page.driver.clear_cookies
    visit root_path
    assert_selector "#country-acknowledgement[open]"
    assert_accessible
  end
end
