# frozen_string_literal: true

# The pages of the static prototype (public/ in the repository root): home, browse collections, a page per collection,
# help and contact. Their text is in config/pages.yml (SitePages) and the help topics (HelpTopic) are partials under
# app/views/pages/help.
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

  # /help shows the topics; /help?topic=faq one of them
  def help
    return redirect_to indigenous_data_path if HelpTopic.find(params[:topic])&.indigenous?

    @topic = HelpTopic.find_shown(params[:topic])
  end

  def indigenous_data = render("pages/help/indigenous_data")

  def contact; end
end
