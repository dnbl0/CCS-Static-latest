# frozen_string_literal: true

# The empty results page. A search can find nothing only because of its filters, most often the default "With a digital
# asset" one (SearchDefaults): "skull" matches hundreds of records, none with a digital asset. The page then says how many
# results the filters hide (SearchService counts them) and its links keep the search, taking off only the filters.
module ZeroResults
  FILTER_PARAMS = %w[f f_inclusive range].freeze

  # params: the search state's parameters (string keys)
  def self.filtered?(params) = FILTER_PARAMS.any? { |key| params[key].present? }

  # The same search with no filters. The any_assets marker stops the default filter coming back (SearchDefaults).
  def self.without_filters(params)
    params.to_h.stringify_keys.except(*FILTER_PARAMS, "page", "controller", "action")
          .merge(DigitalAssetFilterField::ANY_ASSETS_PARAM => "1")
  end

  # The default filter is the only one applied, so the page can name it
  def self.only_default_filter?(params)
    return false if params["f_inclusive"].present? || params["range"].present?

    params["f"].is_a?(Hash) && params["f"].to_h.stringify_keys == { SearchDefaults::DIGITAL_ASSET_FIELD => [ "with" ] }
  end

  # Added to an empty, filtered response: how many results the same search finds without its filters
  module Response
    attr_accessor :unfiltered_total
  end
end
