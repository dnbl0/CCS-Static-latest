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

  # How a row matches its words (clause[i][type], the Advanced search form's "Contains all / any / Excludes")
  def edismax_for(query, type)
    clause = { "0" => { field: "all_fields", op: "must", query: query }.merge(type ? { type: type } : {}) }
    SearchBuilder.new(CatalogController.new).with(clause: clause).to_h.dig(:json, :query, :bool, :must, 0, :edismax)
  end

  test "a row that contains all its words uses the keyword search's rule, or none when it has explicit syntax" do
    assert_equal SearchBuilder::KEYWORD_MM, edismax_for("anatomy botany", "all")[:mm]
    assert_equal SearchBuilder::BOOLEAN_MM, edismax_for("anatomy OR botany", "all")[:mm]
    assert_equal SearchBuilder::BOOLEAN_MM, edismax_for("+anatomy botany", "all")[:mm]
  end

  test "a row that contains any of its words needs only one of them" do
    edismax = edismax_for("anatomy botany", "any")

    assert_equal "0", edismax[:mm]
    assert_equal "OR", edismax[:"q.op"]
  end

  test "a row without a type is left to Blacklight's default, as addresses from before the menu were" do
    edismax = edismax_for("anatomy botany", nil)

    assert_nil edismax[:mm]
    assert_nil edismax[:"q.op"]
  end

  test "a row that excludes leaves out the records that have its words" do
    clause = { "0" => { field: "all_fields", query: "skull", type: "none" } }
    bool = SearchBuilder.new(CatalogController.new).with(clause: clause).to_h.dig(:json, :query, :bool)

    assert bool[:must_not].present?
    assert_nil bool[:must]
  end

  test "an empty row adds nothing" do
    clause = { "0" => { field: "all_fields", query: "", type: "any" } }

    assert_nil SearchBuilder.new(CatalogController.new).with(clause: clause).to_h[:json]
  end
end
