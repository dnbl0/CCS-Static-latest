require "test_helper"

class RangeHistogramQueryTest < ActiveSupport::TestCase
  # A repository that answers the stats request and the facet.query request the way Solr does
  class FakeRepository
    attr_reader :requests

    def initialize(stats:, counts: {})
      @stats = stats
      @counts = counts
      @requests = []
    end

    def search(params:)
      @requests << params
      if params[:stats]
        { "stats" => { "stats_fields" => { "date_start_isi" => @stats } } }
      else
        { "facet_counts" => { "facet_queries" => @counts } }
      end
    end
  end

  FakeBuilder = Struct.new(:state) do
    def with(_state) = self
    def to_hash = { q: "*:*", fq: [ "collection_ssim:x" ], rows: 10, facet: true }
  end

  FakeService = Struct.new(:repository) do
    def search_builder = FakeBuilder.new(nil)
  end

  def query(repository, bins: nil)
    RangeHistogramQuery.new(service: FakeService.new(repository), search_state: :state, field: "date_start_isi", bins: bins)
  end

  test "no dated records gives no bins" do
    result = query(FakeRepository.new(stats: nil)).as_json

    assert_equal({ bins: [] }, result)
  end

  test "the first and last year and a count for each bar" do
    repository = FakeRepository.new(stats: { "min" => 1900.0, "max" => 2000.0 }, counts: { "b0" => 7, "b1" => 3 })
    result = query(repository, bins: "8").as_json

    assert_equal 1900, result[:min]
    assert_equal 2000, result[:max]
    assert_equal 8, result[:bins].size
    assert_equal [ 7, 3 ], result[:bins].first(2).map { |bin| bin[:count] }
    assert_equal 0, result[:bins].last[:count], "a bar Solr did not count is empty"
    assert_equal 1900, result[:bins].first[:from]
  end

  test "the requests keep the search's filters and ask for no rows" do
    repository = FakeRepository.new(stats: { "min" => 1900, "max" => 2000 })
    query(repository).as_json

    assert(repository.requests.all? { |request| request[:rows] == 0 && request[:fq] == [ "collection_ssim:x" ] })
    assert_equal "date_start_isi", repository.requests.first[:"stats.field"]
    assert_equal RangeHistogram::BINS, repository.requests.last[:"facet.query"].size
  end
end
