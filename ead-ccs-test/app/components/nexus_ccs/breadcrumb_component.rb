# frozen_string_literal: true

module NexusCcs
  # Gen 3 breadcrumb bar. Items follow the implicit Home link as [label, href] pairs; the last has no link.
  # On narrow screens it collapses to a single "back to parent" link.
  class BreadcrumbComponent < Blacklight::Component
    def initialize(items:)
      @items = items
    end

    attr_reader :items

    def render?
      items.any?
    end

    def current = items.last
    def parent = items[-2]
  end
end
