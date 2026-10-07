# frozen_string_literal: true

# The static pages of the site: home, browse collections, a page per collection, help and contact. Their content
# follows the static prototype (public/ in the repository root); the collection data is in config/pages.yml and the
# help topics are partials under app/views/pages/help.
class PagesController < ApplicationController
  Topic = Data.define(:key, :title, :blurb, :icon) do
    def path(view) = key == "indigenous" ? view.indigenous_data_path : view.help_path(topic: key)
  end

  HELP_TOPICS = [
    Topic.new("faq", "Frequently Asked Questions", "Answers to common questions about searching and using items from the university's cultural collections.", "help-faq"),
    Topic.new("search-tips", "Search Tips", "These tips help you to easily find information, images, audio, and video held in the university's cultural collections.", "help-search-tips"),
    Topic.new("indigenous", "Indigenous Cultural Data and Access", "Information on respectful discovery of Aboriginal and Torres Strait Islander cultural heritage and knowledge.", "help-indigenous"),
    Topic.new("copyright", "Copyright and Terms of Use", "How a collection item can be used varies depending on the conditions of its copyright license, intellectual property or cultural advice.", "help-rights"),
    Topic.new("access", "Access and Information", "How to submit a request to access an item or for further information from the Collections team.", "help-access"),
    Topic.new("privacy", "Privacy", "How the University respects the privacy of protecting and managing personal information.", "help-privacy")
  ].freeze

  PAGES = Rails.root.join("config/pages.yml")

  layout "pages"

  def home; end

  def collections
    @page = page_data.fetch("browse")
    @counts = collection_counts.transform_keys { |facet_value| slug_for(facet_value) }.compact
    @named_counts = named_collection_counts
  end

  def collection
    @collection = page_data.fetch("collections").fetch(params[:slug]) { raise ActionController::RoutingError, "Not Found" }
    @facet_value = NexusCcs::SiteNavigation.facet_value(params[:slug])
  end

  # /help shows the topics; /help?topic=faq one of them
  def help
    @topic = HELP_TOPICS.find { |topic| topic.key == params[:topic] && topic.key != "indigenous" }
    redirect_to indigenous_data_path if params[:topic] == "indigenous"
  end

  def indigenous_data = render("pages/help/indigenous_data")

  def contact; end

  private

  def page_data
    @@page_data ||= YAML.load_file(PAGES) # rubocop:disable Style/ClassVars
  end

  def slug_for(facet_value)
    NexusCcs::SiteNavigation::COLLECTIONS.find { |_label, value, _slug| value == facet_value }&.last
  end

  # Record counts per collection and per named collection from Solr. The pages work without them (an unreachable
  # Solr only means no counts are shown).
  def collection_counts = facet_counts("collection_ssim")

  def named_collection_counts = facet_counts("named_collection_ssim")

  def facet_counts(field)
    response = blacklight_config.repository_class.new(blacklight_config).search(
      params: { q: "*:*", rows: 0, facet: true, "facet.field": field, "facet.limit": -1, "facet.mincount": 1 }
    )
    Hash[*Array(response.dig("facet_counts", "facet_fields", field))]
  rescue StandardError => e
    Rails.logger.warn("Pages: no #{field} counts (#{e.class}: #{e.message})")
    {}
  end
end
