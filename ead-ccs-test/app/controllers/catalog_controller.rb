# frozen_string_literal: true

# Blacklight controller that handles searches and document requests
class CatalogController < ApplicationController
  include Blacklight::Catalog
  include BlacklightRangeLimit::ControllerOverride
  include QueryRules

  # The results open in the default view (mosaic) every time. Blacklight would remember the last view the
  # visitor chose in the session and open every later search that way; here only ?view= in the URL changes it.
  # (A block here, so it comes after, and wins over, the gem's own helper.)
  helper do
    def document_index_view_type(query_params = params || {})
      view = query_params[:view]
      view.present? && document_index_views.key?(view.to_sym) ? view.to_sym : default_document_index_view_type
    end
  end

  # If you'd like to handle errors returned by Solr in a certain way,
  # you can use Rails rescue_from with a method you define in this controller,
  # uncomment:
  #
  # rescue_from Blacklight::Exceptions::InvalidRequest, with: :my_handling_method

  # Retries a zero-result search using Solr's spelling collation
  self.search_service_class = ::SearchService

  configure_blacklight do |config|
    # Results per page; the per_page widget offers these and the first request uses the default.
    config.per_page = [ 12, 24, 40, 96 ]
    config.default_per_page = 40

    # Blacklight's default is 'select', which solrconfig.xml now declares.
    # config.solr_path = 'select'

    # solr field configuration for search results/index views
    config.header_component = NexusCcs::HeaderComponent

    config.index.title_field = "title_tsim"

    # Result views: the built-in list, plus the mosaic (masonry) from blacklight-gallery (no grid view).
    # Records with a digital asset show it in both views; the rest show a placeholder in the mosaic
    # (and nothing in the list). Mosaic placeholders vary in shape, as real images do, so the masonry
    # layout stays a mosaic where images are missing.
    config.index.thumbnail_field = :thumbnail_path_ssi
    mosaic_placeholder = lambda do |document, image_options|
      shape = %w[placeholder-thumbnail.svg placeholder-portrait.svg placeholder-square.svg][document.id.sum % 3]
      ActionController::Base.helpers.image_tag(shape, image_options)
    end
    config.view.list.document_component = NexusCcs::ResultCardComponent
    config.view.list.icon = NexusCcs::ListViewIconComponent
    # Mosaic is the default view; List is the other button
    config.view.masonry(document_component: NexusCcs::ResultCardComponent, default: true,
      icon: NexusCcs::MasonryViewIconComponent, default_thumbnail: mosaic_placeholder)
    config.index.display_type_field = "format"

    config.add_results_document_tool(:bookmark, component: Blacklight::Document::BookmarkComponent, if: :render_bookmarks_control?)

    # Below 992px the sidebar is a drawer; this button opens it.
    config.index.sidebar_component = NexusCcs::FilterSidebarComponent
    config.index.constraints_component = NexusCcs::ConstraintsComponent
    config.add_results_collection_tool(:filters_toggle, component: NexusCcs::FilterToggleComponent)
    config.add_results_collection_tool(:sort_widget)
    config.add_results_collection_tool(:per_page_widget)
    config.add_results_collection_tool(:view_type_group)

    config.add_show_tools_partial(:bookmark, component: Blacklight::Document::BookmarkComponent, if: :render_bookmarks_control?)
    # config.add_show_tools_partial(:email, callback: :email_action, validator: :email_params_valid?)
    # config.add_show_tools_partial(:sms, if: :render_sms_action?, callback: :sms_action, validator: :sms_params_valid?)
    # Links out to the record in its source system, behind a "you're leaving this
    # site" interstitial. Guarded here rather than by the component's render?,.
    config.add_show_tools_partial(:view_full_record, component: NexusCcs::ViewFullRecordComponent,
      if: ->(_context, _config, options) {  # so a record with no URL doesn't leave an empty <li>
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

    # The record page body after the CCS UI "Record-detail": media, summary, details, persistent link, copyright.
    config.show.document_component = NexusCcs::RecordDocumentComponent

    # Between a record's title and its details: the digital assets and a summary line.
    config.show.document_embed_component = NexusCcs::RecordEmbedComponent

    # After the details: the persistent link.
    config.show.partials = [ :persistent_link ]

    CatalogConfig::Facets.apply(config)

    CatalogConfig::RecordFields.apply(config)

    CatalogConfig::SearchFields.apply(config)

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

  # The bare front page is the results page with the Digital asset switch on: every record that has a digital
  # asset, as the mosaic. Any parameter (a search, a filter, a sort...) means the visitor chose something.
  before_action :show_digital_assets_by_default, only: :index

  def show_digital_assets_by_default
    return unless controller_name == "catalog" && request.format.html? && request.query_parameters.empty?

    redirect_to search_action_url(f: { has_digital_asset: [ "with" ] }, search_field: "all_fields", view: "masonry")
  end

  # "Includes all" filters (f_all) alone make a search too: the results page, not the home page
  def has_search_parameters?
    super || AllFacetFilters.pairs(search_state.params, blacklight_config).any?
  end

  # The advanced search form. Opened by Blacklight's modal (an XHR request) it is only the form, for the flyout.
  def advanced_search
    super
    render layout: false if request.xhr?
  end

  # JSON for the range filters' slider: the first and last year of the results, with that filter's own range
  # left out so the track keeps its full length, and a count per bar (see RangeHistogram; ?bins=N, 8 to 60,
  # defaults to 24).
  def range_histogram
    field = params[:field].to_s
    return head :not_found unless blacklight_config.facet_fields[field]&.range

    state = search_state.reset(search_state.params.deep_dup.tap { |p| p[:range]&.delete(field) })
    service = search_service_class.new(config: blacklight_config, search_state: state, **search_service_context)
    render json: RangeHistogramQuery.new(service: service, search_state: state, field: field, bins: params[:bins])
  end
end
