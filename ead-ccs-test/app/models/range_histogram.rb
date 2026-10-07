# Bars for the range filters' slider: how many of the current results fall in each of BINS (24 by default,
# 8..60 by request) equal-width steps
# of the slider track. The track is not linear when the data reaches back before the common era (nearly every
# record is recent), so a bin is a share of the track, not a number of years: with old dates the first
# OLD_SHARE of the track covers everything before KNEE and the rest covers KNEE to the latest year. The same
# map is in app/javascript/controllers/range_slider_controller.js; keep them together.
class RangeHistogram
  BINS = 24
  MIN_BINS = 8
  MAX_BINS = 60
  KNEE = 1000
  OLD_SHARE = 0.25

  def self.year(fraction, min, max)
    return (min + fraction * (max - min)).round unless min < KNEE && max > KNEE

    if fraction < OLD_SHARE
      (min + (fraction / OLD_SHARE) * (KNEE - min)).round
    else
      (KNEE + ((fraction - OLD_SHARE) / (1 - OLD_SHARE)) * (max - KNEE)).round
    end
  end

  # The number of bins asked for (the `bins` parameter), kept to a sensible range; BINS when absent or junk
  def self.bins_for(requested)
    count = requested.to_i
    count.between?(MIN_BINS, MAX_BINS) ? count : BINS
  end

  # [[from, to], ...] inclusive years, one per bin, covering min..max
  def self.edges(min, max, bins = BINS)
    starts = (0..bins).map { |i| year(i.fdiv(bins), min, max) }
    (0...bins).map { |i| [ starts[i], i == bins - 1 ? max : [ starts[i + 1] - 1, starts[i] ].max ] }
  end
end
