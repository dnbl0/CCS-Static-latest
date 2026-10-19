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
        # In the search results design but not in the workbook: Creator role sits above Creator name.
        config.add_facet_field "creator_role_ssim", label: "Creator role", group: filter.group, limit: 20, index_range: "A".."Z", filter_class: InclusiveFilterField if filter.seq == 3

        # CCS-41: show results with or without digital assets. Not in the workbook's filter list, so it is an
        # addition from the Jira story; it sits with the Media type filters, above Digital Asset Format Type.
        if filter.seq == 22
          config.add_facet_field "has_digital_asset", label: "Digital asset", group: "media_type", query: {
            with: { label: "With a digital asset", fq: "has_digital_asset_bsi:true" },
            without: { label: "Without a digital asset", fq: "-has_digital_asset_bsi:true" }
          }
        end

        options = { label: filter.name, group: filter.group }
        case filter.type
        when :year then options[:range] = true # the range limit plugin's own form and histogram
        when :checkbox then options.merge!(limit: nil, filter_class: InclusiveFilterField)
        else options.merge!(limit: 20, index_range: "A".."Z", filter_class: InclusiveFilterField)   # browse, with "search within this filter" in the modal
        end
        config.add_facet_field filter.solr, **options
      end

      config.add_facet_fields_to_solr_request!
    end
  end
end
