import { Controller } from "@hotwired/stimulus"

// The search rows of the Advanced search form: "Add a field" copies the template row, each row has a Remove button. A row's
// parameters are clause[N][...], and any N works (Blacklight reads the rows as a hash), so rows are never renumbered. The form
// always keeps at least one row: removing the last one empties it instead. Without JavaScript the rows the server drew are
// still a working form (the buttons stay hidden).
export default class extends Controller {
  static targets = ["list", "template", "row", "controls", "remove", "status"]
  static values = { nextIndex: Number }

  connect() {
    this.controlsTarget.hidden = false
    this.syncRemoveButtons()
  }

  add() {
    const index = this.nextIndexValue++
    const html = this.templateTarget.innerHTML.replaceAll("__INDEX__", String(index))
    this.listTarget.insertAdjacentHTML("beforeend", html)
    const row = this.rowTargets[this.rowTargets.length - 1]
    this.syncRemoveButtons()
    row.querySelector("input[type=text]").focus()
    this.announce(`Field ${this.rowTargets.length} added`)
  }

  remove(event) {
    const row = event.currentTarget.closest("[data-advanced-rows-target='row']")
    if (this.rowTargets.length === 1) {
      row.querySelector("input[type=text]").value = ""
      row.querySelector("input[type=text]").focus()
      return
    }
    const rows = this.rowTargets
    const neighbour = rows[rows.indexOf(row) + 1] || rows[rows.indexOf(row) - 1]
    row.remove()
    this.syncRemoveButtons()
    neighbour.querySelector("input[type=text]").focus()
    this.announce(`Field removed, ${this.rowTargets.length} left`)
  }

  syncRemoveButtons() {
    this.removeTargets.forEach((button) => { button.hidden = false })
  }

  announce(message) {
    this.statusTarget.textContent = message
  }
}
