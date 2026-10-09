# frozen_string_literal: true

# The pages of the static prototype (public/ in the repository root): home, browse collections, a page per collection,
# help and contact. Their text is in config/pages.yml (SitePages); the help sections are in app/views/pages/help.
class PagesController < ApplicationController
  layout "pages"

  def home; end

  def collections
    @page = SitePages.browse
    counts = CollectionCounts.new
    @counts = counts.by_slug
    @named_counts = counts.by_named_collection
  end

  def collection
    @collection = SitePages.collection(params[:slug]) or raise ActionController::RoutingError, "Not Found"
    @facet_value = NexusCcs::SiteNavigation.facet_value(params[:slug])
  end

  # /help is one page with a section for each topic. The old /help?topic=<key> links go to the topic's own page or section.
  def help
    topic = HelpTopic.find(params[:topic])
    redirect_to topic.path(helpers), status: :moved_permanently if topic
  end

  def search_tips; end

  def indigenous_data = render("pages/help/indigenous_data")

  def about; end

  def contact; end
end
