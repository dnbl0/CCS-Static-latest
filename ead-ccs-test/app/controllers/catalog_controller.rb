# frozen_string_literal: true

# Blacklight controller that handles searches and document requests
class CatalogController < ApplicationController
  include Blacklight::Catalog

  # If you'd like to handle errors returned by Solr in a certain way,
  # you can use Rails rescue_from with a method you define in this controller,
  # uncomment:
  #
  # rescue_from Blacklight::Exceptions::InvalidRequest, with: :my_handling_method

  # Retries a zero-result search using Solr's spelling collation
  self.search_service_class = ::SearchService

  configure_blacklight do |config|
    ## Default parameters to send to solr for all search-like requests.
    config.default_solr_params = {
      rows: 10
    }

    # Blacklight's default is 'select', which solrconfig.xml now declares.
    # config.solr_path = 'select'

    # solr field configuration for search results/index views
    config.header_component = NexusCcs::HeaderComponent

    config.index.title_field = "title_tsim"
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

    # ================================================================
    # Facets. Note: Every field here is populated by Collections::EmuSource or
    # Collections::VernonSource. A facet on an empty field renders a sidebar box.
    # ================================================================
    config.add_facet_field "collection_ssim", label: "Collection", limit: true
    config.add_facet_field "classification_ssim", label: "Category", limit: 20
    config.add_facet_field "object_type_ssim", label: "Object Type", limit: 20
    config.add_facet_field "format", label: "Record Type", limit: true
    config.add_facet_field "creator_ssim", label: "Creator", limit: 20, index_range: "A".."Z"
    config.add_facet_field "subject_ssim", label: "Subject", limit: 20, index_range: "A".."Z"
    config.add_facet_field "production_place_ssim", label: "Place of Production", limit: 20
    config.add_facet_field "named_collection_ssim", label: "Named Collection", limit: true

    # Only the EMu export populates these. Maybe remove but possibly needed for Indigenous flag?
    config.add_facet_field "cultural_group_ssim", label: "Cultural Group", limit: true
    config.add_facet_field "language_group_ssim", label: "Language Group", limit: true

    # Ranged rather than a value-per-year facet to accomodate high variability in ranges
    config.add_facet_field "date_range", label: "Date", query: {
      pre_1800: { label: "Before 1800", fq: "date_start_isi:[* TO 1799]" },
      c19:      { label: "1800-1899",   fq: "date_start_isi:[1800 TO 1899]" },
      c20:      { label: "1900-1999",   fq: "date_start_isi:[1900 TO 1999]" },
      c21:      { label: "2000 onwards", fq: "date_start_isi:[2000 TO *]" }
    }

    # Self-excluding facets. Tag each facet's fq and have that same facet's counts
    # ignore it (Solr {!tag}/{!ex} local params). Query facets are skipped as query-facet
    # branch returns :fq string verbatim and multiple date ranges would silently fail.
    config.facet_fields.each_value do |facet|
      next if facet.query

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
    config.add_sort_field "title", sort: "title_si asc", label: "title"

    # If there are more than this many search results, no spelling ("did you
    # mean") suggestion is offered.
    config.spell_max = 100

    # Configuration for autocomplete suggester
    config.autocomplete_enabled = true
    config.autocomplete_path = "suggest"
  end
end
