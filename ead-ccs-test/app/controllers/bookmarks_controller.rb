# frozen_string_literal: true

# Blacklight 9.0.0's own BookmarksController, with verify_user fixed: the gem calls
# `action`, which Rails 8.1 no longer resolves, so every /bookmarks request raised
# NameError. Remove this override when Blacklight ships the `action_name` fix.
class BookmarksController < CatalogController
  include Blacklight::Bookmarks

  private

  def verify_user
    unless current_or_guest_user || (action_name == "index" && token_or_current_or_guest_user)
      flash[:notice] = I18n.t("blacklight.bookmarks.need_login")
      raise Blacklight::Exceptions::AccessDenied
    end
  end
end
