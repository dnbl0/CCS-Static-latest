# frozen_string_literal: true

module NexusCcs
  # The search results sidebar. From 992px it is a plain left column; below that it is an off-canvas
  # drawer opened by FilterToggleComponent (controllers/filter_drawer_controller.js). Registered as
  # config.index.sidebar_component; the facet groups are Blacklight's own.
  class FilterSidebarComponent < Blacklight::Search::SidebarComponent
  end
end
