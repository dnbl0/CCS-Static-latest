# Blacklight's facet list, checkbox and range components each hard-code Blacklight::Facets::FieldComponent as
# the section around them. Swap in NexusCcs::FacetFieldComponent (the same section plus the selected-value
# badge and summary) without copying those components.
module NexusFacetLayout
  def initialize(*, **kwargs)
    super
    # the range component uses Blacklight's deprecated FieldComponent subclass, so match subclasses too
    @layout = NexusCcs::FacetFieldComponent if @layout.is_a?(Class) && @layout <= Blacklight::Facets::FieldComponent && @layout != NexusCcs::FacetFieldComponent
  end
end

Rails.application.config.to_prepare do
  [ Blacklight::Facets::ListComponent, Blacklight::Facets::CheckboxesComponent, BlacklightRangeLimit::RangeFacetComponent ].each do |component|
    component.prepend(NexusFacetLayout) unless component < NexusFacetLayout
  end
end

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
