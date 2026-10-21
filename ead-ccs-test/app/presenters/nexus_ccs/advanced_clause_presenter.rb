# frozen_string_literal: true

module NexusCcs
  # The removable pill of an Advanced search row, saying how its words match (after SearchWorks' AdvancedClausePresenter):
  # "Title: any of dental chair", "Subject: not skull". A row that contains all of its words reads as it always did.
  class AdvancedClausePresenter < Blacklight::ClausePresenter
    def label
      query = user_parameters[:query].to_s

      case user_parameters[:type].to_s
      when "any" then "any of #{query}"
      when "none" then "not #{query}"
      else query
      end
    end
  end
end
