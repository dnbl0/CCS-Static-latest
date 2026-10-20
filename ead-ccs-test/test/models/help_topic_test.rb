require "test_helper"

class HelpTopicTest < ActiveSupport::TestCase
  test "the topics are listed in the order of the help page and its menu" do
    assert_equal %w[faq indigenous copyright contact-us], HelpTopic.all.map(&:key)
  end

  test "every topic is a section of /help" do
    view = Struct.new(:dummy) { def help_path(anchor:) = "/help##{anchor}" }.new
    assert_equal "/help#indigenous", HelpTopic.find("indigenous").path(view)
    assert_nil HelpTopic.find("nope")
    assert_nil HelpTopic.find(nil)
  end
end
