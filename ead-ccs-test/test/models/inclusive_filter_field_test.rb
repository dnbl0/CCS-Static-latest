# frozen_string_literal: true

require "test_helper"

class InclusiveFilterFieldTest < ActiveSupport::TestCase
  setup do
    @config = Blacklight::Configuration.new
    @config.add_facet_field "creator_role_ssim", filter_class: InclusiveFilterField
    @field = @config.facet_fields["creator_role_ssim"]
  end

  def filter_for(params)
    Blacklight::SearchState.new(params.with_indifferent_access, @config).filter(@field)
  end

  test "a first value is an ordinary filter" do
    params = filter_for({}).add("Artist").params
    assert_equal({ "creator_role_ssim" => [ "Artist" ] }, params[:f])
    assert_nil params[:f_inclusive]
  end

  test "a second value in the same facet becomes an any-of filter" do
    params = filter_for({ f: { creator_role_ssim: [ "Artist" ] } }).add("Creator").params
    assert_nil params[:f]
    assert_equal({ "creator_role_ssim" => [ "Artist", "Creator" ] }, params[:f_inclusive])
  end

  test "values of both kinds count as selected" do
    filter = filter_for({ f_inclusive: { creator_role_ssim: [ "Artist", "Creator" ] } })
    assert filter.include?("Artist")
    assert_not filter.include?("Printer")
  end

  test "removing one of two values leaves an ordinary filter" do
    params = filter_for({ f_inclusive: { creator_role_ssim: [ "Artist", "Creator" ] } }).remove("Artist").params
    assert_equal({ "creator_role_ssim" => [ "Creator" ] }, params[:f])
    assert_nil params[:f_inclusive]
  end

  test "removing the last value drops the filter" do
    params = filter_for({ f: { creator_role_ssim: [ "Artist" ] } }).remove("Artist").params
    assert_nil params[:f]
  end

  test "other facets are left alone" do
    params = filter_for({ f: { other_ssim: [ "x" ] } }).add("Artist").params
    assert_equal [ "x" ], params[:f]["other_ssim"]
  end
end
