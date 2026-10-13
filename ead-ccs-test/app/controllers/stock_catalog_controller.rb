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
    # The record's digital asset, as Blacklight's own thumbnail (a plain <img>, one image: the field's first value,
    # no viewer script), above the details. The show view has no thumbnail component by default and Blacklight puts
    # its thumbnail slot after the metadata, so the thumbnail is drawn in the embed slot, between title and metadata.
    config.show.thumbnail_field = :thumbnail_path_ssi
    config.show.document_embed_component = StockThumbnailEmbedComponent
    # The thumbnail links to its record through search-session tracking, which this page has no route for:
    # the real catalog's does the same job.
    config.track_search_session.url_helper = "track_catalog_path"

    # Plain show fields, as the generator's catalog controller declares them: one per field of the CCS field labels
    # workbook (seq # in brackets) that the data can carry today (config/data_model/solr_mapping.yml), in its order,
    # with its labels. The title (1) is the heading. Not carried yet: Editions (9), Dimensions (11), Inscription (12),
    # Language (13), Access (20), Source URL (23), and the DAM fields Advisory, Terms of Use, Producer (28-30).
    config.add_show_field "object_type_ssim", label: "Object Type" # 2
    config.add_show_field "production_date_ssim", label: "Date" # 3
    config.add_show_field "creator_display_ssim", label: "Creator" # 4
    config.add_show_field "associated_entity_ssim", label: "Associated Entity" # 5
    config.add_show_field "production_place_ssim", label: "Place" # 6
    config.add_show_field "description_tsim", label: "Description" # 7
    config.add_show_field "series_ssim", label: "Series" # 8
    config.add_show_field "material_ssim", label: "Material" # 10
    config.add_show_field "cultural_group_ssim", label: "Cultural Affiliation" # 14
    config.add_show_field "accession_number_ssim", label: "Accession Number" # 15
    config.add_show_field "rights_ssim", label: "Copyright" # 16
    config.add_show_field "credit_line_tsim", label: "Credit Line" # 17
    config.add_show_field "named_collection_ssim", label: "Named Collection" # 18
    config.add_show_field "collection_ssim", label: "Collection" # 19
    config.add_show_field "classification_ssim", label: "Classification" # 21
    config.add_show_field "subject_ssim", label: "Subject" # 22
    config.add_show_field "parent_record_ssi", label: "Related Parent Record" # 24
    config.add_show_field "licence_type_ssim", label: "Licence Type" # 27 (derived from the rights note)
  end
end
