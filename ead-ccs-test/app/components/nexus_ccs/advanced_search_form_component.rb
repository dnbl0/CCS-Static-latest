# frozen_string_literal: true

module NexusCcs
  # The advanced search form (/catalog/advanced, and the flyout on the results page), after the static site's
  # advanced search but submitting only Blacklight's own parameters to the results page:
  #   clause[i][field|op|query]   a row: search field, match type (must / should / must_not) and terms
  #   f_inclusive[facet][]        a filter that "Includes any" of its ticked values (Blacklight's OR)
  #   f_all[facet][]              a filter that "Includes all" of them (see AllFacetFilters)
  #   range[field][begin|end]     the date ranges (blacklight_range_limit)
  #   sort                        Blacklight's sort field
  # It is Blacklight's AdvancedSearchFormComponent with its own template, so Blacklight still builds the
  # search-field and facet configuration, the form URL and the response with the facet values. Rows, filters
  # and validation are in controllers/advanced_search_controller.js; without JavaScript the first row and every
  # filter are shown and the form still submits.
  class AdvancedSearchFormComponent < Blacklight::AdvancedSearchFormComponent
    MAX_ROWS = 8
    MATCH_TYPES = %w[must should must_not].freeze
    ROW_FIELDS = %w[field op query].freeze

    Row = Struct.new(:field, :op, :query, keyword_init: true)
    Filter = Struct.new(:config, :items, :mode, :selected, keyword_init: true) do
      def key = config.key
      def label = config.label
      def active? = selected.any?
    end
    DateRange = Struct.new(:config, :from, :to, keyword_init: true) do
      def key = config.key
      def label = config.label
    end

    def initialize(response:, modal: false, **)
      super(response: response, **)
      @modal = modal
    end

    def modal? = @modal

    # Blacklight's own pieces of the form (the "match all/any of the fields" menu, the check boxes, the fixed
    # field rows and the "within search" constraints, which the form shows itself) are not used
    def before_render; end

    def form_classes
      (@classes + [ "advanced-form", ("advanced-form--modal" if modal?) ]).compact.join(" ")
    end

    # What the form carries over from the search it was opened from, apart from what it shows itself
    def hidden_search_state_params
      @params.slice(:view, :per_page)
    end

    # The rows to show: the clauses of the current search, else the current query as an all-fields row, else one
    # empty row
    def rows
      @rows ||= begin
        clauses = (@params[:clause] || {}).values.filter_map { |clause| row_from(clause) }
        clauses = [ Row.new(field: "all_fields", op: "must", query: @q) ] if clauses.empty? && @q.present?
        clauses = [ Row.new(field: search_fields.keys.first, op: "must", query: nil) ] if clauses.empty?
        clauses.first(MAX_ROWS)
      end
    end

    def blank_row
      Row.new(field: search_fields.keys.first, op: "must", query: nil)
    end

    def field_options
      search_fields.values.map { |field| [ field.display_label("search"), field.key ] }
    end

    def match_options
      MATCH_TYPES.map { |op| [ t("advanced_search.match.#{op}"), op ] }
    end

    # Every list filter, with the values the response offers and what the current search has ticked
    def filters
      @filters ||= filter_configs.filter_map do |config|
        facet = @response.aggregations[config.field]
        items = facet ? facet.items.reject { |item| item.value.to_s.blank? } : []
        any = Array(@params.dig(:f_inclusive, config.key)) + Array(@params.dig(:f, config.key))
        all = Array(@params.dig(:f_all, config.key))
        selected = all.presence || any
        next if items.empty? && selected.empty?

        Filter.new(config: config, items: merge_selected(items, selected), mode: all.any? ? "all" : "any", selected: selected.map(&:to_s))
      end
    end

    def date_ranges
      @date_ranges ||= range_configs.map do |config|
        range = @params.dig(:range, config.key) || {}
        DateRange.new(config: config, from: range[:begin], to: range[:end])
      end
    end

    def sort_options
      sort_fields.values.map { |config| [ helpers.sort_field_label(config.key), config.key ] }
    end

    def selected_sort = @params[:sort].presence

    def max_rows = MAX_ROWS

    private

    def row_from(clause)
      field = clause[:field].to_s
      return unless search_fields.key?(field)

      op = MATCH_TYPES.include?(clause[:op].to_s) ? clause[:op].to_s : (MATCH_TYPES.include?(@params[:op].to_s) ? @params[:op].to_s : "must")
      Row.new(field: field, op: op, query: clause[:query])
    end

    # Facets that are lists of values (the range filters and the digital asset switch are shown elsewhere)
    def filter_configs
      blacklight_config.facet_fields.values.select do |config|
        !config.range && !config.query && (config.include_in_advanced_search || config.include_in_advanced_search.nil?)
      end
    end

    def range_configs
      blacklight_config.facet_fields.values.select { |config| config.range && (config.include_in_advanced_search || config.include_in_advanced_search.nil?) }
    end

    # A ticked value that the facet list no longer offers (it is past the facet's limit) is still shown ticked
    def merge_selected(items, selected)
      offered = items.map { |item| item.value.to_s }
      extra = selected.map(&:to_s).reject { |value| offered.include?(value) }.map { |value| Struct.new(:value, :hits).new(value, nil) }
      items + extra
    end
  end
end
