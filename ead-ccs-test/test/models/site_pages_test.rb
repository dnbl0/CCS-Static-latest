require "test_helper"

class SitePagesTest < ActiveSupport::TestCase
  test "every collection of the header menu has a landing page and the browse page lists it" do
    NexusCcs::SiteNavigation.collections.each do |_label, _facet_value, slug|
      assert SitePages.collection(slug), "no landing page data for #{slug}"
    end
    assert_equal SitePages.slugs.sort, SitePages.browse["collections"].map { |collection| collection["slug"] }.sort
  end

  test "an unknown collection is nil" do
    assert_nil SitePages.collection("unknown")
  end

  test "the collections match the static site's collection folders" do
    static = Dir[Rails.root.join("../public/collections/*/index.html")].map { |path| File.basename(File.dirname(path)) }

    assert_equal static.sort, SitePages.slugs.sort if static.any?
  end

  test "the header menu has each collection's label, facet value and slug" do
    assert_equal 5, NexusCcs::SiteNavigation.collections.size
    assert_equal "Harry Brookes Allen Museum of Anatomy and Pathology", NexusCcs::SiteNavigation.facet_value("harry-brookes-allen-museum")
    assert_equal "grainger-museum", NexusCcs::SiteNavigation.slug_for("Grainger Museum Collection")
  end
end
