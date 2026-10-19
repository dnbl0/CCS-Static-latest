# frozen_string_literal: true

module NexusCcs
  # The breadcrumb bar of the content pages (the static site's .page-breadcrumbs). The trail follows the implicit Home
  # link as [label, href] pairs; the last has no link. At 768px and below the trail gives way to a single "back to
  # parent" link, as in BreadcrumbComponent (Cultural Collections, the home page, when the trail has no parent).
  class PageBreadcrumbsComponent < ViewComponent::Base
    def initialize(trail:)
      @trail = trail
    end

    attr_reader :trail

    def parent = trail[-2]
  end
end
