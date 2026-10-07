require "test_helper"

class RangeSliderTest < ActiveSupport::TestCase
  JS = Rails.root.join("app/javascript/controllers/range_slider_controller.js").read
  CSS = Rails.root.join("app/assets/stylesheets/components/filter_rail.css").read

  test "bins default to 24 and a request is kept between 8 and 60" do
    assert_equal 24, RangeHistogram::BINS
    assert_equal 24, RangeHistogram.bins_for(nil)
    assert_equal 24, RangeHistogram.bins_for("junk")
    assert_equal 20, RangeHistogram.bins_for("20")
    assert_equal 24, RangeHistogram.bins_for("3")
    assert_equal 24, RangeHistogram.bins_for("500")
  end

  test "edges follow the number of bins asked for" do
    [ 20, 24 ].each do |bins|
      edges = RangeHistogram.edges(1471, 1997, bins)
      assert_equal bins, edges.size
      assert_equal 1471, edges.first.first
      assert_equal 1997, edges.last.last
      edges.each_cons(2) { |a, b| assert_equal a.last + 1, b.first }
    end
  end

  test "the slider keeps the handles apart, labels the axis, and sets year values in ARIA" do
    assert_includes JS, "--nudge"
    assert_includes JS, "range-slider__stem"
    assert_includes JS, "range-slider__tick"
    %w[aria-valuemin aria-valuemax aria-valuenow aria-valuetext].each { |attribute| assert_includes JS, attribute }
    %w[Home End PageUp PageDown].each { |key| assert_includes JS, key }
    assert_includes JS, 'aria-live", "polite"'
    assert_includes JS, "Showing ${label} results from"
  end

  test "the histogram has loading bars, a 4px minimum, a 95th percentile cap, and goes when it says nothing" do
    assert_includes JS, "is-placeholder"
    assert_includes JS, "max(4px,"
    assert_includes JS, "0.95"
    assert_includes JS, "filled.length < 2"
  end

  test "the handles are 28px, 44px on a phone, drawn inside a transparent border" do
    assert_includes CSS, "--slider-handle: 1.75rem;"
    assert_match(/max-width: 575\.98px\), \(pointer: coarse\) \{\s+\.range-slider \{\s+--slider-handle: 2\.75rem;/, CSS)
    assert_includes CSS, "background-clip: padding-box;"
    assert_includes CSS, "translateX(var(--nudge, 0px))"
  end
end
