// Focus after a Turbo page change. Turbo swaps the page in without a browser load, so focus is left on <body>: a screen
// reader says nothing about the new page and the next Tab starts again from the top. As the Intopia skill asks for SPA
// navigation (WCAG 2.4.3), focus moves to the new page's heading (its <h1> in <main>, else <main> itself).
// It is left alone on the first load (the browser has done a real page load), on Back and Forward (Turbo restores the page as
// it was), when the address has a #section (the browser and jump_nav_controller.js take the visitor there), and when something
// on the new page has already taken focus (an [autofocus] field, the Acknowledgement of Country dialog).
let action = null

document.addEventListener("turbo:visit", (event) => { action = event.detail.action })

document.addEventListener("turbo:load", () => {
  const visited = action
  action = null
  if (!visited || visited === "restore" || location.hash) return
  if (document.activeElement && document.activeElement !== document.body) return

  const main = document.querySelector("main")
  const target = main?.querySelector("h1") || main
  if (!target) return
  if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1")
  target.focus({ preventScroll: true })
})
