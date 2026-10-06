# frozen_string_literal: true

# Blacklight's search service plus one additional behaviour: when a search returns
# nothing offers a spelling collation, run the search again with the collation
# and mark the response so the view can explain the substitution. (From CCS-123)
# Solr does the heavy lifting. See spellcheck.maxCollationTries in solrconfig.xml
#
# Wired up as CatalogController.search_service_class, which is a class_attribute
# from Blacklight::Searchable rather than a blacklight_config property.
class SearchService < Blacklight::SearchService
  def search_results
    response = super
    correction = SpellingCorrection.from(search_state.query_param, response)
    return response if correction.nil?

    retry_with(correction) || response
  end

  private

  # This mirrors Blacklight::SearchService#search_results rather than calling
  # it. Going back through search_state.reset keeps the retry on our own
  # SearchBuilder. Returns nil if the collation finds nothing after all, so the
  # caller can keep the original response.
  def retry_with(correction)
    state = search_state.reset(search_state.params.merge(q: correction.corrected))
    builder = search_builder.with(state)
    builder.page = state.page
    builder.rows = state.per_page

    corrected = repository.search(params: builder)
    return if corrected.documents.empty?

    corrected.extend(SpellingCorrection::Response)
    corrected.spelling_correction = correction
    corrected
  end
end
