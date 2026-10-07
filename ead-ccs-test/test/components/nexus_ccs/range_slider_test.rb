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

  test "the bar count is set from the width of the panel, 7.8px bars with 2px gaps, between 20 and 60" do
    assert_includes JS, "const BAR_PITCH = 9.8"
    assert_includes JS, "MIN_BARS = 20"
    assert_includes JS, "MAX_BARS = 60"
    assert_includes JS, "Math.floor((width + 2) / BAR_PITCH)"
    assert_includes JS, 'url.searchParams.set("bins", this.barCount())'
    assert_equal 60, RangeHistogram.bins_for("60")
    assert_equal 29, RangeHistogram.bins_for("29")
  end

  test "with no range applied the fields are empty with the first and last year as placeholders, and empty ones are not sent" do
    assert_includes JS, "static values = { min: Number, max: Number, histogramUrl: String, applied: Boolean }"
    assert_includes JS, "this.begin.placeholder = String(this.lo)"
    assert_includes JS, "this.end.placeholder = String(this.hi)"
    assert_includes JS, 'if (!this.appliedValue) {'
    assert_includes JS, "leaveOutEmptyFields"
    assert_includes JS, "input.disabled = input.value === \"\""
    assert_includes Rails.root.join("app/components/nexus_ccs/facet_field_component.html.erb").read, "data-range-slider-applied-value"
  end

  test "the fields are From and To, 133 by 48, one at each end" do
    locale = Rails.root.join("config/locales/blacklight.en.yml").read
    assert_includes locale, "range_begin_short: From"
    assert_includes locale, "range_end_short: To"
    assert_includes CSS, "justify-content: space-between !important;"
    assert_includes CSS, "flex: 0 1 8.3125rem;"
    assert_match(/\.range-limit-input-group \.form-control \{\s+height: 3rem;/, CSS)
  end

  test "the handles are 16px white circles with a drop shadow, larger on hover and while dragging" do
    assert_includes CSS, "--slider-thumb: 1rem;"
    assert_includes CSS, "filter: drop-shadow("
    assert_includes CSS, ".range-slider__handle:hover { --lift: 1.2; }"
    assert_includes CSS, "const HANDLE = 16" if false
    assert_includes JS, "const HANDLE = 16"
  end

  test "empty bars are 4px stubs in neutral-200" do
    assert_includes JS, 'bin.count ? `max(4px, ${Math.min(Math.sqrt(bin.count / top), 1) * 100}%)` : "4px"'
    assert_includes JS, 'bar.classList.toggle("is-empty", !bin.count)'
    css = Rails.root.join("app/assets/stylesheets/components/filter_rail.css").read
    assert_match(/\.range-slider__bar\.is-empty,\s*\.range-slider__bar\.is-empty\.is-in-range \{\s*background: var\(--ccs-neutral-200\);/, css)
  end

  test "the scope select in the search bar is the site's dropdown, not the browser's" do
    assert_includes Rails.root.join("app/components/nexus_ccs/search_banner_component.rb").read, "select-dropdown"
    assert_includes Rails.root.join("app/javascript/controllers/select_dropdown_controller.js").read, "ccs-select"
    toolbar = Rails.root.join("app/assets/stylesheets/components/results_toolbar.css").read
    assert_includes toolbar, ":is(#sortAndPerPage .btn-group, .ccs-select) > .dropdown-toggle"
    assert_includes toolbar, ".dropdown-item::first-letter"
  end
end
