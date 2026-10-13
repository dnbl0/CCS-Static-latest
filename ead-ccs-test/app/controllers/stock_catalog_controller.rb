# frozen_string_literal: true

# The record page as Blacklight ships it (/stock/:id), for comparing the site's own record page against.
# Deliberately not an ApplicationController (no guest bookmarks, country acknowledgement) and not the
# CatalogController (no NexusCcs components); every setting below is Blacklight's default or the generator's.
class StockCatalogController < ActionController::Base
  include Blacklight::Controller
  include Blacklight::Catalog

  layout "stock_blacklight"

  # The app's helpers/blacklight_helper.rb widens the record page's container; this is the gem's own definition.
  helper do
    def container_classes = blacklight_config.full_width_layout ? "container-fluid" : "container"
  end

  # The gem's own views come first, so the app's overrides of them (catalog/show, shared/footer...) are not used.
  prepend_view_path Blacklight::Engine.root.join("app/views")

  # Blacklight's views live under catalog/, not stock_catalog/.
  def self.local_prefixes = [ controller_path, "catalog" ]

  # This page has no search of its own: the search box and "Back to search" go to the real catalog, the same way
  # the gem's own Blacklight::Bookmarks does.
  def search_action_url(*) = search_catalog_url(*)

  configure_blacklight do |config|
    config.show.title_field = "title_tsim"
    config.show.display_type_field = "format"

    # Plain show fields, as the generator's catalog controller declares them (labels are Solr's field names' words).
    config.add_show_field "creator_display_ssim", label: "Creator"
    config.add_show_field "production_date_ssim", label: "Date"
    config.add_show_field "object_type_ssim", label: "Object type"
    config.add_show_field "production_place_ssim", label: "Place"
    config.add_show_field "description_tsim", label: "Description"
    config.add_show_field "material_ssim", label: "Material"
    config.add_show_field "accession_number_ssim", label: "Accession number"
    config.add_show_field "rights_ssim", label: "Rights"
    config.add_show_field "credit_line_tsim", label: "Credit line"
    config.add_show_field "collection_ssim", label: "Collection"
    config.add_show_field "classification_ssim", label: "Classification"
    config.add_show_field "subject_ssim", label: "Subject"
  end
end
