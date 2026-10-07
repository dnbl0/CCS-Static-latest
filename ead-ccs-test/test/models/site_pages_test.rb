require "test_helper"

class SitePagesTest < ActiveSupport::TestCase
  test "every collection of the header menu has a landing page and the browse page lists it" do
    NexusCcs::SiteNavigation::COLLECTIONS.each do |_label, _facet_value, slug|
      assert SitePages.collection(slug), "no landing page data for #{slug}"
    end
    assert_equal SitePages.slugs.sort, SitePages.browse["collections"].map { |collection| collection["slug"] }.sort
  end

  test "an unknown collection is nil" do
    assert_nil SitePages.collection("unknown")
  end
end
