# The range limit plugin gives the applied-filter pill its value as HTML ("<span class=from>1900</span> to ..."),
# which Blacklight escapes into the remove link's hidden text, so a screen reader reads out the markup.
module NexusConstraintLabel
  def remove_aria_label
    ActionController::Base.helpers.strip_tags(CGI.unescapeHTML(super.to_s))
  end
end

Rails.application.config.to_prepare do
  Blacklight::ConstraintLayoutComponent.prepend(NexusConstraintLabel) unless Blacklight::ConstraintLayoutComponent < NexusConstraintLabel
end
