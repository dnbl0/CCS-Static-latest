# frozen_string_literal: true

module NexusCcs
  # One filter of the Advanced search form: its most common values as checkboxes, with a menu saying how the ticked values
  # combine (like SearchWorks' "Includes all / Includes any / Excludes all"). The checkboxes are f_inclusive[field][] and
  # the menu is match[field]; AdvancedFilterMatch turns them into Blacklight's own filter parameters.
  #
  # The menu and the ticks start from the search being edited, so opening Advanced search from a results page shows what
  # is applied. A value that is applied but not among the listed ones (the list is only the most common values) is
  # listed first, ticked, so it is neither lost nor impossible to remove.
  class AdvancedFilterComponent < Blacklight::Facets::CheckboxesComponent
    MATCHES = [ [ "Includes all", "and" ], [ "Includes any", "or" ], [ "Excludes all", "not" ] ].freeze

    def initialize(facet_field:, layout: nil)
      super
      @key = facet_field.key
    end

    attr_reader :key

    def matches = MATCHES

    # What the filter does in the search being edited; "any" (the form's long-standing behaviour) when it is not applied yet
    def match
      return "not" if excluded.any?
      return "or" if search_state_params.dig(:f_inclusive, key).present?

      Array(search_state_params.dig(:f, key)).size > 1 ? "and" : "or"
    end

    def excluded = Array(search_state_params.dig(:f, "-#{key}")).compact_blank

    # Applied values that the list of common values does not show
    def unlisted
      listed = presenters.map(&:value)
      applied = Array(search_state_params.dig(:f, key)) + Array(search_state_params.dig(:f_inclusive, key)) + excluded
      applied.compact_blank.uniq - listed
    end

    def checked?(presenter) = presenter.selected? || excluded.include?(presenter.value)

    def control_id(index) = "f_inclusive_#{key}_#{index}"

    private

    def search_state_params = helpers.search_state.params
  end
end
