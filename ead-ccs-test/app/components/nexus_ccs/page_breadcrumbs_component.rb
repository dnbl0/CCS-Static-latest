# frozen_string_literal: true

module NexusCcs
  # The breadcrumb bar of the content pages (the static site's .page-breadcrumbs). The trail follows the implicit Home
  # link as [label, href] pairs; the last has no link. Under 769px it is one link back to the parent page.
  class PageBreadcrumbsComponent < ViewComponent::Base
    def initialize(trail:)
      @trail = trail
    end

    attr_reader :trail

    def parent = trail[-2]

    def parent_label = parent ? parent.first : "Cultural Collections"

    def parent_href = parent ? parent.last : helpers.root_path
  end
end
