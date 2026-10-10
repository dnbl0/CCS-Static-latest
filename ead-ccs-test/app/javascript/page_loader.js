// Takes the page loading screen away (components/page_loader.css) once the page, its images and its scripts have
// loaded. Turbo visits keep the same <html>, so it only ever shows for the first load of the site.
const ready = () => document.documentElement.classList.add("page-ready")

if (document.readyState === "complete") {
  ready()
} else {
  window.addEventListener("load", ready, { once: true })
}
