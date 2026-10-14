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

  # The existing record page (/catalog/:id): its media band is blacklight-gallery's OpenSeadragon viewer, in the band's own layout. The viewer
  # is on the page and shows the first image, a thumbnail shows its image (and is marked as the current one), and axe is clean throughout.
  test "a catalog record page's gallery viewer shows the image a thumbnail chooses, with no axe violations, and its metadata panel opens" do
    StockSolr.documents = { "emu-9044" => stock_document("emu-9044", %w[a b c]) }
    visit "/catalog/emu-9044"
    assert_selector "picture.digital-assets__viewer canvas"
    assert_selector "a.digital-assets__other", count: 3
    assert_selector "a.digital-assets__other[aria-current=true]", count: 1
    assert_accessible

    all("a.digital-assets__other")[2].click
    assert_selector "picture.digital-assets__viewer[aria-label$='image 3 of 3']"
    assert_equal 2, page.evaluate_script("document.querySelector('.digital-assets__viewer').osdViewer.currentPage()")
    assert_selector "a.digital-assets__other[aria-current=true][data-media-viewer-page='2']"

    find("button[aria-controls=media-metadata]").click
    assert_selector "#media-metadata.is-open"
    assert_accessible
  end

  # Audio, video and PDF files sit in the same gallery as the images: a thumbnail tile for each, and the stage shows the one chosen.
  test "a catalog record's gallery switches between its images and its audio, video and PDF files, with no axe violations" do
    media = [ "video|video/mp4|/m/interview.mp4|Interview", "audio|audio/mpeg|/m/oral.mp3|Oral history", "pdf|application/pdf|/m/catalogue.pdf|Catalogue entry" ]
    StockSolr.documents = { "emu-9044" => stock_document("emu-9044", %w[a b], media) }
    visit "/catalog/emu-9044"
    assert_selector "picture.digital-assets__viewer canvas"
    assert_selector "a.digital-assets__other", count: 5
    assert_no_selector "figure.digital-assets__media", visible: :visible
    assert_accessible

    { "Video" => "video", "Audio" => "audio", "PDF" => "object" }.each do |kind, element|
      find("a.digital-assets__other[data-media-viewer-kind=#{kind.downcase}]").click
      assert_selector "figure.digital-assets__media #{element}", visible: :all
      assert_selector "figure.digital-assets__media", count: 1, visible: :visible
      assert_no_selector "figure.digital-assets__main", visible: :visible
      assert_selector "a.digital-assets__other[aria-current=true][data-media-viewer-kind=#{kind.downcase}]"
      assert_accessible
    end

    all("a.digital-assets__other")[1].click
    assert_selector "figure.digital-assets__main", visible: :visible
    assert_no_selector "figure.digital-assets__media", visible: :visible
    assert_equal 1, page.evaluate_script("document.querySelector('.digital-assets__viewer').osdViewer.currentPage()")
  end

  # The band fits the screen: the header, breadcrumb, title strip and the whole band are on a laptop-sized screen without scrolling, and the
  # closed Media metadata panel (waiting off the band's right edge) does not widen the page.
  test "a catalog record's media band fits a laptop screen with no sideways scrolling" do
    page.driver.resize(1280, 800)
    StockSolr.documents = { "emu-9044" => stock_document("emu-9044", %w[a b c]), "vernon-MHM00394" => stock_document("vernon-MHM00394", %w[a]) }

    %w[emu-9044 vernon-MHM00394].each do |id|
      visit "/catalog/#{id}"
      assert_selector "picture.digital-assets__viewer canvas"
      bottom = page.evaluate_script("document.querySelector('.digital-assets').getBoundingClientRect().bottom")
      assert_operator bottom, :<=, 800, "#{id}: the media band ends at #{bottom}px on an 800px screen"
      assert_equal page.evaluate_script("document.documentElement.clientWidth"), page.evaluate_script("document.documentElement.scrollWidth"), "#{id}: the page scrolls sideways"
    end
  end

  test "the home page with the Acknowledgement of Country open has no axe violations" do
    page.driver.clear_cookies
    visit root_path
    assert_selector "#country-acknowledgement[open]"
    assert_accessible
  end
end
