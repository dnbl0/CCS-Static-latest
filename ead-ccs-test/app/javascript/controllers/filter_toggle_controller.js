import { Controller } from "@hotwired/stimulus"

// The toolbar's Filters button: asks the filter drawer (in the sidebar) to open, remembering the button
// so focus can return to it.
export default class extends Controller {
  open(event) {
    this.dispatch("open", { prefix: "filter-drawer", detail: { opener: event.currentTarget } })
  }
}
