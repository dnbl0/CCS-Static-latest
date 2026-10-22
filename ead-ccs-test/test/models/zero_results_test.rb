require "test_helper"

class ZeroResultsTest < ActiveSupport::TestCase
  test "clearing the filters keeps the search and drops every filter, the default one included" do
    params = { "q" => "skull", "search_field" => "all_fields", "view" => "list", "page" => "3",
               "f" => { "has_digital_asset" => [ "with" ], "collection_ssim" => [ "Grainger Museum" ] },
               "f_inclusive" => { "format" => [ "Image" ] }, "range" => { "date_range" => { "begin" => "1900" } } }

    assert_equal({ "q" => "skull", "search_field" => "all_fields", "view" => "list", "any_assets" => "1" },
                 ZeroResults.without_filters(params))
  end

  test "an Advanced search keeps its clauses when the filters are cleared" do
    params = { "op" => "must", "clause" => { "0" => { "field" => "title", "query" => "skull" } }, "f" => { "has_digital_asset" => [ "with" ] } }

    assert_equal params.except("f").merge("any_assets" => "1"), ZeroResults.without_filters(params)
  end

  test "filtered? is true for any filter, false for a search alone" do
    assert ZeroResults.filtered?({ "q" => "skull", "f" => { "has_digital_asset" => [ "with" ] } })
    assert ZeroResults.filtered?({ "q" => "skull", "range" => { "date_range" => { "begin" => "1900" } } })
    assert_not ZeroResults.filtered?({ "q" => "skull", "any_assets" => "1" })
  end

  test "only_default_filter? is true when With a digital asset is the one filter" do
    assert ZeroResults.only_default_filter?({ "q" => "skull", "f" => { "has_digital_asset" => [ "with" ] } })
    assert_not ZeroResults.only_default_filter?({ "f" => { "has_digital_asset" => [ "with" ], "collection_ssim" => [ "Grainger Museum" ] } })
    assert_not ZeroResults.only_default_filter?({ "f" => { "has_digital_asset" => [ "without" ] } })
  end
end
