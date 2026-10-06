# frozen_string_literal: true

module NexusCcs
  # One filter section (accordion item) in the sidebar. Blacklight's, plus: a count badge beside the title
  # when values are selected, and under the title (while collapsed) a summary of what is selected,
  # "Medical History Museum +1", as on the static search page.
  class FacetFieldComponent < Blacklight::Facets::FieldComponent
    def selected_values
      @selected_values ||= range_values || @facet_field.search_state.filter(@facet_field.facet_field).values.flatten.compact.map { |value| value_label(value) }
    end

    # Range filters get a slider over the plugin's Begin / End fields; it needs the results' first and last year
    def slider?
      @facet_field.facet_field.range && @facet_field.respond_to?(:min) && @facet_field.min.present? && @facet_field.max.present?
    end

    def selected_count
      selected_values.size
    end

    def summary
      return if selected_values.empty?

      extra = selected_count - 1
      extra.positive? ? "#{selected_values.first} +#{extra}" : selected_values.first
    end

    private

    # A range filter lives in params[:range][field] as begin/end (or just one of them, or "missing")
    def range_values
      return unless @facet_field.facet_field.range

      range = @facet_field.search_state.params.dig(:range, @facet_field.key)
      return [] if range.blank?
      return [ "Missing" ] if range[:missing]

      [ [ range[:begin].presence || "Any", range[:end].presence || "Any" ].join(" – ") ]
    end

    # Range filters are Ranges; query filters (digital asset) are keys with labels in the config
    def value_label(value)
      return "#{value.begin} – #{value.end}" if value.is_a?(Range)

      @facet_field.facet_field.query&.dig(value.to_s, :label) || @facet_field.facet_field.query&.dig(value.to_sym, :label) || value.to_s
    end
  end
end
