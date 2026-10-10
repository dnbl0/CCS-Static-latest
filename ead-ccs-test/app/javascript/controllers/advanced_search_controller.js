import { Controller } from "@hotwired/stimulus"

// The advanced search form (NexusCcs::AdvancedSearchFormComponent): add and delete search rows (clause[i]
// [field|op|query], up to 8), choose which filters to show, switch a filter between "Includes any" (f_inclusive)
// and "Includes all" (f_all), and check the form before it is sent. Everything it submits is Blacklight's own
// parameters; without JavaScript the first row and every filter are shown and the form submits as it is.
export default class extends Controller {
  static targets = ["rows", "rowTemplate", "addRow", "rowLimit", "row", "legend", "delete", "deleteLabel", "query",
                    "filterMenu", "filterSelect", "filter", "mode", "value", "removeFilter", "range", "from", "to",
                    "errors", "errorList"]
  static values = { maxRows: Number, emptyMessage: String, rangeMessage: String, rowLabel: String }

  connect() {
    this.element.classList.add("is-enhanced")
    this.filterMenuTarget?.removeAttribute("hidden")
    this.filterTargets.forEach((filter) => this.showFilter(filter, filter.dataset.advancedSearchActive === "true"))
    this.renumber()
    this.onFormData = (event) => this.dropEmpty(event.formData)
    this.element.addEventListener("formdata", this.onFormData)
  }

  disconnect() {
    this.element.removeEventListener("formdata", this.onFormData)
  }

  // Rows ------------------------------------------------------------------------------------------------------

  addRow() {
    if (this.rowTargets.length >= this.maxRowsValue) return
    const html = this.rowTemplateTarget.innerHTML.replaceAll("__INDEX__", this.rowTargets.length).replaceAll("__NUMBER__", this.rowTargets.length + 1)
    this.rowsTarget.insertAdjacentHTML("beforeend", html)
    this.renumber()
    const row = this.rowTargets.at(-1)
    requestAnimationFrame(() => this.focusSelect(row))
  }

  deleteRow(event) {
    if (this.rowTargets.length <= 1) return
    const row = event.target.closest("[data-advanced-search-target~=row]")
    const next = this.rowTargets[this.rowTargets.indexOf(row) + 1] || this.rowTargets[this.rowTargets.indexOf(row) - 1]
    row.remove()
    this.renumber()
    if (next) this.focusSelect(next)
  }

  // The selects are shown as the site's dropdowns (controllers/select_dropdown_controller.js): focus its button
  focusSelect(container) {
    (container.querySelector(".ccs-select > .dropdown-toggle") || container.querySelector("select"))?.focus()
  }

  // Row i is clause[i]: names, ids and labels follow the order on the page, and row 1 cannot be deleted
  renumber() {
    this.rowTargets.forEach((row, i) => {
      row.querySelector("legend").textContent = this.rowLabelValue.replace("%{number}", i + 1)
      row.querySelectorAll("[name^='clause[']").forEach((control) => {
        const part = control.name.match(/\[(field|op|query)\]$/)[1]
        control.name = `clause[${i}][${part}]`
        control.id = `adv-${part}-${i}`
      })
      row.querySelectorAll("label[for]").forEach((label) => {
        const part = label.getAttribute("for").match(/adv-(field|op|query)-/)?.[1]
        if (part) label.setAttribute("for", `adv-${part}-${i}`)
      })
      const del = row.querySelector("[data-advanced-search-target~=delete]")
      if (del) del.hidden = this.rowTargets.length === 1
      const hidden = row.querySelector("[data-advanced-search-target~=deleteLabel]")
      if (hidden) hidden.textContent = ` ${i + 1}`
    })
    const full = this.rowTargets.length >= this.maxRowsValue
    this.addRowTarget.disabled = full
    this.rowLimitTarget.hidden = !full
  }

  // Filters -----------------------------------------------------------------------------------------------------

