# frozen_string_literal: true

class SearchBuilder < Blacklight::SearchBuilder
  include Blacklight::Solr::SearchBuilderBehavior
  include BlacklightRangeLimit::RangeLimitBuilder


  # How many of the user's terms a document has to match
  KEYWORD_MM = "4<-1 7<-2"
  BOOLEAN_MM = "0"

  # Appending puts this after Blacklight's own add_query_to_solr, so
  # solr_parameters[:q] is the query string Solr will receive.
  self.default_processor_chain += [ :add_minimum_should_match_to_solr ]

  def add_minimum_should_match_to_solr(solr_parameters)
    return unless dismax?(solr_parameters)

    solr_parameters[:mm] = QuerySyntax.explicit?(search_state.params[:q]) ? BOOLEAN_MM : KEYWORD_MM
  end

  # How one row of the Advanced search form matches its words (clause[i][type]):
  #   all  - the same rule as the keyword search: every word (a long query may miss one), or the explicit syntax of
  #          +, -, AND, OR, NOT when the visitor used it
  #   any  - at least one of the words
  #   none - records that have none of them (Blacklight's own must_not for the row)
  # A row without a type (an address from before the form had the menu) is left to Blacklight's default.
  def adv_search_clause(clause, default_op)
    op, query = super
    return if op.nil? || query.nil?

    case clause[:type].to_s
    when "all" then query = with_match(query, mm: QuerySyntax.explicit?(clause[:query]) ? BOOLEAN_MM : KEYWORD_MM)
    when "any" then query = with_match(query, mm: "0", "q.op": "OR")
    when "none" then op = :must_not
    end
    [ op, query ]
  end

  private

  def with_match(query, **match)
    query.transform_values { |parser_params| parser_params.merge(match) }
  end

  # Blacklight sends the advanced search form through the lucene parser (no mm)
  def dismax?(solr_parameters)
    solr_parameters[:defType].blank? || solr_parameters[:defType].to_s.include?("dismax")
  end
end
