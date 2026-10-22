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

// Everything on the page except `keep` becomes inert while a surface that covers the page is open (the search overlay, the
// phone menu drawer), so Tab and a screen reader cannot reach the page behind it, as a <dialog> opened with showModal() does.
// Each sibling of `keep` and of every ancestor up to <body> is made inert; elements that were inert already (the sticky search
// strip manages its own) are left alone and are not released later.
const inerted = new Map()

export function inertOutside(owner, keep) {
  releaseInert(owner)
  const made = []
  for (let node = keep; node && node !== document.body; node = node.parentElement) {
    for (const sibling of node.parentElement?.children || []) {
      if (sibling === node || sibling.inert) continue
      sibling.inert = true
      made.push(sibling)
    }
  }
  inerted.set(owner, made)
}

export function releaseInert(owner) {
  inerted.get(owner)?.forEach((element) => { element.inert = false })
  inerted.delete(owner)
}

// The Turbo cache snapshots the page as it is: close what is open and release every lock first, so a restored page is never
// left locked (or with a dialog stuck open, or the page inert) behind the visitor.
document.addEventListener("turbo:before-cache", () => {
  document.querySelectorAll("dialog[open]").forEach((dialog) => dialog.close())
  owners.clear()
  sync()
  inerted.forEach((_, owner) => releaseInert(owner))
})

// A page restored from the back/forward cache starts from the DOM, not from what the owners hold
window.addEventListener("pageshow", sync)
