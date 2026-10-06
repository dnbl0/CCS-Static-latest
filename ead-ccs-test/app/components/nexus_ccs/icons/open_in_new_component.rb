# frozen_string_literal: true

module NexusCcs
  module Icons
    # "Opens in a new place" arrow, from the hi-fi prototype's icon set.
    class OpenInNewComponent < Blacklight::Icons::IconComponent
      self.svg = <<~SVG
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
          <path d="M19 19H5V5h7V3H3v18h18v-9h-2v7ZM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7Z"/>
        </svg>
      SVG
    end
  end
end