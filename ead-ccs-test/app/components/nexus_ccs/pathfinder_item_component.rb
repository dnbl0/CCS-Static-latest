# frozen_string_literal: true

module NexusCcs
  # One tile of a Pathfinder, after the CCS UI design (Figma R1KcOD0U72yGXc44fMRUjJ, node 102:1279): the whole tile is the
  # link, with an arrow, a title and an optional summary. The title is a heading (h3) when there is a summary and a span
  # when there is not, as the University of Melbourne design system asks for its Pathfinder
  # (https://designsystem.web.unimelb.edu.au/components/pathfinder/), so a title-only tile adds no heading to the page
  # outline. Put the tiles in <ul class="pathfinder"> (three columns) or <ul class="pathfinder pathfinder--cols-4">.
  # External tiles open in a new tab and say so to screen readers. The browse page's "search all records" tile sits in
  # the collections grid, so it also carries that grid's item classes.
  class PathfinderItemComponent < ViewComponent::Base
    def initialize(href:, title:, summary: nil, external: false, search: false)
      @href = href
      @title = title
      @summary = summary
      @external = external
      @search = search
    end

    attr_reader :href, :title, :summary

    def external? = @external

    def title_tag = summary.present? ? :h3 : :span

    def item_class
      classes = [ "pathfinder__item" ]
      classes += [ "ct-listing__item", "ct-listing__item--search" ] if @search
      classes.join(" ")
    end

    def link_options = external? ? { target: "_blank", rel: "noopener" } : {}
  end
end
