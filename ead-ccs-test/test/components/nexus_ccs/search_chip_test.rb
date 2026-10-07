require "test_helper"

class SearchChipTest < ViewComponent::TestCase
  def render_banner(url)
    with_controller_class(CatalogController) do
      with_request_url(url) { render_inline(NexusCcs::SearchBannerComponent.new(blacklight_config: CatalogController.blacklight_config)) }
    end
  end

  test "a query attaches the search chip controller with the query and where clearing it goes" do
    render_banner("/catalog?q=art&f[collection_ssim][]=Medical+History+Museum&page=3")

    wrapper = page.find(".search-banner__search")
    assert_includes wrapper["data-controller"].split, "search-chip"
    assert_equal "art", wrapper["data-search-chip-query-value"]
    clear = wrapper["data-search-chip-clear-url-value"]
    assert_not_includes clear, "q=art"
    assert_not_includes clear, "page="
    assert_includes clear, "Medical+History+Museum"
  end

  test "the real query input keeps the query, so the form works without JavaScript" do
    render_banner("/catalog?q=art")

    assert_selector "input[name=q][value=art]"
  end

  test "without a query the controller is attached with no chip values" do
    render_banner("/catalog")

    wrapper = page.find(".search-banner__search")
    assert_includes wrapper["data-controller"].split, "search-chip"
    assert_nil wrapper["data-search-chip-query-value"]
  end

  test "the controller makes the chip a real button named for the search" do
    source = Rails.root.join("app/javascript/controllers/search_chip_controller.js").read

    assert_includes source, 'document.createElement("button")'
    assert_includes source, "Clear search"
    assert_includes source, '"Backspace"'
  end
end
