require "test_helper"

class RangeHistogramTest < ActiveSupport::TestCase
  test "with only recent dates the track is linear" do
    assert_equal 1900, RangeHistogram.year(0, 1900, 2000)
    assert_equal 1950, RangeHistogram.year(0.5, 1900, 2000)
    assert_equal 2000, RangeHistogram.year(1, 1900, 2000)
  end

  test "with dates before the knee the first quarter covers them and the rest is knee to latest" do
    assert_equal(-3000, RangeHistogram.year(0, -3000, 2025))
    assert_equal 1000, RangeHistogram.year(RangeHistogram::OLD_SHARE, -3000, 2025)
    assert_equal 2025, RangeHistogram.year(1, -3000, 2025)
  end

  test "bins cover min to max without gaps or overlaps" do
    edges = RangeHistogram.edges(-3000, 2025)
    assert_equal RangeHistogram::BINS, edges.size
    assert_equal(-3000, edges.first.first)
    assert_equal 2025, edges.last.last
    edges.each_cons(2) { |a, b| assert_equal a.last + 1, b.first }
  end
end
