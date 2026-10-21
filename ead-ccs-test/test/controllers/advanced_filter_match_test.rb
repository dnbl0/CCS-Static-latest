require "test_helper"

# The Advanced search form sends each list filter's ticked values as f_inclusive[field][] with the chosen match in
# match[field]; AdvancedFilterMatch turns that into Blacklight's own filter parameters in a redirect (no search runs yet).
class AdvancedFilterMatchTest < ActionDispatch::IntegrationTest
  FIELD = "classification_ssim".freeze

  def redirected_params
    assert_response :redirect
    Rack::Utils.parse_nested_query(URI(response.location).query)
  end

  test "includes all makes every ticked value a filter of its own" do
    get "/catalog", params: { match: { FIELD => "and" }, f_inclusive: { FIELD => [ "Archive", "Documents" ] }, clause: { "0" => { field: "all_fields", query: "x" } } }

    params = redirected_params
    assert_equal [ "Archive", "Documents" ], params.dig("f", FIELD)
    assert_nil params["f_inclusive"]
    assert_nil params["match"]
  end

  test "includes any keeps two or more values as Blacklight's any-of filter, and one value as a plain filter" do
    get "/catalog", params: { match: { FIELD => "or" }, f_inclusive: { FIELD => [ "Archive", "Documents" ] }, clause: { "0" => { field: "all_fields", query: "x" } } }
    assert_equal [ "Archive", "Documents" ], redirected_params.dig("f_inclusive", FIELD)

    get "/catalog", params: { match: { FIELD => "or" }, f_inclusive: { FIELD => [ "Archive" ] }, clause: { "0" => { field: "all_fields", query: "x" } } }
    params = redirected_params
    assert_equal [ "Archive" ], params.dig("f", FIELD)
    assert_nil params["f_inclusive"]
  end

  test "excludes all becomes an excluded filter, f[-field]" do
    get "/catalog", params: { match: { FIELD => "not" }, f_inclusive: { FIELD => [ "Archive", "Documents" ] }, clause: { "0" => { field: "all_fields", query: "x" } } }

    params = redirected_params
    assert_equal [ "Archive", "Documents" ], params.dig("f", "-#{FIELD}")
    assert_nil params.dig("f", FIELD)
  end

  test "values already applied are kept, and a filter with nothing ticked or an unknown field or match is dropped" do
    get "/catalog", params: { match: { FIELD => "and", "no_such_ssim" => "and", "creator_ssim" => "sideways", "subject_ssim" => "and" },
                              f: { FIELD => [ "Archive" ] },
                              f_inclusive: { FIELD => [ "Documents" ], "no_such_ssim" => [ "a" ], "creator_ssim" => [ "b" ] },
                              clause: { "0" => { field: "all_fields", query: "x" } } }

    params = redirected_params
    assert_equal [ "Archive", "Documents" ], params.dig("f", FIELD)
    assert_equal [ "Archive", "Documents" ], params["f"].values.first
    assert_equal [ FIELD ], params["f"].keys
    assert_nil params["f_inclusive"]
  end
end
