# frozen_string_literal: true

# The page for an error (config.exceptions_app sends the failed request here as /400, /404, /406, /422 or /500): the site header
# and footer, a banner naming what happened and what to do next, in the University's patterns (page banner, arrow links).
# If this page cannot be drawn either (the database or the layout is what failed), the stock file in public/ is sent instead.
class ErrorsController < ApplicationController
  layout "pages"

  CODES = %w[400 404 406 422 500].freeze

  # A record's address (the site's record page and the stock record pages): the copy is about the record. Blacklight's other
  # /catalog/... pages (advanced, suggest, facet) are not records.
  RECORD_PATH = %r{\A/(catalog|stock|branded-stock)/(?!advanced\z|suggest\z|facet\z)[^/]+\z}

  rescue_from StandardError, with: :static_error_file

  def show
    @code = error_code
    @path = request.original_fullpath.to_s
    @record = @code == "404" && @path.split("?").first.match?(RECORD_PATH)
    render :show, status: @code.to_i, formats: :html
  end

  private

  def error_code = CODES.include?(params[:code].to_s) ? params[:code].to_s : "500"

  def static_error_file(_error)
    render file: Rails.public_path.join("#{error_code}.html"), layout: false, status: error_code.to_i, formats: :html
  end
end
