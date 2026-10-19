require "application_system_test_case"

# The slim navy search bar fixed to the top of the window: it appears once the page's banner has scrolled away and goes
# again when the banner is back in view.
class StickySearchTest < ApplicationSystemTestCase
  setup do
    page.driver.set_cookie("country_acknowledged", "1")
  end

  def scroll_to(y) = page.execute_script("window.scrollTo(0, #{y})")

  test "the home page bar appears after the hero scrolls away and goes when it returns" do
    visit root_path

    assert_no_selector ".sticky-search.is-visible"
    scroll_to 1200
    assert_selector ".sticky-search.is-visible"
    assert_selector ".sticky-search a.site-header__title", text: "Cultural Collections"
    assert_selector ".sticky-search a.advanced_search"
    assert_selector ".sticky-search input#sticky_q"
    scroll_to 0
    assert_no_selector ".sticky-search.is-visible"
  end

  test "the bar is slim and searches the collections" do
    visit root_path
    scroll_to 1200
    assert_selector ".sticky-search.is-visible"

    height = find(".sticky-search").evaluate_script("this.getBoundingClientRect().height")
    assert_operator height, :<=, 60

    fill_in "sticky_q", with: "skull"
    find("#sticky-search-submit").click
    assert_current_path(/\/catalog\?.*q=skull/)
  end

  test "the title is at the left, the bar in the centre and Advanced Search at the right of the strip" do
    visit root_path
    scroll_to 1200
    assert_selector ".sticky-search.is-visible"

    box = ->(selector) { find(selector).evaluate_script("(() => { const r = this.getBoundingClientRect(); return [r.left, r.right]; })()") }
    title, bar, link = box.call(".sticky-search__title"), box.call(".sticky-search .search-banner__form"), box.call(".sticky-search .advanced_search")
    assert_operator title[1], :<=, bar[0]
    assert_operator bar[1], :<=, link[0]
    window_center = page.evaluate_script("window.innerWidth") / 2.0
    assert_in_delta window_center, (bar[0] + bar[1]) / 2, 2
  end

  # The suggestions are Blacklight's own <auto-complete> element fetching /catalog/suggest. The test index has no suggester
  # dictionary, so the browser's fetch answers that one URL; the sticky bar's wiring is what is under test.
  def stub_suggestions
    page.execute_script(<<~JS)
      const realFetch = window.fetch.bind(window);
      window.fetch = (url, opts) => String(url).includes("/catalog/suggest")
        ? Promise.resolve(new Response('<li role="option" class="dropdown-item"><span>sculpture</span></li><li role="option" class="dropdown-item"><span>skeleton sets</span></li>', { status: 200, headers: { "Content-Type": "text/html" } }))
        : realFetch(url, opts);
    JS
  end

  test "typing in the sticky bar offers Blacklight's suggestions in its own list, and choosing one fills the box" do
    visit search_catalog_path(q: "skull", search_field: "all_fields")
    stub_suggestions
    scroll_to 1500
    assert_selector ".sticky-search.is-visible"

    find("#sticky_q").click
    find("#sticky_q").send_keys("sk")
    assert_selector "#sticky-autocomplete-popup li[role=option]", text: "sculpture", visible: :visible
    assert_no_selector "#autocomplete-popup li[role=option]", visible: :visible # the banner's own list is left alone

    find("#sticky-autocomplete-popup li[role=option]", text: "skeleton sets").click
    assert_equal "skeleton sets", find("#sticky_q").value
  end
end
