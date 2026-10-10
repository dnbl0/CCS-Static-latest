# frozen_string_literal: true

module NexusCcs
  # The saved-records bar under the site header: a bookmark icon and "N saved records", linking to the saved list
  # (Blacklight's /bookmarks). The number carries Blacklight's `data-role="bookmark-counter"`, which its bookmark
  # JavaScript rewrites after each Save / Saved click; the saved_bar Stimulus controller then updates the words
  # and the icon (bookmark-plus when empty, bookmark-check otherwise) and the live region announces it.
  class SavedBarComponent < ViewComponent::Base
    def initialize(count:)
      @count = count.to_i
    end

    attr_reader :count

    def empty? = count.zero?

    def modifier = empty? ? "saved-bar--empty" : nil

    def noun(n) = I18n.t("nexus_ccs.saved_noun", count: n)

    def icon = render(NexusCcs::Icons::BookmarkComponent.new(name: "bookmark"))
  end
end
