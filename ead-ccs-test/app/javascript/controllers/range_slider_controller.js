import { Controller } from "@hotwired/stimulus"

// The range filters' slider, in the manner of Airbnb's price range: a histogram of the results, two round
// handles on a rail, year labels along the bottom, and Minimum / Maximum fields. Bars inside the chosen range
// are navy, the rest grey, and they follow the handles as they move. It sits over the range limit plugin's
// Begin / End fields (typing a year still works, and so does the form without JavaScript). Letting go of a
// handle, or leaving a field, applies the range after a short pause, and the new page announces the result.
//
// The handles are native <input type="range"> elements, so keyboard, touch and screen reader support are the
// browser's; this adds Home / End / Page Up / Page Down (ten years), year values in the ARIA attributes, and
// keeps the two handles apart: when they are closer than a handle's width they are nudged either side of their
// true position, with a thin stem marking where each really is.
//
// The bars come from /catalog/range_histogram (RangeHistogram), 24 of them (20 on a narrow phone). Years run
// from before the common era to now but nearly every record is recent, so when the data goes back past the knee
// the track is in two parts: the first quarter covers everything before it, the rest covers the knee to the
// latest year. The same map as RangeHistogram.year in Ruby; keep them together.
const STEPS = 1000
const KNEE = 1000
const OLD_SHARE = 0.25
const APPLY_DELAY = 700
const HANDLE = 28 // px, the handle's visible width
const BARS = 24
const BARS_NARROW = 20
const PAGE_YEARS = 10
const ANNOUNCE_KEY = "ccs-range-announce"

export default class extends Controller {
  static values = { min: Number, max: Number, histogramUrl: String }

  connect() {
    this.begin = this.element.querySelector("input.range_begin")
    this.end = this.element.querySelector("input.range_end")
    this.form = this.element.querySelector("form.range_limit_form")
    if (!this.begin || !this.end || !this.form) return

    this.lo = this.minValue
    this.hi = this.maxValue
    this.bins = []
    this.field = this.begin.name
    this.addClearLink()
    this.render()
    this.fromFields()
    this.drawTicks()
    this.load()
    this.announceApplied()
  }

  disconnect() {
    clearTimeout(this.timer)
    this.observer?.disconnect()
  }

  async load() {
    try {
      const response = await fetch(this.histogramUrl(), { headers: { Accept: "application/json" } })
      if (!response.ok) throw new Error(response.status)
      const data = await response.json()
      if (!data.bins?.length || !(data.max > data.min)) throw new Error("no data")
      const from = this.begin.value === "" ? this.lo : Number(this.begin.value)
      const to = this.end.value === "" ? this.hi : Number(this.end.value)
      this.lo = data.min
      this.hi = data.max
      this.bins = data.bins
      this.begin.min = this.end.min = this.lo
      this.begin.max = this.end.max = this.hi
      this.fromHandle.value = this.position(from)
      this.toHandle.value = this.position(to)
      this.drawBars()
      this.drawTicks()
    } catch (_) {
      this.slider.classList.remove("is-loading")
      this.slider.classList.add("no-bars") // the slider works without the bars
      this.barsElement.replaceChildren()
    }
    this.paint()
  }

  histogramUrl() {
    const url = new URL(this.histogramUrlValue, window.location.origin)
    url.searchParams.set("bins", window.matchMedia("(max-width: 400px)").matches ? BARS_NARROW : BARS)
    return url
  }

  // The plugin's row for the applied range (a ticked "1900 to 1950" with a small x) is hidden, since the slider
  // and the filter pill show it; its remove link becomes a "Clear" link under the fields.
  addClearLink() {
    this.applied = !!this.element.querySelector(".current a.remove")
    const remove = this.element.querySelector(".current a.remove")
    if (!remove) return
    const clear = document.createElement("a")
    clear.className = "range-clear"
    clear.href = remove.href
    clear.rel = "nofollow"
    clear.textContent = "Clear"
    const label = this.element.closest(".facet-limit")?.querySelector(".facet-title__label")?.textContent.trim()
    if (label) clear.setAttribute("aria-label", `Clear ${label} range`)
    this.form.after(clear)
  }

