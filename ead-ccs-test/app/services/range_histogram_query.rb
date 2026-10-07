# frozen_string_literal: true

# The data for a range filter's slider: the first and last year of the current results, with that filter's own range left
# out so the track keeps its full length, and a count per bar (see RangeHistogram).
class RangeHistogramQuery
  # service: a search service for the current search; search_state: that search without the filter's own range
  def initialize(service:, search_state:, field:, bins:)
    @service = service
    @search_state = search_state
    @field = field
    @bins = bins
  end

  def as_json(*)
    stats = repository.search(params: base.merge(stats: true, "stats.field": @field)).dig("stats", "stats_fields", @field)
    return { bins: [] } unless stats && stats["min"]

    min = stats["min"].to_i
    max = stats["max"].to_i
    edges = RangeHistogram.edges(min, max, RangeHistogram.bins_for(@bins))
    counts = bin_counts(edges)

    { min: min, max: max, bins: edges.each_with_index.map { |(from, to), i| { from: from, to: to, count: counts["b#{i}"].to_i } } }
  end

  private

  def repository = @service.repository

  # The current search without its rows, facets and sort: only the filters matter
  def base = @base ||= @service.search_builder.with(@search_state).to_hash.merge(rows: 0, facet: false, "facet.query": nil)

  def bin_counts(edges)
    queries = edges.each_with_index.map { |(from, to), i| "{!key=b#{i}}#{@field}:[#{from} TO #{to}]" }
    repository.search(params: base.merge(facet: true, "facet.query": queries)).dig("facet_counts", "facet_queries") || {}
  end
end
