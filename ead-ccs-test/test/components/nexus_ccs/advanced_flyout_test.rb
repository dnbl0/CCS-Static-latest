require "test_helper"

class AdvancedFlyoutTest < ViewComponent::TestCase
  def render_banner(url)
    with_controller_class(CatalogController) do
      with_request_url(url) { render_inline(NexusCcs::SearchBannerComponent.new(blacklight_config: CatalogController.blacklight_config)) }
    end
  end

  def advanced_params
    Rack::Utils.parse_nested_query(URI(page.find("a.advanced_search")[:href]).query)
  end

  test "the banner's Advanced search link goes to the advanced page, and the controller that opens it in the modal is attached" do
    render_banner("/catalog?q=art")

    assert_equal "/catalog/advanced", URI(page.find("a.advanced_search")[:href]).path
    assert_includes page.find(".search-banner__search")["data-controller"].split, "advanced-flyout"
  end

  test "the current query becomes the form's first all-fields clause" do
    render_banner("/catalog?q=art&page=4")

    assert_equal({ "0" => { "field" => "all_fields", "query" => "art" } }, advanced_params["clause"])
    assert_nil advanced_params["q"]
    assert_nil advanced_params["page"]
  end

  test "filters, ranges, sort and existing clauses prefill the form" do
    render_banner("/catalog?clause[0][field]=title&clause[0][query]=portrait&op=should&f[collection_ssim][]=A&f_inclusive[object_type_ssim][]=B&range[date_start_isi][begin]=1900&range[date_start_isi][end]=1950&sort=title")

    params = advanced_params
    assert_equal({ "0" => { "field" => "title", "query" => "portrait" } }, params["clause"])
    assert_equal "should", params["op"]
    assert_equal({ "collection_ssim" => [ "A" ] }, params["f"])
    assert_equal({ "object_type_ssim" => [ "B" ] }, params["f_inclusive"])
    assert_equal({ "date_start_isi" => { "begin" => "1900", "end" => "1950" } }, params["range"])
    assert_equal "title", params["sort"]
  end

  test "the flyout panel is styled only while the advanced search is in the dialog, so facet lists keep the centred modal" do
    css = Rails.root.join("app/assets/stylesheets/components/advanced_flyout.css").read

    assert_includes css, "#blacklight-modal.advanced-flyout .modal-dialog"
    assert_includes css, "width: 25rem;"
    assert_includes css, "prefers-reduced-motion: reduce"
    assert_includes Rails.root.join("app/assets/stylesheets/application.css").read, "components/advanced_flyout.css"
  end
end