  render() {
    this.element.classList.add("has-slider")
    const slider = document.createElement("div")
    slider.className = "range-slider is-loading"
    slider.innerHTML = `
      <div class="range-slider__bars" aria-hidden="true"></div>
      <div class="range-slider__rail"><div class="range-slider__fill"></div></div>
      <span class="range-slider__stem" aria-hidden="true"></span>
      <span class="range-slider__stem" aria-hidden="true"></span>
      <input type="range" class="range-slider__handle" min="0" max="${STEPS}" step="1" aria-label="Earliest year">
      <input type="range" class="range-slider__handle" min="0" max="${STEPS}" step="1" aria-label="Latest year">
      <div class="range-slider__ticks" aria-hidden="true"></div>`
    this.form.before(slider)
    this.slider = slider
    this.barsElement = slider.querySelector(".range-slider__bars")
    this.fill = slider.querySelector(".range-slider__fill")
    this.ticksElement = slider.querySelector(".range-slider__ticks")
    this.rail = slider.querySelector(".range-slider__rail")
    this.stems = [...slider.querySelectorAll(".range-slider__stem")]
    ;[this.fromHandle, this.toHandle] = slider.querySelectorAll("input")
    this.drawPlaceholderBars()

    this.status = document.createElement("div")
    this.status.className = "visually-hidden"
    this.status.setAttribute("role", "status")
    this.status.setAttribute("aria-live", "polite")
    slider.after(this.status)

    this.fromHandle.addEventListener("input", () => this.fromSlider())
    this.toHandle.addEventListener("input", () => this.fromSlider())
    ;[this.fromHandle, this.toHandle].forEach((handle) => {
      handle.addEventListener("change", () => this.applySoon())
      handle.addEventListener("keydown", (event) => this.keydown(event, handle))
      handle.addEventListener("pointerdown", () => this.activate(handle, true))
      handle.addEventListener("focus", () => this.activate(handle))
      ;["pointerup", "pointercancel", "lostpointercapture"].forEach((name) => handle.addEventListener(name, () => handle.classList.remove("is-dragging")))
    })
    this.begin.addEventListener("input", () => this.fromFields())
    this.end.addEventListener("input", () => this.fromFields())
    this.begin.addEventListener("change", () => this.applySoon())
    this.end.addEventListener("change", () => this.applySoon())
    // the panel is hidden until opened, so the track has no width yet: measure again when it has one
    this.observer = new ResizeObserver(() => this.paint())
    this.observer.observe(this.rail)
  }

  activate(handle, dragging = false) {
    ;[this.fromHandle, this.toHandle].forEach((other) => other.classList.toggle("is-active", other === handle))
    if (dragging) handle.classList.add("is-dragging")
  }

  // grey bars of varying height while the real ones load
  drawPlaceholderBars() {
    const count = window.matchMedia("(max-width: 400px)").matches ? BARS_NARROW : BARS
    const heights = [30, 45, 38, 60, 52, 75, 64, 88, 70, 55, 42, 66, 80, 58, 48, 36, 62, 74, 50, 40, 56, 68, 44, 34]
    this.barsElement.replaceChildren(...Array.from({ length: count }, (_, i) => {
      const bar = document.createElement("span")
      bar.className = "range-slider__bar is-placeholder"
      bar.style.height = `${heights[i % heights.length]}%`
      return bar
    }))
  }

  drawBars() {
    const counts = this.bins.map((bin) => bin.count)
    const filled = counts.filter((count) => count > 0)
    this.slider.classList.remove("is-loading")
    // one or no non-empty bar says nothing about the spread, so no histogram
    if (filled.length < 2) {
      this.slider.classList.add("no-bars")
      this.barsElement.replaceChildren()
      return
    }
    this.slider.classList.remove("no-bars")
    // the tallest bar is the 95th percentile of the non-empty ones, so a single huge bin cannot flatten the rest
    const sorted = [...filled].sort((a, b) => a - b)
    const top = sorted[Math.min(sorted.length - 1, Math.ceil(sorted.length * 0.95) - 1)]
    this.barsElement.replaceChildren(...this.bins.map((bin) => {
      const bar = document.createElement("span")
      bar.className = "range-slider__bar"
      bar.style.height = bin.count ? `max(4px, ${Math.min(Math.sqrt(bin.count / top), 1) * 100}%)` : "0"
      return bar
    }))
  }

  // Three or four year labels along the bottom at round years, spread over the track
  drawTicks() {
    const count = window.matchMedia("(max-width: 400px)").matches ? 3 : 4
    const seen = new Set()
    const ticks = []
    for (let i = 0; i < count; i++) {
      const target = count === 1 ? 0.5 : 0.1 + (0.8 * i) / (count - 1)
      const year = this.round(this.year(target * STEPS))
      if (year < this.lo || year > this.hi || seen.has(year)) continue
      seen.add(year)
      ticks.push(year)
    }
    this.ticksElement.replaceChildren(...ticks.map((year) => {
      const tick = document.createElement("span")
      tick.className = "range-slider__tick"
      tick.style.insetInlineStart = `${this.position(year) / STEPS * 100}%`
      tick.textContent = this.format(year)
      return tick
    }))
  }

  // two significant figures: 1888 -> 1900, 1471 -> 1500, -86400 -> -86000
  round(year) {
    const size = Math.abs(year)
    if (size < 100) return Math.round(year / 10) * 10
    const unit = Math.pow(10, Math.floor(Math.log10(size)) - 1)
    return Math.round(year / unit) * unit
  }

  keydown(event, handle) {
    const isFrom = handle === this.fromHandle
    const step = { PageUp: PAGE_YEARS, PageDown: -PAGE_YEARS }[event.key]
    let target
    if (event.key === "Home") target = isFrom ? this.lo : this.year(Number(this.fromHandle.value))
    else if (event.key === "End") target = isFrom ? this.year(Number(this.toHandle.value)) : this.hi
    else if (step) target = this.year(Number(handle.value)) + step
    else return

    event.preventDefault()
    const position = this.position(target)
    // at least one step in the asked direction, even where a step is more than ten years
    const current = Number(handle.value)
    const direction = step ? Math.sign(step) : 0
    handle.value = direction && Math.sign(position - current) !== direction ? current + direction : position
    handle.dispatchEvent(new Event("input", { bubbles: true }))
    handle.dispatchEvent(new Event("change", { bubbles: true }))
  }

