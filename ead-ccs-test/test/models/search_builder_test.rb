# frozen_string_literal: true

require "test_helper"

class SearchBuilderTest < ActiveSupport::TestCase
  def mm_for(query)
    SearchBuilder.new(CatalogController.new).with(q: query).to_h[:mm]
  end

  test "keyword searches keep the correct minimum-should-match" do
    assert_equal SearchBuilder::KEYWORD_MM, mm_for("anatomy botany")
    assert_equal SearchBuilder::KEYWORD_MM, mm_for("Basket (coiled)")
  end

  test "boolean syntax relaxes minimum-should-match" do
    assert_equal SearchBuilder::BOOLEAN_MM, mm_for("anatomy OR botany")
    assert_equal SearchBuilder::BOOLEAN_MM, mm_for("anatomy AND botany OR zoology")
  end

  # Blacklight's own search builder turns clause[i][op] into a Solr JSON Query DSL bool query with all three
  # operators (Blacklight::Solr::SearchBuilderBehavior#add_adv_search_clauses), including must_not, even though
  # the stock advanced search form never offers a row-level control for it (only a single "match all/any" menu
  # for the whole form). Nothing in this app builds a must_not clause today; this just checks Blacklight's own
  # query building is intact, in case a future UI needs it.
  test "a Does not contain (must_not) row excludes its term from the results, unlike Must or Should" do
    clause = { "0" => { field: "all_fields", op: "must_not", query: "skull" } }
    solr = SearchBuilder.new(CatalogController.new).with(clause: clause).to_h

    assert_equal "lucene", solr[:defType]
    assert solr[:json][:query][:bool][:must_not].present?
    assert_nil solr[:json][:query][:bool][:must]
    assert_nil solr[:json][:query][:bool][:should]
  end

  test "Must and Should rows go in their own side of the bool query" do
    clause = { "0" => { field: "all_fields", op: "must", query: "skull" }, "1" => { field: "all_fields", op: "should", query: "shell" } }
    solr = SearchBuilder.new(CatalogController.new).with(clause: clause).to_h

    assert_equal 1, solr[:json][:query][:bool][:must].size
    assert_equal 1, solr[:json][:query][:bool][:should].size
    assert_nil solr[:json][:query][:bool][:must_not]
  end
end
