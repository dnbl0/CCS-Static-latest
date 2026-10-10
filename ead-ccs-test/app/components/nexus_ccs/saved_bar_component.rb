# frozen_string_literal: true

module NexusCcs
  # The saved-records link in the site header: a slate-teal block with a bookmark icon and "N saved records", linking to
  # the saved list (Blacklight's /bookmarks). HeaderComponent renders it twice: in the desktop top strip beside the
  # search button and at the top of the mobile menu drawer (the static site's .ccs-nav__saved). The number carries Blacklight's `data-role="bookmark-counter"`, which its bookmark
  # JavaScript rewrites after each Save / Saved click; the saved_bar Stimulus controller then updates the words
  # and the icon (bookmark-plus when empty, bookmark-check otherwise) and the live region announces it.
  class SavedBarComponent < ViewComponent::Base
    def initialize(count:)
      @count = count.to_i
    end

    attr_reader :count

    def empty? = count.zero?

    def modifier = empty? ? "site-nav__saved--empty" : nil

    def noun(n) = I18n.t("nexus_ccs.saved_noun", count: n)

    def icon = render(NexusCcs::Icons::BookmarkComponent.new(name: "bookmark"))
  end
end