  fromSlider() {
    let from = Number(this.fromHandle.value), to = Number(this.toHandle.value)
    if (from > to) { if (document.activeElement === this.fromHandle) from = to; else to = from }
    this.fromHandle.value = from
    this.toHandle.value = to
    this.begin.value = this.year(from)
    this.end.value = this.year(to)
    this.paint()
  }

  fromFields() {
    const from = this.position(this.begin.value === "" ? this.lo : Number(this.begin.value))
    const to = this.position(this.end.value === "" ? this.hi : Number(this.end.value))
    this.fromHandle.value = Math.min(from, to)
    this.toHandle.value = Math.max(from, to)
    this.paint()
  }

  paint() {
    if (!this.fromHandle) return
    const from = Number(this.fromHandle.value), to = Number(this.toHandle.value)
    const first = this.year(from), last = this.year(to)
    this.fill.style.insetInlineStart = `${from / STEPS * 100}%`
    this.fill.style.insetInlineEnd = `${100 - to / STEPS * 100}%`

    // each handle's limits depend on the other, and its value is a year, not a step of the track
    this.fromHandle.setAttribute("aria-valuemin", this.lo)
    this.fromHandle.setAttribute("aria-valuemax", last)
    this.fromHandle.setAttribute("aria-valuenow", first)
    this.fromHandle.setAttribute("aria-valuetext", this.format(first))
    this.toHandle.setAttribute("aria-valuemin", first)
    this.toHandle.setAttribute("aria-valuemax", this.hi)
    this.toHandle.setAttribute("aria-valuenow", last)
    this.toHandle.setAttribute("aria-valuetext", this.format(last))

    this.barsElement.childNodes.forEach((bar, i) => {
      const bin = this.bins[i]
      if (bin) bar.classList.toggle("is-in-range", bin.to >= first && bin.from <= last)
    })

    // closer than a handle's width: nudge them either side of where they really are, and mark where that is
    const width = this.rail.getBoundingClientRect().width
    const gap = ((to - from) / STEPS) * width
    const nudge = width > 0 && gap < HANDLE ? Math.min((HANDLE - gap) / 2, HANDLE / 2) : 0
    this.fromHandle.style.setProperty("--nudge", `${-nudge}px`)
    this.toHandle.style.setProperty("--nudge", `${nudge}px`)
    this.slider.classList.toggle("is-nudged", nudge > 0)
    this.stems[0].style.insetInlineStart = `${from / STEPS * 100}%`
    this.stems[1].style.insetInlineStart = `${to / STEPS * 100}%`
  }

  applySoon() {
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      try { sessionStorage.setItem(ANNOUNCE_KEY, this.field) } catch (_) { /* announcing is a nicety */ }
      this.form.requestSubmit()
    }, APPLY_DELAY)
  }

  // After the page has reloaded with the range applied, say what it shows (a live region in the old page would
  // have gone with it)
  announceApplied() {
    try {
      if (sessionStorage.getItem(ANNOUNCE_KEY) !== this.field) return
      sessionStorage.removeItem(ANNOUNCE_KEY)
    } catch (_) { return }
    if (!this.applied) return
    const label = document.querySelector(".constraints-label")?.textContent.match(/[\d,]+/)?.[0]
    if (!label) return
    const from = this.begin.value === "" ? this.lo : Number(this.begin.value)
    const to = this.end.value === "" ? this.hi : Number(this.end.value)
    setTimeout(() => { this.status.textContent = `Showing ${label} results from ${this.format(from)} to ${this.format(to)}` }, 400)
  }

  get twoPart() { return this.lo < KNEE && this.hi > KNEE }

  // handle position (0..STEPS) to year, and back
  year(position) {
    const t = position / STEPS
    if (!this.twoPart) return Math.round(this.lo + t * (this.hi - this.lo))
    return t < OLD_SHARE
      ? Math.round(this.lo + (t / OLD_SHARE) * (KNEE - this.lo))
      : Math.round(KNEE + ((t - OLD_SHARE) / (1 - OLD_SHARE)) * (this.hi - KNEE))
  }

  position(year) {
    const y = Math.min(Math.max(year, this.lo), this.hi)
    if (!this.twoPart) return Math.round((y - this.lo) / (this.hi - this.lo) * STEPS)
    return Math.round((y < KNEE
      ? (y - this.lo) / (KNEE - this.lo) * OLD_SHARE
      : OLD_SHARE + (y - KNEE) / (this.hi - KNEE) * (1 - OLD_SHARE)) * STEPS)
  }

  format(year) {
    return year < 0 ? `${Math.abs(year)} BCE` : String(year)
  }
}
