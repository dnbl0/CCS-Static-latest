# frozen_string_literal: true

module NexusCcs
  # The Save / Saved toggle on a record (result cards and the record page). It is Blacklight's own bookmark control:
  # the same form, the same `bookmark-toggle` / `data-checkboxsubmit-target` hooks, so Blacklight's JavaScript
  # submits it without a page reload and updates every `data-role="bookmark-counter"` (the header's saved bar).
  # Only the words, the icon, the accessible name ("Save record: <title>") and the markup around them change.
  class SaveControlComponent < Blacklight::Document::BookmarkComponent
    def title
      helpers.document_presenter(@document).heading
    end

    def state_class
      bookmarked? ? "checked" : nil
    end
  end
end
