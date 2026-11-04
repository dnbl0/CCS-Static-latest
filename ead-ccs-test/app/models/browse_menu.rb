# frozen_string_literal: true

# The header's Search collections menu: the collections, with a link under them to the records with images. Every collection link opens
# the whole set: the any_assets marker keeps the default "With a digital asset" filter off (docs/adr/0004). The collections and their
# order come from config/pages.yml (SitePages.menu). The menu shows no record counts.
module BrowseMenu
  Group = Data.define(:id, :heading, :items)
  Item = Data.define(:label, :field, :value)

  COLLECTION_FIELD = "collection_ssim"

  def self.groups
    collections = SitePages.menu.map { |label, value, _slug| Item.new(label, COLLECTION_FIELD, value) }
    [ Group.new("collections", "Museums and collections", collections) ]
  end

  # The query that opens every record with this value
  def self.query(field, value) = { any_assets: "1", f: { field => [ value ] }, search_field: "all_fields" }
end
