# Overrides the gem's BlacklightHelper (which only includes Blacklight::BlacklightHelperBehavior,
# the module that supplies the layout helpers).
module BlacklightHelper
  include Blacklight::BlacklightHelperBehavior

  # Search results use the full width of the window (fluid and responsive); other pages keep
  # Blacklight's fixed-width container.
  # How many filters (facets, not values) the search has applied: "Search filters (2)".
  def applied_filter_count
    search_state.filters.count { |filter| filter.values.any? } +
      AllFacetFilters.pairs(search_state.params, blacklight_config).map(&:first).uniq.size
  end

  def container_classes
    results_page = controller_name == "catalog" && action_name == "index" && has_search_parameters?
    blacklight_config.full_width_layout || results_page ? "container-fluid" : "container"
  end
end
