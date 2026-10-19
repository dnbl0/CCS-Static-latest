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
    assert_selector ".sticky-search input#sticky-search-q"
    scroll_to 0
    assert_no_selector ".sticky-search.is-visible"
  end

  test "the bar is slim and searches the collections" do
    visit root_path
    scroll_to 1200
    assert_selector ".sticky-search.is-visible"

    height = find(".sticky-search").evaluate_script("this.getBoundingClientRect().height")
    assert_operator height, :<=, 64

    fill_in "sticky-search-q", with: "skull"
    click_button "Search", match: :first, visible: :visible
    assert_current_path(/\/catalog\?.*q=skull/)
  end
end
