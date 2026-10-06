# frozen_string_literal: true

# A substitution SearchService made when a search returned nothing and Solr
# offered a spelling collation that does have results. Carries what was typed,
# searched for instead, and the lesser suggestions the offered as links.
SpellingCorrection = Struct.new(:original, :corrected, :suggestions) do
  # Returns nil when there is nothing to correct, the search found something,
  # or Solr had no collation.
  def self.from(query, response)
    return if query.blank?

    return unless response.respond_to?(:documents) && response.documents.empty?

    collation = response.spelling&.collation.to_s
    return if collation.blank? || collation.casecmp?(query)

    new(query, collation, other_suggestions(response, collation))
  end

  # Solr's remaining 'lesser' suggestions, so the as clickable alternatives the way
  # Blacklight's "did you mean" list behaves.
  def self.other_suggestions(response, collation)
    words = Array(response.spelling.try(:words))
    words.reject { |word| word.casecmp?(collation) }
  end
end

# Reopening rather than nesting inside the Struct.new block above to give the `module`
# keyword the correct scope.
class SpellingCorrection
  # Mixed into a retried Solr response so views can reach the correction.
  module Response
    attr_accessor :spelling_correction
  end
end
