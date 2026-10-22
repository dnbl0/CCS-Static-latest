require "test_helper"

class SearchDefaultsTest < ActiveSupport::TestCase
  def decide(query, html: true, get: true, catalog: true)
    SearchDefaults.decide(query, html: html, get: get, catalog: catalog)
  end

  test "nothing asked goes to the home page" do
    assert_equal [ :home ], decide({})
  end

  test "a search with no Digital asset choice gets the default filter, keeping everything else" do
    outcome, query = decide({ "q" => "skull", "f" => { "collection_ssim" => [ "Grainger Museum" ] } })

    assert_equal :search, outcome
    assert_equal({ "q" => "skull", "f" => { "collection_ssim" => [ "Grainger Museum" ], "has_digital_asset" => [ "with" ] } }, query)
  end

  test "a Digital asset choice or the any_assets marker is respected" do
    assert_nil decide({ "q" => "skull", "f" => { "has_digital_asset" => [ "without" ] } })
    assert_nil decide({ "q" => "skull", "any_assets" => "1" })
  end

  test "a hand-edited f that is not a list of filters still gets the default, replacing it" do
    assert_equal [ :search, { "q" => "x", "f" => { "has_digital_asset" => [ "with" ] } } ], decide({ "q" => "x", "f" => "junk" })
  end

  test "an Advanced search with a term is searched as asked, without the default" do
    assert_nil decide({ "op" => "must", "clause" => { "0" => { "field" => "title", "query" => "skull" } } })
  end

  test "an empty Advanced search goes back to the form, keeping the all/any choice" do
    assert_equal [ :advanced_search_again, "should" ], decide({ "op" => "should", "clause" => { "0" => { "field" => "all_fields", "query" => "" } } })
    assert_equal [ :advanced_search_again, nil ], decide({ "clause" => { "0" => { "query" => "" } } })
  end

  test "an Advanced search with only filters or a date range is searched" do
    empty_clause = { "0" => { "query" => "" } }

    assert_nil decide({ "clause" => empty_clause, "f_inclusive" => { "format" => [ "photograph" ] } })
    assert_nil decide({ "clause" => empty_clause, "f" => { "collection_ssim" => [ "Grainger Museum" ] } })
    assert_nil decide({ "clause" => empty_clause, "range" => { "date" => { "begin" => "1900" } } })
    assert_nil decide({ "clause" => empty_clause, "q" => "skull" })
  end

  test "only HTML pages are redirected" do
    assert_nil decide({}, html: false)
    assert_nil decide({ "q" => "skull" }, html: false)
  end

  test "the default filter is added to GET requests only" do
    assert_nil decide({ "q" => "skull" }, get: false)
  end

  test "controllers built on the catalog (saved records) get only the empty Advanced search rule" do
    assert_nil decide({}, catalog: false)
    assert_nil decide({ "q" => "skull" }, catalog: false)
    assert_equal [ :advanced_search_again, nil ], decide({ "clause" => { "0" => { "query" => "" } } }, catalog: false)
  end
end
