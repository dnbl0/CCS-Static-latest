# frozen_string_literal: true

module NexusCcs
  # A card in a content page's listing that links on to another page (the static site's .pathfinder-alt__link).
  # External cards open in a new tab and say so to screen readers.
  class PathfinderItemComponent < ViewComponent::Base
    def initialize(href:, title:, summary:, external: false, search: false)
      @href = href
      @title = title
      @summary = summary
      @external = external
      @search = search
    end

    attr_reader :href, :title, :summary

    def external? = @external

    # The "search all records" card of the browse page has its own look
    def item_class = @search ? "ct-listing__item ct-listing__item--search" : "ct-listing__item"

    def link_options = external? ? { target: "_blank", rel: "noopener" } : {}
  end
end
