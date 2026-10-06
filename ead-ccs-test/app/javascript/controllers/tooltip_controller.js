import { Controller } from "@hotwired/stimulus"
import * as bootstrap from "bootstrap"

// Bootstrap tooltips for the elements inside it that have a title (the result view buttons). Bootstrap moves
// the title to its own tooltip, so the slow native one does not appear as well; the buttons keep their
// accessible names from their visually hidden captions, and the tooltip shows on keyboard focus too.
export default class extends Controller {
  static values = { placement: { type: String, default: "bottom" } }

  connect() {
    this.tooltips = [...this.element.querySelectorAll("[title]")].map(
      (element) => new bootstrap.Tooltip(element, { placement: this.placementValue, trigger: "hover focus" })
    )
  }

  disconnect() {
    this.tooltips.forEach((tooltip) => tooltip.dispose())
  }
}
