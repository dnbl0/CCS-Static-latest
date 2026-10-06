import { Controller } from "@hotwired/stimulus"

// Opens a <dialog> as a modal and closes it on clicking Continue button or backdrop
export default class extends Controller {
  static targets = ["dialog"]
  static values = { openOnConnect: Boolean }

  connect() {
    if (this.openOnConnectValue) this.open()
  }

  open() {
    if (!this.dialogTarget.open) this.dialogTarget.showModal()
  }

  close() {
    this.dialogTarget.close()
  }

  // A catch so that when <dialog> receives a click on the element itself, not anything inside it
  closeOnBackdrop(event) {
    if (event.target === this.dialogTarget) this.close()
  }
}