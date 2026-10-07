# frozen_string_literal: true

# The text of the browse collections page and of the collection landing pages (config/pages.yml).
module SitePages
  PATH = Rails.root.join("config/pages.yml")

  class << self
    def browse = data.fetch("browse")

    # The landing page data of a collection, by slug; nil for an unknown one
    def collection(slug) = data.fetch("collections")[slug]

    def slugs = data.fetch("collections").keys

    private

    def data = @data ||= YAML.load_file(PATH).freeze
  end
end
