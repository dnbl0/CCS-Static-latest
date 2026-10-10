# frozen_string_literal: true

module NexusCcs
  module Icons
    # The save control's bookmark pair, replacing Blacklight's bookmark icon (config.bookmark_icon_component). Both
    # drawings are in the markup and the stylesheet shows one: an outline bookmark with a plus ("Save") and a filled
    # bookmark with a check ("Saved"). The class names are Blacklight's own (bookmark-unchecked, bookmark-checked).
    class BookmarkComponent < Blacklight::Icons::IconComponent
      self.svg = <<~SVG
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="bookmark-unchecked" aria-hidden="true" focusable="false">
          <path d="M6 3.5h12a.5.5 0 0 1 .5.5v16.2l-6.5-3.9-6.5 3.9V4a.5.5 0 0 1 .5-.5Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
          <path d="M12 7.5v6M9 10.5h6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="bookmark-checked" aria-hidden="true" focusable="false">
          <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4.2L5 21V4a1 1 0 0 1 1-1Z" fill="currentColor"/>
          <path d="m8.8 10.2 2.3 2.3 4.1-4.4" fill="none" stroke="var(--save-check, #fff)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      SVG
    end
  end
end
