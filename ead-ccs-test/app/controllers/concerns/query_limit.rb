# The search box takes at most 255 characters (CCS-33); anything longer is cut before searching.
module QueryLimit
  extend ActiveSupport::Concern

  MAX_LENGTH = 255

  included do
    prepend_before_action :limit_query_length
  end

  private

  def limit_query_length
    params[:q] = params[:q].first(MAX_LENGTH) if params[:q].is_a?(String) && params[:q].length > MAX_LENGTH
  end
end
