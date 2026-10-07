import { Controller } from "@hotwired/stimulus"

// The banner's "Advanced search" link opens Blacklight's advanced form in its native modal (a <dialog>), shown as
// a right-hand panel (components/advanced_flyout.css). Blacklight's modal.js does the loading: it handles any
// a[data-blacklight-modal~=trigger], so this marks the link (without JavaScript it stays a link to the page),
// puts .advanced-flyout on the dialog while it is open (the panel styling), and returns the focus to the link
// when the panel closes (a <dialog> already traps focus and closes on Esc).
//
// modal.js shows the children of the response's [data-blacklight-modal=container], or the whole page when there
// is none. When the advanced search page has no container (it renders its page chrome), the form is lifted out
// of it and wrapped in the modal's header / body / footer here, so the flyout never shows the site twice.
export default class extends Controller {
  connect() {
    this.link = this.element.querySelector("a.advanced_search")
    if (!this.link) return

    this.link.dataset.blacklightModal = "trigger"
    this.link.setAttribute("aria-haspopup", "dialog")
    this.dialog = document.getElementById("blacklight-modal")

    // Blacklight's click handler is on the document and runs after this one: mark the dialog as the flyout
    // before it fills, and back to a plain modal (the facet lists use it too) once it has closed
    this.onClick = () => this.dialog?.classList.add("advanced-flyout")
    this.onLoaded = () => this.ensurePanel()
    this.onHide = () => {
      this.link?.focus()
      this.dialog?.addEventListener("close", () => this.dialog.classList.remove("advanced-flyout"), { once: true })
    }
    this.link.addEventListener("click", this.onClick)
    this.dialog?.addEventListener("loaded.blacklight.blacklight-modal", this.onLoaded)
    this.dialog?.addEventListener("hide.blacklight.blacklight-modal", this.onHide)
  }

  disconnect() {
    this.link?.removeEventListener("click", this.onClick)
    this.dialog?.removeEventListener("loaded.blacklight.blacklight-modal", this.onLoaded)
    this.dialog?.removeEventListener("hide.blacklight.blacklight-modal", this.onHide)
  }

  ensurePanel() {
    const content = this.dialog.querySelector(".modal-content")
    if (!content || content.querySelector(".modal-header")) return // already a modal's markup

    const form = content.querySelector("form.advanced")
    if (!form) return

    form.id ||= "advanced-flyout-form"
    const title = document.createElement("h2")
    title.className = "modal-title"
    title.textContent = "Advanced search"
    const close = document.createElement("button")
    close.type = "button"
    close.className = "blacklight-modal-close btn-close"
    close.setAttribute("data-bl-dismiss", "modal")
    close.setAttribute("aria-label", "Close")
    const header = document.createElement("div")
    header.className = "modal-header"
    header.append(title, close)

    const body = document.createElement("div")
    body.className = "modal-body"
    body.append(form)

    // The form's own buttons move to the pinned footer, still submitting the form
    const footer = document.createElement("div")
    footer.className = "modal-footer"
    form.querySelectorAll("[type=submit]").forEach((button) => {
      button.setAttribute("form", form.id)
      footer.append(button)
    })

    content.replaceChildren(header, body, ...(footer.children.length ? [footer] : []))
  }
}
