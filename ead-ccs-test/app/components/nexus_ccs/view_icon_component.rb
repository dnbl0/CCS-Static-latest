# frozen_string_literal: true

module NexusCcs
  # The result view buttons' icons: app/assets/images/list.svg, grid.svg and mosaic.svg inlined, with their
  # fixed navy fill and size replaced by currentColor and the button's CSS, so the icon turns white on the
  # selected button. One subclass per view (below), registered as the views' `icon:` in CatalogController.
  class ViewIconComponent < Blacklight::Icons::IconComponent
    def self.from_file(file)
      File.read(Rails.root.join("app/assets/images", file))
          .sub(/ height="[^"]*"/, "").sub(/ width="[^"]*"/, "")
          .sub(/ fill="[^"]*"/, ' fill="currentColor" aria-hidden="true" focusable="false"')
    end
  end
end
