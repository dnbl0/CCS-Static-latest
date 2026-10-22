# frozen_string_literal: true

module NexusCcs
  # A workbook filter the data cannot support yet (config/data_model/solr_mapping.yml gives the reason).
  # It keeps its place in the results sidebar and on the Advanced search form, with a note instead of values,
  # so people can see it is planned.
  class PendingFacetComponent < Blacklight::Facets::ListComponent
    def render? = true
  end
end
