require "test_helper"

class HelpTopicTest < ActiveSupport::TestCase
  test "the topics are listed in the order of the help pages" do
    assert_equal %w[faq search-tips indigenous copyright access privacy], HelpTopic.all.map(&:key)
  end

  test "search tips and the indigenous topic have their own pages, the others are sections of /help" do
    assert_equal %w[search-tips indigenous], HelpTopic.all.select(&:standalone?).map(&:key)
    assert_nil HelpTopic.find("nope")
    assert_nil HelpTopic.find(nil)
  end
end
