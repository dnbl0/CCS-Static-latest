# Blacklight's facet list, checkbox and range components each hard-code Blacklight::Facets::FieldComponent as
# the section around them. Swap in NexusCcs::FacetFieldComponent (the same section plus the selected-value
# badge and summary) without copying those components.
module NexusFacetLayout
  def initialize(*, **kwargs)
    super
    @layout = NexusCcs::FacetFieldComponent if @layout.in?([ Blacklight::Facets::FieldComponent, (Blacklight::Facets::FacetFieldComponent if defined?(Blacklight::Facets::FacetFieldComponent)) ].compact)
  end
end

Rails.application.config.to_prepare do
  [ Blacklight::Facets::ListComponent, Blacklight::Facets::CheckboxesComponent, BlacklightRangeLimit::RangeFacetComponent ].each do |component|
    component.prepend(NexusFacetLayout) unless component < NexusFacetLayout
  end
end
