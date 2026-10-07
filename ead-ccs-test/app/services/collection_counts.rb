# frozen_string_literal: true

# How many records each collection and named collection holds, from Solr's facets. The pages that show them work
# without: an unreachable Solr only means no counts (they are logged).
class CollectionCounts
  def initialize(blacklight_config: CatalogController.blacklight_config)
    @repository = blacklight_config.repository_class.new(blacklight_config)
  end

  # { landing page slug => count }
  def by_slug
    facet("collection_ssim").each_with_object({}) do |(value, count), counts|
      slug = NexusCcs::SiteNavigation.slug_for(value)
      counts[slug] = count if slug
    end
  end

  # { named collection => count }
  def by_named_collection = facet("named_collection_ssim")

  private

  def facet(field)
    response = @repository.search(params: { q: "*:*", rows: 0, facet: true, "facet.field": field, "facet.limit": -1, "facet.mincount": 1 })
    Hash[*Array(response.dig("facet_counts", "facet_fields", field))]
  rescue StandardError => e
    Rails.logger.warn("CollectionCounts: no #{field} counts (#{e.class}: #{e.message})")
    {}
  end
end
