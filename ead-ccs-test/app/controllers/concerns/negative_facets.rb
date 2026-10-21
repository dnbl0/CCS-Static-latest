# frozen_string_literal: true

# Excluded filters: f[-field][]=value finds the records that do NOT have the value. Blacklight 9 only understands
# the "-" prefix for its "missing" value, so for each excluded field a hidden twin of the facet is added to the
# request's configuration whose filter query is a NOT.
#
# Adapted from the NegativeFacets concern of SearchWorks (https://github.com/sul-dlss/SearchWorks), Stanford University
# Libraries, Apache License 2.0.
module NegativeFacets
  extend ActiveSupport::Concern

  included do
    before_action :add_negative_facet_fields, only: [ :index, :facet, :advanced_search ] if respond_to?(:before_action)
  end

  protected

  def add_negative_facet_fields
    return unless params[:f].respond_to?(:each_key)

    params[:f].keys.select { |key| key.to_s.start_with?("-") }.each do |key|
      original = blacklight_config.facet_fields[key.to_s.delete_prefix("-")]
      next if original.nil? || blacklight_config.facet_fields[key.to_s]

      blacklight_config.add_facet_field key.to_s, **original.to_h, group: "negative", show: false,
                                                  label: "Not #{original.label}",
                                                  filter_class: Blacklight::SearchState::FilterField,
                                                  item_presenter: NegativeFacetItemPresenter,
                                                  filter_query_builder: NegativeFilterQueryBuilder
    end
  end

  # An excluded value in the pills above the results reads "not Archive": the pills show only the value (the filter's name is
  # hidden), so without the word an exclusion would look like a selection.
  class NegativeFacetItemPresenter < Blacklight::FacetItemPresenter
    def label = "not #{super}"
  end

  # The filter query for an excluded filter: every one of its values must be absent
  class NegativeFilterQueryBuilder < Blacklight::Solr::AbstractFilterQueryBuilder
    def call(filter, *)
      facet_config = blacklight_config.facet_fields[filter.config.key]
      solr_field = facet_config.field if facet_config && !facet_config.query
      solr_field ||= filter.config.key.to_s.delete_prefix("-")

      [ filter.values.compact_blank.map { |value| "-#{solr_field}:\"#{RSolr.solr_escape(value.to_s)}\"" }, {} ]
    end
  end
end
