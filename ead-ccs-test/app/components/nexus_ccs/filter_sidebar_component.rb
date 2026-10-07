# frozen_string_literal: true

module NexusCcs
  # The search results sidebar. From 992px it is a plain left column; below that it is an off-canvas
  # drawer opened by FilterToggleComponent (controllers/filter_drawer_controller.js). Registered as
  # config.index.sidebar_component; the facet groups are Blacklight's own.
  class FilterSidebarComponent < Blacklight::Search::SidebarComponent
    def digital_filter
      helpers.blacklight_config.facet_fields.fetch(DIGITAL_FILTER)
    end

    def applied_count
      helpers.applied_filter_count
    end

    DIGITAL_FILTER = "has_digital_asset"
    DIGITAL_ONLY = "with"

    # The "Digital assets" switch is the Digital asset filter's "with" value: on shows only records that have a
    # digital asset, off shows them all (the filter below still offers "without").
    def digital_only?
      helpers.search_state.filter(digital_filter).values.include?(DIGITAL_ONLY)
    end

    def digital_toggle_path
      filter = helpers.search_state.filter(digital_filter)
      state = digital_only? ? filter.remove(DIGITAL_ONLY) : filter.add(DIGITAL_ONLY)
      helpers.search_action_path(state.to_h.except("page"))
    end

    # The same search with its filters removed (the search words stay).
    def clear_filters_path
      helpers.search_action_path(helpers.search_state.to_h.except("f", "f_inclusive", "range", "page"))
    end
  end
end
