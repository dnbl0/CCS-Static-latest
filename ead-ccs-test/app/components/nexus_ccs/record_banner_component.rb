# frozen_string_literal: true

module NexusCcs
  # Dark band under the breadcrumb with the record's title. It repeats Blacklight's own h1 for sighted
  # visitors, so it is hidden from assistive technology (the page keeps a single, real h1).
  class RecordBannerComponent < Blacklight::Component
    def initialize(title:)
      @title = title
    end

    attr_reader :title
  end
end
