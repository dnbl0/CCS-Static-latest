require "test_helper"

class SearchBannerTest < ViewComponent::TestCase
  def render_banner(url)
    with_controller_class(CatalogController) do
      with_request_url(url) { render_inline(NexusCcs::SearchBannerComponent.new(blacklight_config: CatalogController.blacklight_config)) }
    end
  end

  test "the banner attaches the advanced flyout and select dropdown controllers" do
    render_banner("/catalog?q=art")

    wrapper = page.find(".search-banner__search")
    assert_equal "advanced-flyout select-dropdown", wrapper["data-controller"]
    assert_equal "select.search-field", wrapper["data-select-dropdown-selector-value"]
  end

  test "the real query input keeps the query, so the form works without JavaScript" do
    render_banner("/catalog?q=art")

    assert_selector "input[name=q][value=art]"
  end

  test "the advanced search link carries the current query as a first all-fields clause" do
    render_banner("/catalog?q=art&f[collection_ssim][]=Medical+History+Museum&page=3")

    href = page.find_link("Advanced Search")[:href]
    assert_includes href, "/catalog/advanced"
    assert_includes href, "clause%5B0%5D%5Bfield%5D=all_fields"
    assert_includes href, "clause%5B0%5D%5Bquery%5D=art"
    assert_includes href, "Medical+History+Museum"
    assert_not_includes href, "page="
  end
end
