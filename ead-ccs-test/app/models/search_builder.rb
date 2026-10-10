# frozen_string_literal: true

class SearchBuilder < Blacklight::SearchBuilder
  include Blacklight::Solr::SearchBuilderBehavior
  include BlacklightRangeLimit::RangeLimitBuilder


  # How many of the user's terms a document has to match
  KEYWORD_MM = "4<-1 7<-2"
  BOOLEAN_MM = "0"

  # Appending puts this after Blacklight's own add_query_to_solr, so
  # solr_parameters[:q] is the query string Solr will receive.
  self.default_processor_chain += [ :add_minimum_should_match_to_solr, :add_all_facet_filters ]

  # "Includes all" in the advanced search form: f_all[facet][]=value, one filter per value, so a record has to
  # have every one. (Ticked values in the sidebar and "Includes any" are OR'd; see OrFilterQueryBuilder.)
  def add_all_facet_filters(solr_parameters)
    AllFacetFilters.each(search_state.params, blacklight_config) do |config, value|
      (solr_parameters[:fq] ||= []) << "{!term f=#{config.field}}#{value}"
    end
  end

  def add_minimum_should_match_to_solr(solr_parameters)
    return unless dismax?(solr_parameters)

    solr_parameters[:mm] = QuerySyntax.explicit?(search_state.params[:q]) ? BOOLEAN_MM : KEYWORD_MM
  end

  private

  # Blacklight sends the advanced search form through the lucene parser (no mm)
  def dismax?(solr_parameters)
    solr_parameters[:defType].blank? || solr_parameters[:defType].to_s.include?("dismax")
  end
end
