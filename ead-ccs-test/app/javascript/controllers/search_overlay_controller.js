import { Controller } from "@hotwired/stimulus"

// Full-screen search opened from the site header (it dispatches search-overlay:open).
export default class extends Controller {
  static targets = ["input"]

  open() {
    this.element.classList.add("is-open")
    this.inputTarget.focus()
  }

  close() {
    if (!this.element.classList.contains("is-open")) return
    this.element.classList.remove("is-open")
    document.querySelector(".site-header__search-toggle")?.focus()
  }
}
