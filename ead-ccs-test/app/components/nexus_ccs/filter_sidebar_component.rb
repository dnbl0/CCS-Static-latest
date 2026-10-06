# frozen_string_literal: true

module NexusCcs
  # The search results sidebar. From 992px it is a plain left column; below that it is an off-canvas
  # drawer opened by FilterToggleComponent (controllers/filter_drawer_controller.js). Registered as
  # config.index.sidebar_component; the facet groups are Blacklight's own.
  class FilterSidebarComponent < Blacklight::Search::SidebarComponent
    def applied_count
      helpers.applied_filter_count
    end

    def advanced_filters_path
      helpers.search_action_path(action: "advanced_search")
    end

    # The same search with its filters removed (the search words stay).
    def clear_filters_path
      helpers.search_action_path(helpers.search_state.to_h.except("f", "f_inclusive", "range", "page"))
    end
  end
end