  addFilter() {
    const key = this.filterSelectTarget.value
    if (!key) return
    const filter = this.filterTargets.find((el) => el.dataset.filterKey === key)
    this.showFilter(filter, true)
    this.filterSelectTarget.value = ""
    filter.querySelector("input[type=checkbox]")?.focus()
  }

  removeFilter(event) {
    const filter = event.target.closest("[data-advanced-search-target~=filter]")
    filter.querySelectorAll("input[type=checkbox]").forEach((box) => { box.checked = false })
    this.showFilter(filter, false)
    this.focusSelect(this.filterSelectTarget.closest(".advanced-form__field"))
  }

  showFilter(filter, visible) {
    filter.hidden = !visible
    filter.dataset.advancedSearchActive = visible
    filter.querySelector("[data-advanced-search-target~=removeFilter]").hidden = !visible
    const option = this.filterSelectTarget?.querySelector(`option[value="${filter.dataset.filterKey}"]`)
    if (option) option.hidden = visible
  }

  // Long lists (object type has over a thousand values): the box above them narrows what is listed
  findValue(event) {
    const text = event.target.value.trim().toLowerCase()
    event.target.closest("fieldset").querySelectorAll(".advanced-filter__values li").forEach((item) => {
      item.hidden = text !== "" && !item.textContent.toLowerCase().includes(text)
    })
  }

  // "Includes any" ticks are f_inclusive[facet][], "Includes all" ticks are f_all[facet][]
  changeMode(event) {
    const filter = event.target.closest("[data-advanced-search-target~=filter]")
    const name = event.target.value === "all" ? "f_all" : "f_inclusive"
    filter.querySelectorAll("input[type=checkbox]").forEach((box) => { box.name = `${name}[${box.dataset.facet}][]` })
  }

  // Checking ---------------------------------------------------------------------------------------------------

  submit(event) {
    const errors = this.errors()
    if (errors.length === 0) { this.errorsTarget.hidden = true; return }

    event.preventDefault()
    this.errorListTarget.replaceChildren(...errors.map(({ message, target }) => {
      const item = document.createElement("li")
      const link = document.createElement("a")
      link.href = `#${target.id}`
      link.textContent = message
      link.addEventListener("click", (e) => { e.preventDefault(); target.focus() })
      item.append(link)
      return item
    }))
    this.errorsTarget.hidden = false
    // Focus goes to the summary, so a keyboard user lands on the first link instead of having to find it
    this.errorsTarget.setAttribute("tabindex", "-1")
    this.errorsTarget.focus()
  }

  errors() {
    const problems = []
    const hasTerms = this.queryTargets.some((input) => input.value.trim() !== "")
    const hasFilter = this.valueTargets.some((box) => box.checked && !box.closest("fieldset").hidden)
    const hasRange = this.fromTargets.concat(this.toTargets).some((input) => input.value !== "")
    if (!hasTerms && !hasFilter && !hasRange) problems.push({ message: this.emptyMessageValue, target: this.queryTargets[0] })

    this.rangeTargets.forEach((range) => {
      const from = range.querySelector("[data-advanced-search-target~=from]")
      const to = range.querySelector("[data-advanced-search-target~=to]")
      if (from.value !== "" && to.value !== "" && Number(from.value) > Number(to.value)) {
        problems.push({ message: this.rangeMessageValue.replace("%{field}", range.dataset.label), target: from })
      }
    })
    return problems
  }

  // Empty rows and empty year boxes are not sent, so the results page URL holds only what was asked for
  dropEmpty(formData) {
    this.rowTargets.forEach((row) => {
      const query = row.querySelector("[name$='[query]']")
      if (query && query.value.trim() === "") {
        const base = query.name.replace("[query]", "")
        ;["[field]", "[op]", "[query]"].forEach((part) => formData.delete(base + part))
      }
    })
    this.fromTargets.concat(this.toTargets).forEach((input) => { if (input.value === "") formData.delete(input.name) })
  }
}
