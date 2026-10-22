import { Controller } from "@hotwired/stimulus"
import { lockScroll, unlockScroll, inertOutside, releaseInert } from "modal_lock"

// Full-screen search opened from the site header (it dispatches search-overlay:open). It is a modal: while it is open the
// page behind does not scroll and is inert, so Tab and a screen reader stay inside it (modal_lock.js). Escape and Close shut
// it and return focus to the header's search button; Turbo replacing the page releases both locks.
export default class extends Controller {
  static targets = ["input"]

  disconnect() {
    unlockScroll(this)
    releaseInert(this)
  }

  open() {
    this.element.classList.add("is-open")
    lockScroll(this)
    inertOutside(this, this.element)
    this.inputTarget.focus()
  }

  close() {
    if (!this.element.classList.contains("is-open")) return
    this.element.classList.remove("is-open")
    unlockScroll(this)
    releaseInert(this)
    document.querySelector(".site-header__search-toggle")?.focus({ preventScroll: true })
  }
}
