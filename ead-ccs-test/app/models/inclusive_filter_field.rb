# frozen_string_literal: true

# A facet whose selected values are alternatives: choosing Creator and Artist under Creator role finds records
# with either, where Blacklight's own filter field would require both. One value stays an ordinary filter
# (f[field][]); two or more become Blacklight's inclusive "any of" filter (f_inclusive[field][]), which its
# query builder and constraint pills already understand. Different facets still narrow each other (AND).
class InclusiveFilterField < Blacklight::SearchState::FilterField
  def add(item)
    value = as_url_parameter(item)
    return super unless plain?(item, value)

    replace(search_state.reset_search, selected + [ value ])
  end

  def remove(item)
    value = as_url_parameter(item)
    return super unless plain?(item, value)

    replace(search_state.reset_search, selected - [ value ])
  end

  def include?(item)
    value = as_url_parameter(item)
    return super unless plain?(item, value)

    selected.include?(value)
  end

  private

  # A single value of this field, not a "missing" value, a group of values or a value of another field.
  def plain?(item, value)
    value.is_a?(String) && !(item.respond_to?(:fq) && item.fq.present?) && !(item.respond_to?(:field) && item.field != key)
  end

  def selected
    [ search_state.params.dig(filters_key, key), search_state.params.dig(inclusive_filters_key, key) ].flatten.compact.uniq
  end

  def replace(state, values)
    values = values.uniq
    params = state.params
    plain_filters = (params[filters_key] || {}).dup.tap { |h| h.delete(key) }
    any_of = (params[inclusive_filters_key] || {}).dup.tap { |h| h.delete(key) }
    (values.one? ? plain_filters : any_of)[key] = values if values.any?

    plain_filters.empty? ? params.delete(filters_key) : params[filters_key] = plain_filters
    any_of.empty? ? params.delete(inclusive_filters_key) : params[inclusive_filters_key] = any_of
    state.reset(params)
  end
end
