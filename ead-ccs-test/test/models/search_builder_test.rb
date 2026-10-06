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
end
