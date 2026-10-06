require "test_helper"

class BlacklightHelperTest < ActiveSupport::TestCase
  Page = Struct.new(:controller_name, :action_name, :searching, :config) do
    include BlacklightHelper

    def has_search_parameters? = searching
    def blacklight_config = config
  end

  def container(controller: "catalog", action: "index", searching: true, full_width: false)
    Page.new(controller, action, searching, Struct.new(:full_width_layout).new(full_width)).container_classes
  end

  test "search results use the full width" do
    assert_equal "container-fluid", container
  end

  test "other pages keep the fixed container" do
    assert_equal "container", container(searching: false)
    assert_equal "container", container(action: "show")
    assert_equal "container", container(controller: "bookmarks")
  end

  test "the gem's full_width_layout setting is still honoured" do
    assert_equal "container-fluid", container(action: "show", full_width: true)
  end
end
