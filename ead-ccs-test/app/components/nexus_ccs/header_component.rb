# frozen_string_literal: true

module NexusCcs
  # University of Melbourne Gen 3 header. Replaces Blacklight's top navbar
  # (config.header_component) and keeps Blacklight's search bar in the band beneath it.
  class HeaderComponent < Blacklight::HeaderComponent
    delegate :search_action_url, to: :helpers

    # The gem's top navbar is replaced by the site header (so it is never rendered),
    # and its light search band by the dark search banner.
    def before_render
      with_search_bar(component: NexusCcs::SearchBannerComponent) unless search_bar
    end

    # [label, href] pairs for the breadcrumb bar; the last item is the current page.
    def breadcrumbs
      case helpers.controller_name
      when "catalog"
        case helpers.action_name
        when "index" then helpers.has_search_parameters? ? [ [ "Search results", nil ] ] : []
        when "show" then [ [ "Search results", search_action_url ], [ record_title, nil ] ]
        when "advanced_search" then [ [ "Advanced search", nil ] ]
        else []
        end
      else []
      end
    end

    def show_search_banner? = helpers.action_name != "show"

    def record_title
      document = helpers.instance_variable_get(:@document)
      document ? helpers.document_presenter(document).heading : "Record"
    end

    def audience_links = SiteNavigation::AUDIENCE

    def collection_links
      SiteNavigation::COLLECTIONS.map do |label, facet_value|
        SiteNavigation::Link.new(label, search_action_url(f: { collection_ssim: [ facet_value ] }))
      end
    end

    def help_links
      SiteNavigation::HELP.map { |link| SiteNavigation::Link.new(link.label, SiteNavigation.static_url(link.href)) }
    end

    def help_home = SiteNavigation::Link.new(SiteNavigation::HELP_HOME.label, SiteNavigation.static_url(SiteNavigation::HELP_HOME.href))

    def contact = SiteNavigation::Link.new(SiteNavigation::CONTACT.label, SiteNavigation.static_url(SiteNavigation::CONTACT.href))

    def static_pages? = SiteNavigation.static_site_url.present?

    def all_records_path = search_action_url

    # "<" icon and label of the row that leaves a drilled-in menu section on mobile.
    def back_label
      safe_join([ tag.svg(tag.polyline(points: "15 5 8 12 15 19"), viewBox: "0 0 24 24", aria: { hidden: true }), "Back" ])
    end
  end
end
