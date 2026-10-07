# frozen_string_literal: true

# The advanced search form's "Includes all" filters: f_all[facet][]=value. Each value must be present on the
# record, unlike the sidebar's f[facet][] and the form's "Includes any" f_inclusive[facet][], which Blacklight
# (and OrFilterQueryBuilder) OR together.
module AllFacetFilters
  PARAM = :f_all

  # Yields [facet config, value] for every value of every list facet in the params
  def self.each(params, blacklight_config)
    all = params[PARAM]
    return unless all.respond_to?(:each_pair)

    all.each_pair do |facet, values|
      config = blacklight_config.facet_fields[facet.to_s]
      next if config.nil? || config.range || config.query

      Array(values).compact_blank.each { |value| yield config, value.to_s }
    end
  end

  # [[facet key, value], ...] from the params
  def self.pairs(params, blacklight_config)
    [].tap { |list| each(params, blacklight_config) { |config, value| list << [ config.key, value ] } }
  end

  # The params with one value taken out (the pill's remove link)
  def self.without(params, key, value)
    params = params.deep_dup
    params[PARAM][key] = Array(params[PARAM][key]) - [ value ]
    params[PARAM].delete(key) if params[PARAM][key].empty?
    params.delete(PARAM) if params[PARAM].empty?
    params
  end
end
