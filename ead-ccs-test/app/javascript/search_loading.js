// A skeleton in place of the results and the filter values while the next page of a search is loading
// (a filter added or removed, a new sort, page or view). Turbo keeps the old page on screen until the new
// one arrives, so this marks <html> with .is-searching and the stylesheet (components/skeleton.css) draws
// the skeleton over what is there. Shown only if the wait passes 150ms, so a fast reply does not flash.
const DELAY = 150
let timer = null

const searchPath = (url) => /^\/(catalog)?\/?$/.test(new URL(url, location.href).pathname)

const start = (url) => {
  stop()
  if (!searchPath(url)) return
  timer = setTimeout(() => {
    document.documentElement.classList.add("is-searching")
    document.getElementById("content")?.setAttribute("aria-busy", "true")
  }, DELAY)
}

const stop = () => {
  clearTimeout(timer)
  document.documentElement.classList.remove("is-searching")
  document.getElementById("content")?.removeAttribute("aria-busy")
}

document.addEventListener("turbo:visit", (event) => start(event.detail.url))
document.addEventListener("turbo:submit-start", (event) => {
  const form = event.target
  if (form.matches("form[action]") && (form.method || "get").toLowerCase() === "get") start(form.action)
})
document.addEventListener("turbo:load", stop)
document.addEventListener("turbo:fetch-request-error", stop)
document.addEventListener("pageshow", stop)
