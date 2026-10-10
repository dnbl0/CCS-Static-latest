import { Controller } from "@hotwired/stimulus"

// The saved-records bar. Blacklight's bookmark JavaScript writes the new total into the element marked
// data-role="bookmark-counter" after each Save / Saved click; this watches that number and keeps the wording
// ("1 saved record" / "2 saved records") and the bar's modifier (which shows the plus or the check icon) in step.
export default class extends Controller {
  static targets = ["count", "noun"]
  static values = { one: String, other: String }

  connect() {
    this.observer = new MutationObserver(() => this.update())
    this.observer.observe(this.countTarget, { childList: true, characterData: true, subtree: true })
  }

  disconnect() {
    this.observer?.disconnect()
  }

  update() {
    const count = parseInt(this.countTarget.textContent, 10) || 0
    this.nounTarget.textContent = count === 1 ? this.oneValue : this.otherValue
    this.element.classList.toggle("saved-bar--empty", count === 0)
  }
}
