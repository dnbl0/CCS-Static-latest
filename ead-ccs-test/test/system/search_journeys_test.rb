require "application_system_test_case"

# The main journeys through a real browser, against the Solr core at SOLR_URL (see application_system_test_case.rb)
class SearchJourneysTest < ApplicationSystemTestCase
  setup do
    # The Acknowledgement of Country dialog would sit over the home page; it is covered by its own test
    page.driver.set_cookie("country_acknowledged", "1")
  end

  test "searching from the home page lists the matching records as a mosaic" do
    visit root_path
    within(".ccs-hero__search") do
      fill_in "q", with: "skull"
      click_button "Search"
    end

    assert_current_path(%r{\A/catalog\?.*q=skull})
    assert_selector ".result-card", minimum: 12
    assert_selector ".documents-masonry"
  end

  test "a search with no matches shows the empty state, and its button clears the search" do
    visit search_catalog_path(q: "zzzqxqxnomatch")
    assert_selector ".results-empty .results-empty__title"
    assert_text "Try removing a filter or broadening your search terms."

    click_link "Clear all filters"
    assert_no_selector ".results-empty"
    assert_no_current_path(/zzzqxqx/)
  end

  test "the view buttons switch between the mosaic and the list" do
    visit search_catalog_path(q: "skull")
    assert_selector ".documents-masonry"

    find("a.view-type-list").click
    assert_no_selector ".documents-masonry"
    assert_selector ".documents-list .result-card, .result-card", minimum: 1
    assert_current_path(%r{view=list})
  end

  test "choosing a filter narrows the results and shows what was chosen" do
    visit search_catalog_path(q: "skull")
    everything = find(".search-banner__desc").text

    visit search_catalog_path(q: "skull", f: { collection_ssim: [ "Medical History Museum" ] })

    assert_selector ".result-card", minimum: 1
    assert_text "Medical History Museum"
    assert_not_equal everything, find(".search-banner__desc").text, "the result count changes"
  end

  test "opening a result shows the record and its breadcrumb leads back to the results" do
    visit search_catalog_path(q: "skull")
    title = first(".result-card .document-title-heading a").text
    first(".result-card .document-title-heading a").click

    assert_current_path(%r{\A/catalog/.+})
    assert_selector "h1", text: title.split.first
    assert_selector "nav.breadcrumb-bar li[aria-current=page]"

    click_link "Search results"
    assert_current_path(%r{\A/catalog\?})
    assert_selector ".result-card", minimum: 1
  end

  test "the advanced search link loads the form into a panel without leaving the results" do
    visit search_catalog_path(q: "skull")
    click_link "Advanced search"

    # The panel's own visibility depends on its slide-in, so look at the DOM: the form is in the flyout dialog
    using_wait_time(10) do
      assert_selector "dialog#blacklight-modal.advanced-flyout form", visible: :all
      assert_equal "Advanced search", find("dialog#blacklight-modal h1.modal-title", visible: :all).text(:all)
    end
    assert_current_path(%r{\A/catalog\?.*q=skull})
    assert_selector ".result-card", minimum: 1
  end

  test "the advanced search dropdowns are the site's own, open fully inside the panel and submit the same parameters" do
    page.driver.resize(1440, 900)
    visit search_catalog_path(q: "skull")
    click_link "Advanced search"
    using_wait_time(40) { assert_selector "dialog#blacklight-modal.advanced-flyout .ccs-select--field", minimum: 2, visible: :all }

    # the panel slides in; wait for that to finish before clicking inside it
    settled = 100.times.any? do
      sleep 0.1
      page.evaluate_script("document.querySelector('#blacklight-modal .modal-dialog').getAnimations().length === 0")
    end
    assert settled, "the panel finished sliding in"
    field = find("dialog#blacklight-modal .ccs-select--field", match: :first)
    assert_equal 48, field.find(".dropdown-toggle").evaluate_script("Math.round(this.getBoundingClientRect().height)")
    # triggered, not clicked: the headless browser's hit test reports the transparent full-screen <dialog> over the panel
    field.find(".dropdown-toggle").trigger("click")
    menu = field.find(".dropdown-menu.show")
    inside = menu.evaluate_script("(() => { const r = this.getBoundingClientRect(); return r.left >= 0 && r.right <= innerWidth && r.bottom <= innerHeight })()")
    assert inside, "the open menu is not cut off by the panel or the window"
    assert_equal field.find(".dropdown-toggle").evaluate_script("Math.round(this.getBoundingClientRect().width)"), menu.evaluate_script("Math.round(this.getBoundingClientRect().width)")

    menu.find("button.dropdown-item", text: "Title", exact_text: true).trigger("click")
    assert_equal "Title", field.find(".dropdown-toggle").text
    assert_equal "title", find("select[name='clause[0][field]']", visible: :all).value

    find("dialog#blacklight-modal form.advanced").evaluate_script("this.requestSubmit()")
    assert_current_path(%r{clause%5B0%5D%5Bfield%5D=title|clause\[0\]\[field\]=title})
  end

  test "the pagination is centred under the results" do
    visit search_catalog_path(q: "skull")
    assert_selector ".paginate-section .pagination"

    offsets = page.evaluate_script(<<~JS)
      (function () {
        var list = document.querySelector(".paginate-section .pagination").getBoundingClientRect();
        var items = document.querySelectorAll(".paginate-section .pagination > li");
        var first = items[0].getBoundingClientRect(), last = items[items.length - 1].getBoundingClientRect();
        return { left: first.left - list.left, right: list.right - last.right };
      })()
    JS
    assert_in_delta offsets["left"], offsets["right"], 2, "the page links sit in the middle of the row"
    assert_operator offsets["left"], :>, 50
  end

  test "the back to top button appears once scrolled and returns to the top" do
    visit search_catalog_path(q: "skull")
    assert_no_selector "button.back-to-top", visible: true

    page.execute_script("window.scrollTo(0, 1500)")
    assert_selector "button.back-to-top.is-visible[aria-label='Back to top']", visible: true
    assert_equal "fixed", page.evaluate_script("getComputedStyle(document.querySelector('.back-to-top')).position")

    find("button.back-to-top").click
    using_wait_time(5) { assert_equal 0, page.evaluate_script("Math.round(window.scrollY)") }
    assert_no_selector "button.back-to-top", visible: true
  end

  test "the results page and its banner have no maximum width: the sidebar touches the left edge and the footer keeps the page container" do
    # [window width, banner title left edge (32px gutter, 16px on a phone), footer left edge (1200px of content centred)]
    [ [ 1440, 32, 120 ], [ 2000, 32, 400 ], [ 1000, 32, 32 ], [ 390, 16, 16 ] ].each do |width, banner_left, footer_left|
      page.driver.resize(width, 900)
      visit search_catalog_path(q: "skull")
      assert_selector ".result-card", minimum: 1

      edges = page.evaluate_script(<<~JS)
        (() => {
          const l = (sel) => Math.round(document.querySelector(sel).getBoundingClientRect().left);
          const rightGap = (sel) => Math.round(innerWidth - document.querySelector(sel).getBoundingClientRect().right);
          return { title: l(".search-banner__title"), footer: l(".site-footer__acknowledgement h2"),
                   main: Math.round(document.querySelector("#main-container").getBoundingClientRect().width),
                   sidebar: document.querySelector("#sidebar") && innerWidth >= 992 ? l("#sidebar") : null,
                   results: innerWidth >= 992 ? rightGap("#content") + parseInt(getComputedStyle(document.querySelector("#content")).paddingRight) : null, overflow: document.documentElement.scrollWidth - innerWidth };
        })()
      JS

      assert_equal banner_left, edges["title"], "banner title at #{width}px"
      assert_equal footer_left, edges["footer"], "footer at #{width}px"
      assert_equal width, edges["main"], "the results fill the window at #{width}px"
      assert_equal 0, edges["sidebar"], "sidebar at #{width}px" if width >= 992
      assert_equal 32, edges["results"], "the results end 32px from the right edge at #{width}px" if width >= 992
      assert_equal 0, edges["overflow"], "no horizontal scroll at #{width}px"
    end
  end

  test "with reduced motion the back to top button returns to the top at once" do
    page.driver.resize(1000, 900)
    page.driver.browser.page.command("Emulation.setEmulatedMedia", features: [ { name: "prefers-reduced-motion", value: "reduce" } ])
    visit search_catalog_path(q: "skull")
    page.execute_script("window.scrollTo(0, 1500)")
    assert_selector "button.back-to-top.is-visible", visible: true

    assert_equal "auto", page.evaluate_script("getComputedStyle(document.documentElement).scrollBehavior")
    assert_equal "0s", page.evaluate_script("getComputedStyle(document.querySelector('.back-to-top')).transitionDuration")
    # click and read the position in the same task: a smooth scroll would not have moved yet
    assert_equal 0, page.evaluate_script("(() => { document.querySelector('.back-to-top').click(); return Math.round(window.scrollY) })()")
  end

  test "on a phone the menu opens and its Help section shows the help pages" do
    page.driver.resize(390, 800)
    visit root_path

    assert_no_selector "#site-nav", visible: true
    find("button.site-header__menu").click
    assert_selector "#site-nav", visible: true

    find("button.site-nav__trigger[aria-controls=site-nav-help]").click
    assert_selector "#site-nav-help a", text: "Frequently Asked Questions", visible: true
  end
end
