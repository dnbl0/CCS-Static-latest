# Rules for the text a visitor types in the search box (CCS-33):
#   - at most 255 characters;
#   - no special characters: only letters, digits, spaces and the few characters needed for exact
#     phrases and Boolean searches (CCS-34: quotes and parentheses) and for real names and titles
#     (apostrophe, comma, full stop, hyphen, ampersand) are kept. Everything else (such as * : [ ] { } ! + ~ ^ \ | / < >)
#     is Solr query syntax, so it is replaced by a space rather than interpreted ("red+blue" searches for red blue);
#   - a blank search is allowed and returns every record.
# If characters were removed the visitor is told; if nothing searchable is left they are asked for a valid search.
module QueryRules
  extend ActiveSupport::Concern

  MAX_LENGTH = 255
  ALLOWED = /[^\p{L}\p{M}\p{N}\s"'’“”().,&-]/
  INVALID_MESSAGE = "Please enter a valid search string.".freeze
  REMOVED_MESSAGE = "Special characters can't be used in a search, so they were removed from your search.".freeze

  # Pure function so it can be tested without a request: returns the cleaned text.
  def self.clean(text)
    text.to_s.first(MAX_LENGTH).gsub(ALLOWED, " ").squish
  end

  included do
    prepend_before_action :apply_query_rules
  end

  private

  def apply_query_rules
    return unless request.get? || request.head?

    cleaned = apply_query_rule_to(params, :q)
    params[:clause].each_value { |clause| cleaned &&= apply_query_rule_to(clause, :query) } if params[:clause].respond_to?(:each_value)
    return if cleaned

    respond_to do |format|
      format.json { render json: { error: INVALID_MESSAGE }, status: :unprocessable_content }
      format.any { redirect_to root_path, alert: INVALID_MESSAGE }
    end
  end

  # Cleans params[key] in place. Returns false when the visitor typed something but nothing searchable is left.
  def apply_query_rule_to(holder, key)
    original = holder[key]
    return true unless original.is_a?(String) && original.present?

    cleaned = QueryRules.clean(original)
    return false if cleaned.empty? && original.strip.present?

    holder[key] = cleaned
    flash.now[:notice] = REMOVED_MESSAGE if cleaned != original.squish.first(MAX_LENGTH) && !flash.now[:notice]
    true
  end
end
