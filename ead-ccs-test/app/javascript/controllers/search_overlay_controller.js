import { Controller } from "@hotwired/stimulus"
import { lockScroll, unlockScroll } from "modal_lock"

// Full-screen search opened from the site header (it dispatches search-overlay:open). While it is open the page behind does
// not scroll (modal_lock.js); Turbo replacing the page releases the lock.
export default class extends Controller {
  static targets = ["input"]

  disconnect() {
    unlockScroll(this)
  }

  open() {
    this.element.classList.add("is-open")
    lockScroll(this)
    this.inputTarget.focus()
  }

  close() {
    if (!this.element.classList.contains("is-open")) return
    this.element.classList.remove("is-open")
    unlockScroll(this)
    document.querySelector(".site-header__search-toggle")?.focus({ preventScroll: true })
  }
}
