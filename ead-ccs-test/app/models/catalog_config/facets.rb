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
        # CCS-41 (not in the workbook): the Digital asset option sits above Digital Asset Format Type.
        add_digital_asset_option(config) if filter.name == DIGITAL_ASSET_FORMAT_FILTER

        # Each list filter on the Advanced search form has a "match" menu (includes all / includes any / excludes all)
        options = { label: filter.name, group: filter.group }
        case filter.type
        when :year then options[:range] = true # the range limit plugin's own form and histogram
        when :checkbox then options.merge!(limit: nil, filter_class: InclusiveFilterField, advanced_search_component: NexusCcs::AdvancedFilterComponent)
        else options.merge!(limit: 20, index_range: "A".."Z", filter_class: InclusiveFilterField, advanced_search_component: NexusCcs::AdvancedFilterComponent)   # browse, with "search within this filter" in the modal
        end
        config.add_facet_field filter.solr, **options
      end

      add_digital_asset_option(config) unless config.facet_fields.key?("has_digital_asset")

      config.add_facet_fields_to_solr_request!
    end

    DIGITAL_ASSET_FORMAT_FILTER = "Digital Asset Format Type"

    # CCS-41: show results with or without digital assets. Not in the workbook's filter list, so it is
    # an addition from the Jira story; it sits with the Media type filters.
    def self.add_digital_asset_option(config)
      config.add_facet_field "has_digital_asset", label: "Digital asset", group: "media_type", filter_class: DigitalAssetFilterField, query: {
        with: { label: "With a digital asset", fq: "has_digital_asset_bsi:true" },
        without: { label: "Without a digital asset", fq: "-has_digital_asset_bsi:true" }
      }
    end
  end
end
