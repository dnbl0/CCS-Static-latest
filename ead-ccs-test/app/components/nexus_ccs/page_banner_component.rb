# frozen_string_literal: true

module NexusCcs
  # The dark band under the breadcrumb on the content pages: the page's h1 and a line about it.
  class PageBannerComponent < ViewComponent::Base
    def initialize(title:, description:)
      @title = title
      @description = description
    end

    attr_reader :title, :description
  end
end
