# frozen_string_literal: true

module NexusCcs
  # Gen 3 breadcrumb bar. Items follow the implicit Home link as [label, href] pairs; the last has no link.
  # On narrow screens it collapses to a single "back to parent" link.
  #
  # The last label is the current page's name, and for a record that is its title, which can run to hundreds of
  # characters. The strip shows the first MAX_LABEL_LENGTH (cut at a word, ending in an ellipsis) and the span's
  # title attribute carries the whole label, so hovering shows all of it. The page's own h1 has the full title for
  # everyone else, and a label that fits gets no title attribute (it would only repeat the text).
  class BreadcrumbComponent < Blacklight::Component
    MAX_LABEL_LENGTH = 60

    def initialize(items:)
      @items = items
    end

    attr_reader :items

    def render?
      items.any?
    end

    def current = items.last

    # What the strip shows for the current page's label
    def shown(label) = label.to_s.truncate(MAX_LABEL_LENGTH, separator: " ", omission: "…")

    # The whole label when it was cut, else nil (so the span gets no title attribute)
    def full_label(label) = (label.to_s if shown(label) != label.to_s)
    def parent = items[-2]
  end
end
