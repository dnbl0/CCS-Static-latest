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
    # Facets
    # ================================================================
    # The filters, sections, order, names and types come from the workbook (DataModel). A filter the
    # data cannot support yet (see config/data_model/solr_mapping.yml) is simply not offered.
    DataModel.filters.select(&:available?).each do |filter|
      options = { label: filter.name, group: filter.group }
      case filter.type
      when :year then options[:range] = true
      when :checkbox then options[:limit] = nil
      else options.merge!(limit: 20, index_range: "A".."Z")   # browse, with "search within this filter" in the modal
      end
      config.add_facet_field filter.solr, **options
    end

    # Self-excluding facets. Tag each facet's fq and have that same facet's counts ignore it
    # (Solr {!tag}/{!ex} local params). Range facets build their own filters, so they are skipped.
    config.facet_fields.each_value do |facet|
      next if facet.range

      facet.tag = facet.key
      facet.ex  = facet.key
      facet.filter_query_builder = OrFilterQueryBuilder
    end

    config.add_facet_fields_to_solr_request!

    # ================================================================
    # Record fields come from the workbook (DataModel): its labels, its order, and only the fields
    # the data can carry. The title is the page heading, so it is not repeated as a field; the
    # results list shows the fields marked `index` in config/data_model/solr_mapping.yml.
    # access_condition_ssi and restrictions_tsi are deliberately absent.
    # ================================================================
    DataModel.fields.select(&:available?).reject { |field| field.seq == 1 }.each do |field|
      config.add_index_field field.solr, label: field.label if field.index
      config.add_show_field field.solr, label: field.label
    end

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
