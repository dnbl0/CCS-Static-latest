# frozen_string_literal: true

module CatalogConfig
  # The facets (filters) of the results and the advanced search form, from the data model workbook (DataModel).
  module Facets
    def self.apply(config)
      # ================================================================
      # Facets
      # ================================================================
      # The filters, sections, order, names and types come from the workbook (DataModel). A filter the
      # data cannot support yet (see config/data_model/solr_mapping.yml) is simply not offered.
      DataModel.filters.select(&:available?).each do |filter|
        options = { label: filter.name, group: filter.group }
        case filter.type
        when :year then options[:range] = { chart_js: false, textual_facets: false } # our own histogram, see range_histogram
        when :checkbox then options.merge!(limit: nil, item_component: NexusCcs::FacetItemComponent)
        else options.merge!(limit: 20, index_range: "A".."Z", item_component: NexusCcs::FacetItemComponent)   # browse, with "search within this filter" in the modal
        end
        config.add_facet_field filter.solr, **options

        # In the search results design but not in the workbook: Creator role follows the creator dates.
        config.add_facet_field "creator_role_ssim", label: "Creator role", group: filter.group, limit: 20, index_range: "A".."Z", item_component: NexusCcs::FacetItemComponent if filter.seq == 5
      end

      # CCS-41: show results with or without digital assets. Not in the workbook's filter list, so it is
      # an addition from the Jira story; it sits with the Media type filters.
      config.add_facet_field "has_digital_asset", label: "Digital asset", group: "media_type", item_component: NexusCcs::FacetItemComponent, query: {
        with: { label: "With a digital asset", fq: "has_digital_asset_bsi:true" },
        without: { label: "Without a digital asset", fq: "-has_digital_asset_bsi:true" }
      }

      # Self-excluding facets. Tag each facet's fq and have that same facet's counts ignore it
      # (Solr {!tag}/{!ex} local params). Range facets build their own filters and query facets pass
      # their fq through verbatim, so both are skipped.
      config.facet_fields.each_value do |facet|
        next if facet.range || facet.query

        facet.tag = facet.key
        facet.ex  = facet.key
        facet.filter_query_builder = OrFilterQueryBuilder
      end

      config.add_facet_fields_to_solr_request!

      # The advanced search form's "Includes all" filters (see AllFacetFilters) are carried in the search state
      # like f and f_inclusive: Blacklight drops any parameter that is not listed here
      config.search_state_fields = config.search_state_fields + [ { AllFacetFilters::PARAM => config.facet_fields.keys.index_with { [] } } ]
    end
  end
end
