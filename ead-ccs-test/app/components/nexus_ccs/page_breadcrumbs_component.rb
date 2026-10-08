# frozen_string_literal: true

module NexusCcs
  # The breadcrumb bar of the content pages (the static site's .page-breadcrumbs). The trail follows the implicit Home
  # link as [label, href] pairs; the last has no link. The whole trail shows at every width (it wraps on a phone).
  class PageBreadcrumbsComponent < ViewComponent::Base
    def initialize(trail:)
      @trail = trail
    end

    attr_reader :trail
  end
end
