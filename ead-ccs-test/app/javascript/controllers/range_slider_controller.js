import { Controller } from "@hotwired/stimulus"

// The range filters' slider, in the manner of Airbnb's price range: a histogram of the results, two round
// handles on a rail, and Minimum / Maximum fields. Bars inside the chosen range are navy, the rest grey, and
// they follow the handles as they move. It sits over the range limit plugin's Begin / End fields (typing a
// year still works, and so does the form without JavaScript). Letting go of a handle, or leaving a field,
// applies the range after a short pause.
//
// The bars come from /catalog/range_histogram (RangeHistogram). Years run from before the common era to now but
// nearly every record is recent, so when the data goes back past the knee the track is in two parts: the first
// quarter covers everything before it, the rest covers the knee to the latest year. The same map as
// RangeHistogram.year in Ruby; keep them together.
const STEPS = 1000
const KNEE = 1000
const OLD_SHARE = 0.25
const APPLY_DELAY = 700

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
    this.addClearLink()
    this.render()
    this.fromFields()
    this.load()
  }

  disconnect() {
    clearTimeout(this.timer)
  }

  async load() {
    try {
      const response = await fetch(this.histogramUrlValue, { headers: { Accept: "application/json" } })
      if (!response.ok) return
      const data = await response.json()
      if (!data.bins?.length || !(data.max > data.min)) return
      const from = this.begin.value === "" ? this.lo : Number(this.begin.value)
      const to = this.end.value === "" ? this.hi : Number(this.end.value)
      this.lo = data.min
      this.hi = data.max
      this.bins = data.bins
      this.drawBars()
      this.begin.min = this.end.min = this.lo
      this.begin.max = this.end.max = this.hi
      this.fromHandle.value = this.position(from)
      this.toHandle.value = this.position(to)
      this.paint()
    } catch (_) { /* the slider works without the bars */ }
  }

  // The plugin's row for the applied range (a ticked "1900 to 1950" with a small x) is hidden, since the slider
  // and the filter pill show it; its remove link becomes a "Clear" link under the fields.
  addClearLink() {
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
    slider.className = "range-slider"
    slider.innerHTML = `
      <div class="range-slider__bars" aria-hidden="true"></div>
      <div class="range-slider__rail"><div class="range-slider__fill"></div></div>
      <input type="range" class="range-slider__handle" min="0" max="${STEPS}" step="1" aria-label="Earliest year">
      <input type="range" class="range-slider__handle" min="0" max="${STEPS}" step="1" aria-label="Latest year">`
    this.form.before(slider)
    this.barsElement = slider.querySelector(".range-slider__bars")
    this.fill = slider.querySelector(".range-slider__fill")
    ;[this.fromHandle, this.toHandle] = slider.querySelectorAll("input")

    this.fromHandle.addEventListener("input", () => this.fromSlider())
    this.toHandle.addEventListener("input", () => this.fromSlider())
    ;[this.fromHandle, this.toHandle].forEach((handle) => {
      handle.addEventListener("change", () => this.applySoon())
      handle.addEventListener("pointerdown", () => handle.classList.add("is-dragging"))
      handle.addEventListener("pointerup", () => handle.classList.remove("is-dragging"))
    })
    this.begin.addEventListener("input", () => this.fromFields())
    this.end.addEventListener("input", () => this.fromFields())
    this.begin.addEventListener("change", () => this.applySoon())
    this.end.addEventListener("change", () => this.applySoon())
  }

  drawBars() {
    const top = Math.max(...this.bins.map((bin) => bin.count), 1)
    this.barsElement.replaceChildren(...this.bins.map((bin) => {
      const bar = document.createElement("span")
      bar.className = "range-slider__bar"
      bar.style.height = bin.count ? `${Math.max(Math.sqrt(bin.count / top) * 100, 3)}%` : "0"
      return bar
    }))
    this.paint()
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
    const from = Number(this.fromHandle.value), to = Number(this.toHandle.value)
    this.fill.style.insetInlineStart = `${from / STEPS * 100}%`
    this.fill.style.insetInlineEnd = `${100 - to / STEPS * 100}%`
    this.fromHandle.setAttribute("aria-valuetext", this.format(this.year(from)))
    this.toHandle.setAttribute("aria-valuetext", this.format(this.year(to)))
    const first = this.year(from), last = this.year(to)
    this.barsElement.childNodes.forEach((bar, i) => {
      const bin = this.bins[i]
      bar.classList.toggle("is-in-range", bin.to >= first && bin.from <= last)
    })
  }

  applySoon() {
    clearTimeout(this.timer)
    this.timer = setTimeout(() => this.form.requestSubmit(), APPLY_DELAY)
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
