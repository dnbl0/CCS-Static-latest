# frozen_string_literal: true

module NexusCcs
  # The saved-records link at the right end of the breadcrumb strip, like the Study site's saved courses: a slate-teal
  # block with a bookmark icon and "N saved records", linking to the saved list (Blacklight's /bookmarks). Both
  # breadcrumb components (BreadcrumbComponent, PageBreadcrumbsComponent) render it, so every page with a breadcrumb has
  # it, and it fills the strip's full height (breadcrumb_strip.css). The home page has no breadcrumb, so the
  # header's top strip carries it there (`placement: :header`). The number carries Blacklight's
  # `data-role="bookmark-counter"`, which its bookmark JavaScript rewrites after each Save / Saved click; the
  # saved_bar Stimulus controller then updates the words and the icon (bookmark-plus when empty, bookmark-check
  # otherwise) and the live region announces it.
  class SavedBarComponent < ViewComponent::Base
    # `count` defaults to the visitor's saved records (0 where the page has no session, e.g. a component test).
    def initialize(count: nil, placement: :breadcrumb)
      @count = count
      @placement = placement
    end

    def count
      @count ||= helpers.respond_to?(:saved_records_count) ? helpers.saved_records_count.to_i : 0
    end

    def classes = [ "site-nav__saved", (placement == :header ? "site-nav__saved--header" : nil), (empty? ? "site-nav__saved--empty" : nil) ].compact.join(" ")

    attr_reader :placement

    def empty? = count.zero?

    def noun(n) = I18n.t("nexus_ccs.saved_noun", count: n)

    def icon = render(NexusCcs::Icons::BookmarkComponent.new(name: "bookmark"))
  end
end
