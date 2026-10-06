# frozen_string_literal: true

module NexusCcs
  # The "gallery" result view button's icon (grid.svg); see ViewIconComponent.
  class GalleryViewIconComponent < ViewIconComponent
    self.svg = from_file("grid.svg")
    def name = "gallery"
  end
end
