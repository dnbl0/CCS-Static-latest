# frozen_string_literal: true

module NexusCcs
  # Blacklight's own search bar (query, scope menu, search button, suggestions as you type) with one change: the
  # id of its suggestion list. The gem's template fixes that id as "autocomplete-popup", so a second bar on the same
  # page (the sticky strip beside the search banner) would repeat it; here it is #popup_id. Everything else,
  # including the <auto-complete> element and its behaviour, is the gem's.
  class SuggestingSearchBarComponent < Blacklight::SearchBarComponent
    POPUP_ID = "sticky-autocomplete-popup"

    def popup_id = POPUP_ID
  end
end
