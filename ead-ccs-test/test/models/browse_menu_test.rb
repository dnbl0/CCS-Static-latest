require "test_helper"

class BrowseMenuTest < ActiveSupport::TestCase
  test "one group: the collections in menu order" do
    groups = BrowseMenu.groups

    assert_equal [ "Museums and collections" ], groups.map(&:heading)
    assert_equal SitePages.menu.map(&:first), groups.first.items.map(&:label)
  end

  test "each link knows its label, field and value, and nothing about a record count" do
    collections, = BrowseMenu.groups
    grainger = collections.items.find { |item| item.value == "Grainger Museum Collection" }

    assert_equal %i[label field value], BrowseMenu::Item.members
    assert_equal [ "collection_ssim", "Grainger Museum Collection" ], [ grainger.field, grainger.value ]
  end

  test "the menu asks Solr for nothing: there is no count to fetch" do
    refute_respond_to BrowseMenu, :counts
  end

  test "every link opens all of its records, keeping the default Digital asset filter off" do
    assert_equal({ any_assets: "1", f: { "classification_ssim" => [ "Archive" ] }, search_field: "all_fields" }, BrowseMenu.query("classification_ssim", "Archive"))
    assert_nil SearchDefaults.decide(BrowseMenu.query("classification_ssim", "Archive").deep_stringify_keys, html: true, get: true, catalog: true)
  end
end
