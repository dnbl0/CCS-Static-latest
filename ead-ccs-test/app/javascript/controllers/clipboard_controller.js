import { Controller } from "@hotwired/stimulus"

// Copies the text of the source (an input's value, or an element's data-copy / text) and says so, for sighted
// visitors (the button's label turns to "Copied") and screen readers (the status line).
export default class extends Controller {
  static targets = ["source", "button", "status", "label"]

  async copy() {
    const source = this.sourceTarget
    const text = source.value ?? source.dataset.copy ?? source.textContent.trim()
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      if (source.select) {
        source.select()
        document.execCommand("copy")
      }
    }
    this.announce("Copied")
  }

  announce(message) {
    // a button with an icon keeps it: only its label target changes
    const label = this.hasLabelTarget ? this.labelTarget : this.buttonTarget
    const original = label.textContent
    this.statusTarget.textContent = message
    label.textContent = "Copied"
    setTimeout(() => {
      label.textContent = original
      this.statusTarget.textContent = ""
    }, 2000)
  }
}
