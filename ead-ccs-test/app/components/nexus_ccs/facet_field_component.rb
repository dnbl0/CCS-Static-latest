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

    # Whether a range is applied: with none, the slider's From / To fields are empty (Minimum / Maximum shown)
    def range_applied?
      @facet_field.respond_to?(:selected_range) && @facet_field.selected_range.present?
    end

    # Filters whose values are short phrases show twelve before "Show all", the rest six (the static search page's
    # "chips" and "list" filters); a few have no search box because they only ever have a handful of values.
    SHORT_VALUE_FIELDS = %w[creator_role classification object_type language region period theme licen access film format].freeze
    NO_SEARCH_FIELDS = %w[theme licen access film format].freeze

    # Whether the panel is a plain list of values that gets the search box and "Show all" link (not a range slider
    # or a yes/no query filter)
    def value_list?
      !slider? && !@facet_field.facet_field.range && @facet_field.facet_field.query.blank?
    end

    def panel_limit
      SHORT_VALUE_FIELDS.any? { |name| @facet_field.key.to_s.include?(name) } ? 12 : 6
    end

    def panel_search?
      NO_SEARCH_FIELDS.none? { |name| @facet_field.key.to_s.include?(name) }
    end

    def panel_search_label
      "Search #{@facet_field.label.to_s.downcase}…"
    end

    # Every filter starts closed, even one with values selected: the box shows what is chosen
    def collapsed?
      true
    end

    def placeholder
      "Select #{@facet_field.label.to_s.downcase}"
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
