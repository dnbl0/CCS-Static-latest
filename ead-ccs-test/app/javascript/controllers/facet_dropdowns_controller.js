import { Controller } from "@hotwired/stimulus"
import * as bootstrap from "bootstrap"

// The filters are dropdown boxes whose panels open over the filters below (as on the static search page), so
// one is open at a time: opening another, pressing Escape or clicking outside closes it.
export default class extends Controller {
  connect() {
    this.onShow = (event) => this.closeOthers(event.target)
    this.onClick = (event) => { if (!event.target.closest(".facet-limit")) this.closeAll() }
    this.onKey = (event) => { if (event.key === "Escape") this.closeAll() }
    this.element.addEventListener("show.bs.collapse", this.onShow)
    document.addEventListener("click", this.onClick)
    this.element.addEventListener("keydown", this.onKey)
  }

  disconnect() {
    this.element.removeEventListener("show.bs.collapse", this.onShow)
    document.removeEventListener("click", this.onClick)
    this.element.removeEventListener("keydown", this.onKey)
  }

  open() {
    return this.element.querySelectorAll(".facet-content.show")
  }

  closeOthers(except) {
    this.open().forEach((panel) => { if (panel !== except) bootstrap.Collapse.getOrCreateInstance(panel, { toggle: false }).hide() })
  }

  closeAll() {
    this.closeOthers(null)
  }
}
