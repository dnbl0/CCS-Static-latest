import { Controller } from "@hotwired/stimulus"

// The floating "back to top" button: shown once the page is scrolled past `threshold` pixels, and scrolls
// back to the top (instantly when the visitor prefers reduced motion), then moves focus to the top of the
// page so keyboard and screen reader users start again from there.
export default class extends Controller {
  static values = { threshold: { type: Number, default: 200 } }

  connect() {
    this.update()
  }

  update() {
    const show = window.scrollY > this.thresholdValue
    if (show && this.element.hidden) {
      this.element.hidden = false
      // Let the browser paint the hidden-to-shown change so the fade runs
      requestAnimationFrame(() => this.element.classList.add("is-visible"))
    } else if (!show && !this.element.hidden) {
      this.element.classList.remove("is-visible")
      this.element.hidden = true
    }
  }

  toTop() {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" })
    document.body.setAttribute("tabindex", "-1")
    document.body.focus({ preventScroll: true })
    document.body.addEventListener("blur", () => document.body.removeAttribute("tabindex"), { once: true })
  }
}
