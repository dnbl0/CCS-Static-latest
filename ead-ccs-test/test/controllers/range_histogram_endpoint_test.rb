require "test_helper"

class RangeHistogramEndpointTest < ActionDispatch::IntegrationTest
  test "an unknown or non-range field is not found" do
    get "/catalog/range_histogram", params: { field: "title_tsim" }
    assert_response :not_found

    get "/catalog/range_histogram"
    assert_response :not_found
  end

  test "a range field is answered from Solr with the search's filters, without that range" do
    captured = []
    original = Blacklight::Solr::Repository.instance_method(:search)
    Blacklight::Solr::Repository.define_method(:search) do |params:|
      captured << params
      params[:"facet.query"].present? ? { "facet_counts" => { "facet_queries" => { "b0" => 2 } } } : { "stats" => { "stats_fields" => { "date_start_isi" => { "min" => 1900, "max" => 2000 } } } }
    end

    begin
      get "/catalog/range_histogram", params: { field: "date_start_isi", bins: "8", range: { date_start_isi: { begin: "1950", end: "1960" } } }
    ensure
      Blacklight::Solr::Repository.define_method(:search, original)
    end

    assert_response :success
    body = response.parsed_body
    assert_equal [ 1900, 2000, 8 ], [ body["min"], body["max"], body["bins"].size ]
    assert_equal 2, body["bins"].first["count"]
    assert(captured.none? { |request| Array(request[:fq]).join.include?("1950") }, "the filter's own range is left out")
  end
end
