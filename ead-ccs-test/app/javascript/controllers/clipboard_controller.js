import { Controller } from "@hotwired/stimulus"

// Copies the text of the source field and says so, for sighted visitors (the button label) and
// screen readers (the status line).
export default class extends Controller {
  static targets = ["source", "button", "status"]

  async copy() {
    const text = this.sourceTarget.value
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      this.sourceTarget.select()
      document.execCommand("copy")
    }
    this.announce("Link copied")
  }

  announce(message) {
    const label = this.buttonTarget.textContent
    this.statusTarget.textContent = message
    this.buttonTarget.textContent = "Copied"
    setTimeout(() => {
      this.buttonTarget.textContent = label
      this.statusTarget.textContent = ""
    }, 2000)
  }
}
