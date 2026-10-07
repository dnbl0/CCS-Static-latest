# frozen_string_literal: true

module NexusCcs
  # The design system's pathfinder tile (designsystem.web.unimelb.edu.au/components/pathfinder): a link to another page.
  # Tiles go inside a `grid grid--cols-N grid--collapsed` wrapper; `alt` greys every other tile. External tiles open in a
  # new tab and say so to screen readers. `search` is the inverse (navy) tile the browse page uses inside its listing.
  class PathfinderItemComponent < ViewComponent::Base
    def initialize(href:, title:, summary:, external: false, search: false, alt: false)
      @href = href
      @title = title
      @summary = summary
      @external = external
      @search = search
      @alt = alt
    end

    attr_reader :href, :title, :summary

    def external? = @external

    def search? = @search

    def tile_class = ["pathfinder", ("pathfinder--inverse" if search?), ("pathfinder--alt" if @alt)].compact.join(" ")

    def link_options = external? ? { target: "_blank", rel: "noopener" } : {}
  end
end
