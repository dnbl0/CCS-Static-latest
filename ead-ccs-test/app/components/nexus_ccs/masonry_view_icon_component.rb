# frozen_string_literal: true

module NexusCcs
  # The "masonry" result view button's icon (mosaic.svg); see ViewIconComponent.
  class MasonryViewIconComponent < ViewIconComponent
    self.svg = from_file("mosaic.svg")
    def name = "masonry"
  end
end
