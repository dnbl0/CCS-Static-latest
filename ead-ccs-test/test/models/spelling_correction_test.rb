# frozen_string_literal: true

require "test_helper"

class SpellingCorrectionTest < ActiveSupport::TestCase
  def response(documents:, collation: nil, words: [])
    Struct.new(:documents, :spelling)
          .new(documents, Struct.new(:collation, :words).new(collation, words))
  end

  test "corrects a query that found nothing" do
    correction = SpellingCorrection.from("anatommy", response(documents: [], collation: "anatomy"))

    assert_equal "anatommy", correction.original
    assert_equal "anatomy", correction.corrected
  end

  test "carries the other word suggestions, minus the auto-corrected term" do
    correction = SpellingCorrection.from("cavinet",
      response(documents: [], collation: "cabinet", words: %w[Cabinet covenant caviar]))

    assert_equal %w[covenant caviar], correction.suggestions
  end

  test "has no other suggestions when the collation is the only word" do
    correction = SpellingCorrection.from("cavinet",
      response(documents: [], collation: "cabinet", words: %w[cabinet]))

    assert_empty correction.suggestions
  end

  test "leaves a search that found something alone" do
    assert_nil SpellingCorrection.from("anatomy", response(documents: [ :a_hit ], collation: "botany"))
  end

  # Solr echoes the query back when it has nothing better. Retrying just repeats the empty search.
  test "ignores a collation that matches the query" do
    assert_nil SpellingCorrection.from("anatomy", response(documents: [], collation: "Anatomy"))
  end

  test "does nothing without a collation" do
    assert_nil SpellingCorrection.from("anatommy", response(documents: []))
    assert_nil SpellingCorrection.from("", response(documents: [], collation: "anatomy"))
  end

  test "ignores a response that has no documents to count" do
    grouped = Struct.new(:spelling).new(Struct.new(:collation).new("anatomy"))

    assert_nil SpellingCorrection.from("anatommy", grouped)
  end
end
