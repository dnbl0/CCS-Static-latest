# frozen_string_literal: true

# Shows the Acknowledgement of Country once per time period per
# browser session. State lives in a single cookie with an expiry.

module CountryAcknowledgement
  extend ActiveSupport::Concern

  COOKIE_KEY = :country_acknowledged

  # How long an acknowledgement lasts before the modal is shown again.
  ACKNOWLEDGEMENT_PERIOD = 1.day

  included do
    helper_method :acknowledge_country?
  end

  # True on the first render of each period. Reading the flag also sets it
  def acknowledge_country?
    return @acknowledge_country if defined?(@acknowledge_country)

    @acknowledge_country = cookies[COOKIE_KEY].blank?
    # Written only when absent. Rewriting on every visit would push the expiry
    # forward each time, so a daily visitor would never see the modal again.
    if @acknowledge_country
      cookies[COOKIE_KEY] = {
        value: "1",
        expires: ACKNOWLEDGEMENT_PERIOD.from_now,
        httponly: true,
        same_site: :lax
      }
    end
    @acknowledge_country
  end
end