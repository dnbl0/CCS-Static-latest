# frozen_string_literal: true

module NexusCcs
  # A year filter (Creator Date of Birth, Creator Date of Death, Production date) on the Advanced search form: From and To
  # years. The range limit plugin's own form cannot go inside the Advanced search form, so this uses its year fields
  # (BlacklightRangeLimit::RangeInputComponent), named as that form names them, and the Search button sends them. Fields left
  # blank add no filter (BlacklightRangeLimit::FilterField) and do not count as a search (SearchDefaults).
  class AdvancedYearRangeComponent < Blacklight::Component
    def initialize(facet_field:, layout: nil)
      @facet_field = facet_field
    end

    def input_name(bound) = "range[#{@facet_field.key}][#{bound}]"

    # What an earlier search asked for (Advanced search again keeps it), otherwise blank
    def value(bound)
      range = @facet_field.try(:selected_range)
      range.is_a?(Range) ? range.public_send(bound) : nil
    end
  end
end
