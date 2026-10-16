require "test_helper"

# The site has one design, the light one, whatever the browser or device is set to (light, dark or auto): nothing switches Bootstrap's
# colour mode, and the browser is told the page is light.
class LightThemeTest < ActionDispatch::IntegrationTest
  PAGES = [ "/", "/help", "/about" ].freeze
  LAYOUTS = %w[application pages stock_blacklight branded_stock blacklight/base].freeze

  test "every layout tells the browser the page is light and pins the colour mode" do
    PAGES.each do |path|
      get path

      assert_response :success, path
      assert_select "meta[name=color-scheme][content=light]", count: 1
      assert_includes response.body, 'setAttribute("data-bs-theme", "light")', path
    end
  end

  test "the layouts of the search, record and stock pages include the light theme too" do
    LAYOUTS.each do |layout|
      assert_includes Rails.root.join("app/views/layouts/#{layout}.html.erb").read, 'render "layouts/light_theme"', layout
    end
  end

  test "Blacklight's colour mode switching is off: no theme script from the gem and no theme switcher" do
    [ CatalogController, StockCatalogController, BrandedStockCatalogController ].each do |controller|
      assert_equal false, controller.blacklight_config.dark_mode_support, controller.name
    end

    get "/"
    assert_select "#bl-theme-switcher", count: 0
    assert_not_includes response.body, "prefers-color-scheme"
  end
end
