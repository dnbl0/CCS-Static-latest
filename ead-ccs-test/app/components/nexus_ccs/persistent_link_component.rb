# frozen_string_literal: true

module NexusCcs
  # A record's persistent link with a copy button (CCS-25), as the CCS UI card: a link icon, "Persistent link" and the
  # URL, a Copy link button, then a footer with the note and "View in collection browser" (the existing leaving-the-
  # site dialog). Behaviour: controllers/clipboard_controller.js.
  class PersistentLinkComponent < Blacklight::Component
    def initialize(url:, document: nil)
      @url = url
      @document = document
    end

    attr_reader :url, :document
  end
end
