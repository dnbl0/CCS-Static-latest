# frozen_string_literal: true

module NexusCcs
  # One tile of the mosaic: an image filling it, or a file's kind, icon and name, as a button that opens the gallery at that item.
  class DigitalAssetsMosaicTileComponent < Blacklight::Component
    def initialize(item:, label:, kind_icon:, name:, ratio:, first:, more: 0)
      @item = item
      @label = label
      @kind_icon = kind_icon
      @name = name
      @ratio = ratio
      @first = first
      @more = more
    end

    attr_reader :item, :label, :kind_icon, :name, :ratio, :first, :more

    def image? = item[:kind] == "image"

    # The name carries what the tile says ("+2"), so that it is part of the button's accessible name (WCAG 2.5.3)
    def accessible_name = more.positive? ? "+#{more} more: #{label}" : label

    # On a phone only the first tile shows
    def visibility = first ? "" : "d-none d-lg-block"
  end
end
