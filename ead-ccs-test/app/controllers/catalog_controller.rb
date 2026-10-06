# frozen_string_literal: true

# Blacklight controller that handles searches and document requests
class CatalogController < ApplicationController
  include Blacklight::Catalog
  include BlacklightRangeLimit::ControllerOverride

  # If you'd like to handle errors returned by Solr in a certain way,
  # you can use Rails rescue_from with a method you define in this controller,
  # uncomment:
  #
  # rescue_from Blacklight::Exceptions::InvalidRequest, with: :my_handling_method

  # Retries a zero-result search using Solr's spelling collation
  self.search_service_class = ::SearchService

  configure_blacklight do |config|
    # Results per page; the per_page widget offers these and the first request uses the default.
    config.per_page = [ 12, 24, 48, 96 ]
    config.default_per_page = 24

    # Blacklight's default is 'select', which solrconfig.xml now declares.
    # config.solr_path = 'select'

    # solr field configuration for search results/index views
    config.header_component = NexusCcs::HeaderComponent

    config.index.title_field = "title_tsim"

    # Result views: the built-in list, plus grid (gallery) and mosaic (masonry) from blacklight-gallery.
    # Records with a digital asset show it in every view; the rest show a placeholder in grid and
    # mosaic (and nothing in the list). Mosaic placeholders vary in shape, as real images do, so
    # the masonry layout stays a mosaic where images are missing.
    config.index.thumbnail_field = :thumbnail_path_ssi
    mosaic_placeholder = lambda do |document, image_options|
      shape = %w[placeholder-thumbnail.svg placeholder-portrait.svg placeholder-square.svg][document.id.sum % 3]
      ActionController::Base.helpers.image_tag(shape, image_options)
    end
    config.view.gallery(document_component: Blacklight::Gallery::DocumentComponent,
      icon: Blacklight::Gallery::Icons::GalleryComponent, default_thumbnail: "placeholder-thumbnail.svg")
    config.view.masonry(document_component: Blacklight::Gallery::DocumentComponent,
      icon: Blacklight::Gallery::Icons::MasonryComponent, default_thumbnail: mosaic_placeholder)
    config.index.display_type_field = "format"

    config.add_results_document_tool(:bookmark, component: Blacklight::Document::BookmarkComponent, if: :render_bookmarks_control?)

    config.add_results_collection_tool(:sort_widget)
    config.add_results_collection_tool(:per_page_widget)
    config.add_results_collection_tool(:view_type_group)

    config.add_show_tools_partial(:bookmark, component: Blacklight::Document::BookmarkComponent, if: :render_bookmarks_control?)
    # config.add_show_tools_partial(:email, callback: :email_action, validator: :email_params_valid?)
    # config.add_show_tools_partial(:sms, if: :render_sms_action?, callback: :sms_action, validator: :sms_params_valid?)
    # Links out to the record in its source system, behind a "you're leaving this
    # site" interstitial. Guarded here rather than by the component's render?,.
    config.add_show_tools_partial(:view_full_record, component: NexusCcs::ViewFullRecordComponent,
      if: ->(_context, _config, options) {  #so a record with no URL doesn't leave an empty <li>
        NexusCcs::ViewFullRecordComponent.url_for(options[:document]).present?
      })
    config.add_show_tools_partial(:citation)

    config.add_nav_action(:bookmark, partial: "blacklight/nav/bookmark", if: :render_bookmarks_control?)
    config.add_nav_action(:search_history, partial: "blacklight/nav/search_history")

    # solr field configuration for document/show views
    config.show.title_field = "title_tsim"
    config.show.display_type_field = "format"

    # Puts "Start over"/"Back to search" on the same row as the prev/next
    # pagination. Subclasses the Blacklight component and only swaps the template.
    config.show.document_header_component = NexusCcs::DocumentHeaderComponent

    # A record's digital assets, between its title and its metadata.
    config.show.document_embed_component = NexusCcs::DigitalAssetsComponent

    # ================================================================
    # Facets. Note: Every field here is populated by Collections::EmuSource or
    # Collections::VernonSource. A facet on an empty field renders a sidebar box.
    # ================================================================
    # Parent/child: collection > named collection. The two flat facets stay configured (for
    # constraints and advanced search) but the sidebar shows the pivot.
    config.add_facet_field "collection_pivot", label: "Collection", pivot: %w[collection_ssim named_collection_ssim], limit: true
    config.add_facet_field "collection_ssim", label: "Collection", limit: true, show: false
    config.add_facet_field "named_collection_ssim", label: "Named Collection", limit: true, show: false
    config.add_facet_field "classification_ssim", label: "Category", limit: 20
    config.add_facet_field "object_type_ssim", label: "Object Type", limit: 20
    config.add_facet_field "format", label: "Record Type", limit: true
    config.add_facet_field "creator_ssim", label: "Creator", limit: 20, index_range: "A".."Z"
    config.add_facet_field "subject_ssim", label: "Subject", limit: 20, index_range: "A".."Z"
    config.add_facet_field "production_place_ssim", label: "Place of Production", limit: 20

    # Only the EMu export populates these, so offer them once a collection is chosen.
    # Maybe remove but possibly needed for Indigenous flag?
    has_collection = ->(context, _config, _response) { Array(context.params.dig(:f, :collection_ssim)).any? }
    config.add_facet_field "cultural_group_ssim", label: "Cultural Group", limit: true, if: has_collection
    config.add_facet_field "language_group_ssim", label: "Language Group", limit: true, if: has_collection

    # blacklight_range_limit: a histogram and year inputs on the start year.
    config.add_facet_field "date_start_isi", label: "Date", range: true

    # Yes/no toggles as query facets.
    config.add_facet_field "record_includes", label: "Record includes", query: {
      description: { label: "A description", fq: "description_tsim:[* TO *]" },
      date: { label: "A date", fq: "date_start_isi:[* TO *]" },
      digital_asset: { label: "A digital asset", fq: "has_digital_asset_bsi:true" }
    }

    # Self-excluding facets. Tag each facet's fq and have that same facet's counts
    # ignore it (Solr {!tag}/{!ex} local params). Query, range and pivot facets are skipped:
    # the query branch returns :fq verbatim, and range and pivot facets build their own filters.
    config.facet_fields.each_value do |facet|
      next if facet.query || facet.range || facet.pivot

      facet.tag = facet.key
      facet.ex  = facet.key
      facet.filter_query_builder = OrFilterQueryBuilder
    end

    config.add_facet_fields_to_solr_request!

    # ================================================================
    # Search results list
    # ================================================================
    config.add_index_field "creator_tsim", label: "Creator"
    config.add_index_field "collection_ssim", label: "Collection"
    config.add_index_field "object_type_ssim", label: "Object Type"
    config.add_index_field "production_date_ssim", label: "Date"
    config.add_index_field "production_place_ssim", label: "Place"

    # ================================================================
    # Single record view
    # access_condition_ssi and restrictions_tsi are deliberately absent
    # ================================================================
    config.add_show_field "alternative_title_tsim", label: "Alternative Title"
    config.add_show_field "creator_tsim", label: "Creator"
    config.add_show_field "creator_role_ssim", label: "Creator Role"
    config.add_show_field "production_date_ssim", label: "Date"
    config.add_show_field "production_place_ssim", label: "Place of Production"
    config.add_show_field "object_type_ssim", label: "Object Type"
    config.add_show_field "classification_ssim", label: "Category"
    config.add_show_field "description_tsim", label: "Description"
    config.add_show_field "subject_ssim", label: "Subject"
    config.add_show_field "associated_subject_ssim", label: "Associated Entities"
    config.add_show_field "associated_entity_ssim", label: "Associated Name"
    config.add_show_field "associated_entity_place_ssim", label: "Associated Place"
    config.add_show_field "cultural_group_ssim", label: "Cultural Group"
    config.add_show_field "language_group_ssim", label: "Language Group"
    config.add_show_field "collection_ssim", label: "Collection"
    config.add_show_field "named_collection_ssim", label: "Named Collection"
    config.add_show_field "accession_number_ssim", label: "Accession Number"
    config.add_show_field "source_reference_tsim", label: "Source Reference"
    config.add_show_field "credit_line_tsim", label: "Credit Line"
    config.add_show_field "rights_ssim", label: "Rights"
    config.add_show_field "preferred_citation_tsim", label: "Preferred Citation"
    config.add_show_field "related_object_ssim", label: "Related Objects"

    # ================================================================
    # Search fields
    # The qf/pf values are defined in the /select handler in solr/conf/solrconfig.xml
    # ================================================================
    config.add_search_field "all_fields", label: "All Fields"

    config.add_search_field("title") do |field|
      field.solr_parameters = {
        'spellcheck.dictionary': "title",
        qf: "${title_qf}",
        pf: "${title_pf}"
      }
    end

    config.add_search_field("creator") do |field|
      # No spellcheck.dictionary override: the "author" dictionary is built from
      # author_spell, which is fed by author_tsim (not populated)
      field.solr_parameters = {
        qf: "${creator_qf}",
        pf: "${creator_pf}"
      }
    end

    config.add_search_field("subject") do |field|
      field.solr_parameters = {
        'spellcheck.dictionary': "subject",
        qf: "${subject_qf}",
        pf: "${subject_pf}"
      }
    end

    config.advanced_search.enabled = true

    # Set up a default advanced search configuration by using the current
    # search_fields and facet_fields configs.
    if config.advanced_search.enabled
      config.copy_search_field_config_to_advanced!
      config.copy_facet_field_config_to_advanced!
    end

    # ================================================================
    # Sorting
    # date_start_isi rather than pub_date_si
    # title_si rather than author_si
    # ================================================================
    config.add_sort_field "relevance", sort: "score desc, title_si asc", label: "relevance"
    config.add_sort_field "date-desc", sort: "date_start_isi desc, title_si asc", label: "date (newest)"
    config.add_sort_field "date-asc", sort: "date_start_isi asc, title_si asc", label: "date (oldest)"
    config.add_sort_field "title", sort: "title_si asc", label: "title (A-Z)"
    config.add_sort_field "title-desc", sort: "title_si desc", label: "title (Z-A)"

    # If there are more than this many search results, no spelling ("did you
    # mean") suggestion is offered.
    config.spell_max = 100

    # Configuration for autocomplete suggester
    config.autocomplete_enabled = true
    config.autocomplete_path = "suggest"
  end
end
