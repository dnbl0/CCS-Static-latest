module ApplicationHelper
  # The results page filtered to one collection, by the collection's slug (config/pages.yml). The collection landing pages are
  # gone: every link to a collection goes here.
  def collection_results_path(slug)
    search_action_path(f: { collection_ssim: [ NexusCcs::SiteNavigation.facet_value(slug) ] }, search_field: "all_fields")
  end

end
