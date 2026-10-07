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

    # A record's page has its title band instead of the search banner, and the advanced search page its own
    # banner (catalog/advanced_search.html.erb): the form is the search.
    def show_search_banner? = helpers.controller_name == "catalog" && !%w[show advanced_search].include?(helpers.action_name)

    def show_record_banner? = helpers.controller_name == "catalog" && helpers.action_name == "show"

    def record_title
      document = helpers.instance_variable_get(:@document)
      document ? helpers.document_presenter(document).heading : "Record"
    end

    def audience_links = SiteNavigation::AUDIENCE

    def collection_links
      SiteNavigation::COLLECTIONS.map { |label, _facet_value, slug| SiteNavigation::Link.new(label, helpers.collection_path(slug)) }
    end

    def help_links
      PagesController::HELP_TOPICS.map { |topic| SiteNavigation::Link.new(topic.title, topic.path(helpers)) }
    end

    def help_home = SiteNavigation::Link.new(SiteNavigation::HELP_HOME_LABEL, helpers.help_path)

    def contact = SiteNavigation::Link.new(SiteNavigation::CONTACT_LABEL, helpers.contact_path)

    def collections_home = helpers.collections_path

    def all_records_path = helpers.search_catalog_path

    # "<" icon and label of the row that leaves a drilled-in menu section on mobile.
    def back_label
      safe_join([ tag.svg(tag.polyline(points: "15 5 8 12 15 19"), viewBox: "0 0 24 24", aria: { hidden: true }), "Back" ])
    end
  end
end
