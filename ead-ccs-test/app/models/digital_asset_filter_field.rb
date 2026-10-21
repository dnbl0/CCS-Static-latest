# frozen_string_literal: true

# The Digital asset filter is applied by default (CatalogController#default_to_digital_assets). Taking it off has to
# be remembered in the address, or the next page would apply it again: removing it adds the `any_assets` marker, which
# the default checks for, and which then stays on every link of that search.
class DigitalAssetFilterField < Blacklight::SearchState::FilterField
  ANY_ASSETS_PARAM = "any_assets"

  def remove(item)
    state = super
    return state if state.params.dig(filters_key, key).present?

    state.reset(state.params.merge(ANY_ASSETS_PARAM => "1"))
  end
end
