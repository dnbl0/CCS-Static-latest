// Scroll lock for the modal-like surfaces that are not a <dialog> (the search overlay, the mobile filter drawer). A <dialog>
// opened with showModal() is locked by CSS alone (components/modal.css: html:has(dialog[open])); everything else calls
// lockScroll(owner) when it opens and unlockScroll(owner) when it closes. Owners are kept in a set, so the lock stays until the
// last one has closed, locking twice is harmless and a surface that is torn down (Turbo navigation) can always release its lock.
// html.has-open-modal does the work in CSS: overflow hidden with the scrollbar gutter kept, so nothing shifts and the scroll
// position is exactly what it was when the modal closes.
const owners = new Set()

function sync() {
  document.documentElement.classList.toggle("has-open-modal", owners.size > 0)
}

export function lockScroll(owner) {
  owners.add(owner)
  sync()
}

export function unlockScroll(owner) {
  owners.delete(owner)
  sync()
}

// The Turbo cache snapshots the page as it is: close what is open and release every lock first, so a restored page is never
// left locked (or with a dialog stuck open) behind the visitor.
document.addEventListener("turbo:before-cache", () => {
  document.querySelectorAll("dialog[open]").forEach((dialog) => dialog.close())
  owners.clear()
  sync()
})

// A page restored from the back/forward cache starts from the DOM, not from what the owners hold
window.addEventListener("pageshow", sync)
