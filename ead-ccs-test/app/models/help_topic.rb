# frozen_string_literal: true

# A topic of the help section. Search tips and Indigenous cultural data each have a page of their own (/help/search-tips,
# /help/indigenous-data); the other topics are sections of the one /help page (/help#<key>), written in
# app/views/pages/help/_sections.html.erb.
class HelpTopic < Data.define(:key, :title, :blurb)
  ALL = [
    new("faq", "Frequently Asked Questions", "Answers to common questions about searching and using items from the university's cultural collections."),
    new("search-tips", "Search Tips", "These tips help you to easily find information, images, audio, and video held in the university's cultural collections."),
    new("indigenous", "Indigenous Cultural Data and Access", "Information on respectful discovery of Aboriginal and Torres Strait Islander cultural heritage and knowledge."),
    new("copyright", "Copyright and Terms of Use", "How a collection item can be used varies depending on the conditions of its copyright license, intellectual property or cultural advice."),
    new("access", "Access and Information", "How to submit a request to access an item or for further information from the Collections team."),
    new("privacy", "Privacy", "How the University respects the privacy of protecting and managing personal information.")
  ].freeze

  STANDALONE = %w[search-tips indigenous].freeze

  def self.all = ALL

  def self.find(key) = ALL.find { |topic| topic.key == key }

  def standalone? = STANDALONE.include?(key)

  def path(view)
    case key
    when "search-tips" then view.search_tips_path
    when "indigenous" then view.indigenous_data_path
    else view.help_path(anchor: key)
    end
  end
end
