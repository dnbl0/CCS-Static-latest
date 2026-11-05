require "application_system_test_case"

# axe-core (WCAG 2.2 A and AA, AXE_TAGS) over the pages and the states people reach by clicking
class AccessibilityTest < ApplicationSystemTestCase
  setup { page.driver.set_cookie("country_acknowledged", "1") }

  PAGES = {
    "home" => "/",
    "help" => "/help",
    "search tips" => "/help/search-tips",
    "indigenous cultural data" => "/help/indigenous-data",
    "contact" => "/contact",
    "advanced search" => "/catalog/advanced"
  }.freeze

  PAGES.each do |name, path|
    test "#{name} has no axe violations" do
      visit path
      assert_accessible
    end
  end

  # axe does not test a control's border at all (1.4.11), so it is measured here from computed styles
  CONTRAST_JS = <<~JS.freeze
    const lum = c => { const [r, g, b] = c.match(/[\\d.]+/g).slice(0, 3).map(Number).map(v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4) }); return 0.2126 * r + 0.7152 * g + 0.0722 * b };
    window.contrast = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05) };
  JS

  test "text inputs and selects have a border of at least 3:1 against white (1.4.11)" do
    visit "/catalog/advanced"
    page.execute_script(CONTRAST_JS)
    low = page.evaluate_script(<<~JS)
      [...document.querySelectorAll("form.advanced input[type=text], form.advanced input[type=number], form.advanced select")].filter(e => e.offsetWidth > 0).map(e => {
        const s = getComputedStyle(e);
        return { id: e.id || e.name, width: s.borderTopWidth, ratio: s.borderTopWidth === "0px" ? 0 : contrast(s.borderTopColor, "rgb(255, 255, 255)") };
      }).filter(r => r.ratio < 3)
    JS
    assert_empty low, "controls without a 3:1 boundary: #{low.inspect}"
  end

  test "the check fails on a page with a violation, so a pass means something" do
    visit "/contact"
    page.execute_script("document.body.insertAdjacentHTML('beforeend', '<img src=\"/icon.png\"><button></button>')")

    error = assert_raises(Minitest::Assertion) { assert_accessible }
    assert_match(/image-alt/, error.message)
    assert_match(/button-name/, error.message)
  end

  test "search results have no axe violations" do
    visit search_catalog_path(any_assets: "1", q: "skull")
    assert_selector ".result-card"
    assert_accessible
  end

  # 4.1.2: the facet "Show more" dialog is Blacklight's, which gives it no name; modal_name.js names it after its heading
  test "the facet modal is named after its heading and has no axe violations" do
    visit search_catalog_path(any_assets: "1", q: "skull")
    assert_selector ".result-card"
    page.execute_script("document.querySelector('#sidebar a[data-blacklight-modal=trigger]').click()")
    assert_selector "dialog#blacklight-modal[open] .modal-title"
    title = find("#blacklight-modal .modal-title").text
    assert_equal title, page.evaluate_script("document.getElementById(document.getElementById('blacklight-modal').getAttribute('aria-labelledby')).textContent.trim()")
    assert_accessible
  end

  # 1.4.12 with 1.4.10: a visitor's own text spacing (WCAG's test values) must not make a 320px screen scroll sideways
  test "the home page does not scroll sideways at 320px with WCAG text spacing applied" do
    page.driver.resize(320, 700)
    visit root_path
    page.execute_script("document.head.insertAdjacentHTML('beforeend', '<style>* { line-height: 1.5 !important; letter-spacing: .12em !important; word-spacing: .16em !important } p { margin-bottom: 2em !important }</style>')")
    widths = page.evaluate_script("[document.documentElement.scrollWidth, document.documentElement.clientWidth]")
    assert_operator widths[0], :<=, widths[1], "page is #{widths[0]}px wide in a #{widths[1]}px window"
  ensure
    page.driver.resize(1440, 900)
  end

  # 2.4.7 / 1.4.11: a facet header's focus ring must be a real outline: Bootstrap's 20% box-shadow is about 1.5:1 and is removed in
  # forced-colours mode (Windows High Contrast), which leaves no indicator at all. axe cannot see either, so the style is read here.
  test "facet headers show keyboard focus with a solid outline, not only a shadow" do
    visit search_catalog_path(any_assets: "1", q: "skull")
    assert_selector ".accordion-button"
    style = page.evaluate_script(<<~JS)
      (() => { const b = document.querySelector("#sidebar .accordion-button, .accordion-button"); b.focus({ focusVisible: true });
               const s = getComputedStyle(b); return { style: s.outlineStyle, width: parseFloat(s.outlineWidth), color: s.outlineColor } })()
    JS
    assert_equal "solid", style["style"]
    assert_operator style["width"], :>=, 2
    refute_equal "rgba(0, 0, 0, 0)", style["color"], "a transparent outline is invisible outside forced-colours mode"
  end

  # 1.3.1: axe's heading-order rule is a best practice, outside AXE_TAGS, so the levels are checked here: no heading on the
  # results page goes more than one level below the heading before it (the result titles are h3 under the results' h2)
  test "the results page skips no heading level" do
    visit search_catalog_path(any_assets: "1", q: "skull")
    assert_selector ".result-card h3.document-title-heading"
    levels = page.evaluate_script("[...document.querySelectorAll('main h1, main h2, main h3, main h4, main h5, main h6')].map(h => +h.tagName[1])")
    jumps = levels.each_cons(2).select { |before, after| after > before + 1 }
    assert_empty jumps, "heading levels in <main>: #{levels.inspect}"
  end

  # 2.4.3: Turbo changes the page without a browser load, which leaves focus on <body>; page_focus.js moves it to the new page's h1
  test "after following a link to another page, focus is on that page's heading" do
    visit search_catalog_path(any_assets: "1", q: "skull")
    first(".result-card .document-title-heading a").click
    # Wait for the focus itself, not just for an h1: the results page has a (visually hidden) main h1 too, so waiting for "main h1"
    # passed before Turbo had changed the page and the check ran while the clicked link still had focus.
    assert_selector "main h1:focus"
    assert_equal "H1", page.evaluate_script("document.activeElement.tagName")
  end

  test "a record page has no axe violations" do
    visit search_catalog_path(any_assets: "1", q: "skull")
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
  BrandedStockCatalogController.prepend(StockSolr)

  def stock_document(id, images)
    fields = { "id" => id, "title_tsim" => [ "Untitled [Timber eucalypt specimen cabinet]" ], "format" => [ "Object" ],
               "object_type_ssim" => [ "chest of drawers", "Item" ], "production_date_ssim" => [ "[c. 1919—20]" ],
               "creator_display_ssim" => [ "Grimwade, Sir Wilfrid Russell CBE (1879 \u2013 1955)" ], "production_place_ssim" => [ "Oceania", "Australia" ],
               "accession_number_ssim" => [ "1973.0755.000.A.000.L" ], "collection_ssim" => [ "University Art Collection" ],
               "classification_ssim" => [ "Architecture, buildings and furniture", "furniture - storage / display" ], "subject_ssim" => [ "Architecture, design and furniture" ],
               "licence_type_ssim" => [ "Public domain - Copyright expired" ], "credit_line_tsim" => [ "The University of Melbourne Art Collection" ],
               "rights_ssim" => [ "[Public domain - Copyright expired] Public Domain / no known copyright restrictions" ],
               "digital_asset_large_paths_ssim" => images.map { |name| "/digital-assets/large/#{name}.jpg" },
               "digital_asset_paths_ssim" => images.map { |name| "/digital-assets/thumbs/#{name}.jpg" } }
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

  test "the home page with the Acknowledgement of Country open has no axe violations" do
    page.driver.clear_cookies
    visit root_path
    assert_selector "#country-acknowledgement[open]"
    assert_accessible
  end
end
