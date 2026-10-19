require "application_system_test_case"

# The breadcrumb strip at the widths either side of the 768px breakpoint: the trail or the back link shows, never neither
# and never both. A content page (PageBreadcrumbsComponent) and a search page (BreadcrumbComponent), in a real browser.
class BreadcrumbWidthsTest < ApplicationSystemTestCase
  setup { page.driver.set_cookie("country_acknowledged", "1") }

  # width => whether the back link (and not the trail) shows
  WIDTHS = { 375 => true, 767 => true, 768 => true, 1024 => false }.freeze

  def shown?(selector)
    page.evaluate_script("(function (e) { return !!e && getComputedStyle(e).display !== 'none' && e.getBoundingClientRect().height > 0 })(document.querySelector(#{selector.to_json}))")
  end

  def style(selector, property)
    page.evaluate_script("getComputedStyle(document.querySelector(#{selector.to_json}))[#{property.to_json}]")
  end

  def assert_strip_at_each_width(trail, back, label)
    WIDTHS.each do |width, narrow|
      page.driver.resize(width, 900)
      assert_equal !narrow, shown?(trail), "trail at #{width}px"
      assert_equal narrow, shown?(back), "back link at #{width}px"
      next unless narrow

      assert_equal label, find(back).text
      assert_equal "8px", style(back, "columnGap")
      assert_equal "8px 12px", style(back, "padding")
      assert_equal "18px", style(back, "fontSize")
      assert_equal "rgb(255, 255, 255)", style(back, "color")
      assert_equal "14px", style("#{back} svg", "width")
    end
  ensure
    page.driver.resize(1440, 900)
  end

  test "a content page shows the trail or the link back to its parent at every width" do
    visit indigenous_data_path
    assert_strip_at_each_width ".page-breadcrumbs .page-local-history", ".page-breadcrumbs .breadcrumb-bar__back", "Help and support"
    assert_selector ".page-breadcrumbs a.breadcrumb-bar__back[href='#{help_path}']", visible: :all
  end

  test "a top-level content page's back link is Cultural Collections" do
    visit about_path
    assert_strip_at_each_width ".page-breadcrumbs .page-local-history", ".page-breadcrumbs .breadcrumb-bar__back", "Cultural Collections"
  end

  test "a search page shows the trail or the back link at every width" do
    visit search_catalog_path(q: "skull")
    assert_strip_at_each_width ".breadcrumb-bar .breadcrumb-bar__trail", ".breadcrumb-bar .breadcrumb-bar__back", "Cultural Collections"
  end
end
