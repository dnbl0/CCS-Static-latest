# frozen_string_literal: true

# The Advanced search form lets the visitor choose, for each filter, how its ticked values combine: "Includes all" (every
# value, AND), "Includes any" (at least one, OR) or "Excludes all" (none of them, NOT). The form sends the ticked values
# as f_inclusive[field][] with the choice in match[field]; this turns that into Blacklight's own filter parameters, so
# the results page, its removable pills and shared links all use the standard forms:
#   and -> f[field][]=a&f[field][]=b      or -> f_inclusive[field][]=a&f_inclusive[field][]=b (one value: f[field][]=a)
#   not -> f[-field][]=a&f[-field][]=b
# Idempotent: once match is gone from the address there is nothing left to map.
module AdvancedFilterMatch
  extend ActiveSupport::Concern

  MATCHES = %w[and or not].freeze

  included do
    prepend_before_action :apply_advanced_filter_match, only: :index
  end

  private

  def apply_advanced_filter_match
    return unless request.get? || request.head?
    return unless params[:match].respond_to?(:each_pair)

    params[:match].each_pair do |key, match|
      key = key.to_s
      values = Array(params.dig(:f_inclusive, key)).compact_blank.map(&:to_s)
      params[:f_inclusive].delete(key) if params[:f_inclusive].respond_to?(:delete)
      next if values.empty? || !MATCHES.include?(match.to_s) || blacklight_config.facet_fields[key].nil?

      params[:f] = ActionController::Parameters.new unless params[:f].respond_to?(:each_pair)
      place_filter_values(key, match.to_s, values)
    end
    params.delete(:f_inclusive) if params[:f_inclusive].respond_to?(:empty?) && params[:f_inclusive].empty?
    params.delete(:f) if params[:f].respond_to?(:empty?) && params[:f].empty?
    params.delete(:match)

    redirect_to search_action_url(params.to_unsafe_h.except(:controller, :action)) if request.format.html?
  end

  def place_filter_values(key, match, values)
    case match
    when "and" then params[:f][key] = (Array(params[:f][key]) | values)
    when "not" then params[:f]["-#{key}"] = (Array(params[:f]["-#{key}"]) | values)
    else
      combined = Array(params[:f].delete(key)) | values
      if combined.one?
        params[:f][key] = combined
      else
        params[:f_inclusive] = ActionController::Parameters.new unless params[:f_inclusive].respond_to?(:each_pair)
        params[:f_inclusive][key] = combined
      end
    end
  end
end
