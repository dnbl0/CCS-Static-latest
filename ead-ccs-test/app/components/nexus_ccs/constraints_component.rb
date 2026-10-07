# frozen_string_literal: true

module NexusCcs
  # The line above the results: "385 results for" and the search and filters as removable pills. It sits in the
  # results toolbar (catalog/_sort_and_per_page), so Blacklight's own copy in the page header, which
  # builds this component without `inline:`, renders nothing. The "Start over" button is not used: pills
  # remove one thing each, and the sidebar has "Clear all".
  class ConstraintsComponent < Blacklight::ConstraintsComponent
    def initialize(search_state:, inline: false, **)
      super(search_state: search_state, start_over_component: nil, classes: "constraints-container", **)
      @inline = inline
    end

    def render?
      @inline
    end

    def total
      helpers.instance_variable_get(:@response)&.total.to_i
    end

    def heading
      count = helpers.number_with_delimiter(total)
      text = "#{count} #{"result".pluralize(total)}"
      @search_state.has_constraints? || all_filter_pairs.any? ? "#{text} for" : text
    end

    # "Includes all" filters from the advanced search form (f_all) are not Blacklight filters, so they get their
    # own pills, one per value
    def facet_constraints
      super + safe_join(all_filter_pairs.map { |key, value| all_filter_pill(key, value) })
    end

    private

    def all_filter_pairs
      @all_filter_pairs ||= AllFacetFilters.pairs(@search_state.params, helpers.blacklight_config)
    end

    def all_filter_pill(key, value)
      label = helpers.blacklight_config.facet_fields[key].label
      remove = helpers.search_action_path(AllFacetFilters.without(@search_state.params, key, value).except(:page))
      render(Blacklight::ConstraintLayoutComponent.new(
        label: label, value: value, remove_path: remove, classes: [ "filter", "mx-1", "filter-#{key.parameterize}" ], search_state: @search_state
      ))
    end
  end
end
