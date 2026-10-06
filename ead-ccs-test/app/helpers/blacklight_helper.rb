# Overrides the gem's BlacklightHelper (which only includes Blacklight::BlacklightHelperBehavior,
# the module that supplies the layout helpers).
module BlacklightHelper
  include Blacklight::BlacklightHelperBehavior

  # Search results use the full width of the window (fluid and responsive); other pages keep
  # Blacklight's fixed-width container.
  def container_classes
    results_page = controller_name == "catalog" && action_name == "index" && has_search_parameters?
    blacklight_config.full_width_layout || results_page ? "container-fluid" : "container"
  end
end
