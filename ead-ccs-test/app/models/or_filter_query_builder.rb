# frozen_string_literal: true

# ORs a facet's selections into a single Solr filter query, instead of
# Blacklight's default of one fq per value (which Solr ANDs together).
# Delegates to Blacklight's checkbox facets OR helper
class OrFilterQueryBuilder < Blacklight::Solr::AbstractFilterQueryBuilder
  def call(filter, solr_parameters)
    values = filter.values.compact_blank

    # Ranges and the 'missing' sentinel cant be OR'd this way
    return default_builder.call(filter, solr_parameters) unless values.all?(String)

    filter_query, subqueries = facet_inclusive_value_to_fq_string(filter.key, values)
    [ Array(filter_query), subqueries || {} ]
  end

  private

  def default_builder
    @default_builder ||=
      Blacklight::Solr::DefaultFilterQueryBuilder.new(blacklight_config: blacklight_config)
  end
end
