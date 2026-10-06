# frozen_string_literal: true

# "No results for X — showing results for Y instead", rendered above the result list 
class SpellingCorrectionComponent < ViewComponent::Base
  def initialize(response:)
    @correction = response.try(:spelling_correction)
    super()
  end

  # SpellingCorrection::Response is only extended onto responses that were retried
  # so every ordinary response returns nil and the component stays out of the markup
  def render?
    @correction.present?
  end

  private

  attr_reader :correction

  # Mirrors Blacklight::Response::SpellcheckComponent#link_to_query: a fresh
  # search for the chosen alternative.
  def suggestion_link(word)
    params = helpers.search_state.to_h.except(:page, :action)
    params[:q] = word
    link_to(word, helpers.search_action_path(params))
  end
end