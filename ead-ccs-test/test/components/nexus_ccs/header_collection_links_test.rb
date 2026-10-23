require "test_helper"
require "view_component/test_helpers"

# The header's Browse Collections menu offers each collection twice: a link to its landing page and a link to
# its search results (the catalog filtered by that collection's facet).
class HeaderCollectionLinksTest < ActiveSupport::TestCase
  include ViewComponent::TestHelpers

  def collection_links
    with_controller_class(CatalogController) do
      with_request_url("/catalog?q=skull") do
        vc_test_controller.action_name = "index"
        component = NexusCcs::HeaderComponent.new(blacklight_config: CatalogController.blacklight_config)
        render_inline(component)
        component.collection_links
      end
    end
  end

  test "each collection has a landing page link and a link to its search results" do
    links = collection_links
    collections = NexusCcs::SiteNavigation.collections

    assert_equal 5, links.size
    assert_equal collections.size, links.size

    links.zip(collections).each do |link, (menu_label, facet_value, slug)|
      assert_equal menu_label, link.label
      assert_equal "/collections/#{slug}", link.href
      assert_equal "/catalog?#{{ f: { collection_ssim: [ facet_value ] } }.to_query}", link.search_href
    end
  end

  test "each search link is a distinct catalog search for its own collection" do
    links = collection_links

    assert_equal links.size, links.map(&:search_href).uniq.size

    links.zip(NexusCcs::SiteNavigation.collections).each do |link, (_menu_label, facet_value, _slug)|
      query = Rack::Utils.parse_nested_query(URI.parse(link.search_href).query)
      assert_equal [ facet_value ], query.dig("f", "collection_ssim")
      assert_includes link.search_href, CGI.escape(facet_value)
    end
  end
end
