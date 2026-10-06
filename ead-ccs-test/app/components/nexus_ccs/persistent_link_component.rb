# frozen_string_literal: true

module NexusCcs
  # A record's persistent link with a copy button (CCS-25). Behaviour: controllers/clipboard_controller.js.
  class PersistentLinkComponent < Blacklight::Component
    def initialize(url:)
      @url = url
    end

    attr_reader :url
  end
end
