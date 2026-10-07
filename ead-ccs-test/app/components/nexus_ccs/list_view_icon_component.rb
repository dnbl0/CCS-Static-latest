# frozen_string_literal: true

module NexusCcs
  # The "list" result view button's icon (list.svg); see ViewIconComponent.
  class ListViewIconComponent < ViewIconComponent
    self.svg = from_file("list.svg")
    def name = "list"
  end
end
