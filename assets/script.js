/* ============================================================================
   Cultural Collections — Prototype application logic
   ----------------------------------------------------------------------------
   A standalone, dependency-free single-page app that mimics a Blacklight + Solr
   discovery interface. Routing is hash-based so it works on GitHub Pages with
   no server. All persistent state lives in localStorage.

   Sections in this file:
     1.  Constants & helpers
     2.  State (localStorage-backed): acknowledgement, lists, saved, recent
     3.  Router
     4.  Header / footer
     5.  Search engine (Solr-style faceting in memory)
     6.  Views: home, indigenous, browse, collection, search, item, lists,
         list-detail, contact
     7.  Modals: acknowledgement, save-to-list, create-list, delete-list
     8.  Boot
   ========================================================================== */

(function () {
  "use strict";

  const { CATEGORIES, SUGGESTED_SEARCHES } = window.CC_DATA;
  // v5.3 — FEIT is excluded from Version 5 entirely. Filtering the shared data
  // once at this boundary guarantees FEIT cannot appear in any Version 5 surface
  // (browse, search, facets, counts, records, contact) without touching the data
  // file or earlier versions.
  const FEIT_SLUG = "feit";
  const COLLECTIONS = window.CC_DATA.COLLECTIONS.filter(c => c.slug !== FEIT_SLUG);
  const ITEMS       = window.CC_DATA.ITEMS.filter(i => i.collectionSlug !== FEIT_SLUG);

  // v4 — Featured Items removed entirely for 2026 (manual curation required).

  /* =========================================================================
     1. HELPERS
     ===================================================================== */

  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /** Tiny HTML escaper to keep injected sample strings safe. */
  function esc(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  /** Build an element from an HTML string. */
  function el(html) {
    const t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }

  /* ---- Inline SVG icon system ----
     Replaces decorative font glyphs (⌕, ⓘ, ✉, …) with dependency-free vector
     icons. Stroke-based and currentColor, so each icon inherits the surrounding
     text colour and scales with its container's font size. Paths are Heroicons
     v2 outline (MIT licence) plus a few hand-drawn matches (quote, scales, dot,
     box, grid). `icon(name)` returns the <svg> markup or "" if unknown. */
  const ICONS = {
    "search":       '<path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>',
    "info":         '<path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"/>',
    "mail":         '<path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>',
    "external":     '<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"/>',
    "lock":         '<path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/>',
    "lock-open":    '<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/>',
    "warning":      '<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/>',
    "check":        '<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/>',
    "chevron-down": '<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>',
    "x":            '<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>',
    "copy":         '<path stroke-linecap="round" stroke-linejoin="round" d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-7.5A2.25 2.25 0 018.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 00-2.25 2.25v6"/>',
    "link":         '<path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"/>',
    "download":     '<path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"/>',
    "download-off": '<path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V7.5"/><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 4.5l15 15"/>',
    "arrow-down":   '<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"/>',
    "tag":          '<path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"/>',
    "funnel":       '<path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"/>',
    "document":     '<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>',
    "photo":        '<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/>',
    "art":          '<path stroke-linecap="round" stroke-linejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"/>',
    "map":          '<path stroke-linecap="round" stroke-linejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934a1.125 1.125 0 01-1.008 0L9.736 3.814a1.125 1.125 0 00-1.008 0L3.85 5.748A1.125 1.125 0 003 6.752v11.426c0 .836.88 1.38 1.628 1.006l3.869-1.934a1.125 1.125 0 011.008 0l2.873 1.437a1.125 1.125 0 001.008 0z"/>',
    "video":        '<path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0zM15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"/>',
    "cube":         '<path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"/>',
    "flask":        '<path stroke-linecap="round" stroke-linejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"/>',
    "zoom-in":      '<path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"/>',
    "zoom-out":     '<path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM7.5 10.5h6"/>',
    "rotate-left":  '<path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"/>',
    "rotate-right": '<path stroke-linecap="round" stroke-linejoin="round" d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3"/>',
    "fit":          '<path stroke-linecap="round" stroke-linejoin="round" d="M15 3.75a.75.75 0 01.75-.75h4.5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0V5.56l-3.97 3.97a.75.75 0 11-1.06-1.06l3.97-3.97h-2.69a.75.75 0 01-.75-.75zm-12 0A.75.75 0 013.75 3h4.5a.75.75 0 010 1.5H5.56l3.97 3.97a.75.75 0 01-1.06 1.06L4.5 5.56v2.69a.75.75 0 01-1.5 0v-4.5zm16.5 16.5a.75.75 0 01-.75.75h-4.5a.75.75 0 010-1.5h2.69l-3.97-3.97a.75.75 0 011.06-1.06l3.97 3.97v-2.69a.75.75 0 011.5 0v4.5zM3.75 18.75v-4.5a.75.75 0 011.5 0v2.69l3.97-3.97a.75.75 0 011.06 1.06l-3.97 3.97h2.69a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75z"/>',
    "square":       '<rect x="5.5" y="5.5" width="13" height="13" rx="2"/>',
    "fullscreen":   '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v3a.75.75 0 001.5 0V5.56l3.97 3.97a.75.75 0 101.06-1.06L6.31 4.5h2.69a.75.75 0 000-1.5h-5a.75.75 0 00-.75.75zm17.25 0a.75.75 0 00-.75-.75h-5a.75.75 0 000 1.5h2.69l-3.97 3.97a.75.75 0 001.06 1.06l3.97-3.97v2.69a.75.75 0 001.5 0v-5zM3.75 20.25v-3a.75.75 0 011.5 0v2.69l3.97-3.97a.75.75 0 111.06 1.06l-3.97 3.97h2.69a.75.75 0 010 1.5h-5a.75.75 0 01-.75-.75zm17.25 0a.75.75 0 01-.75.75h-5a.75.75 0 010-1.5h2.69l-3.97-3.97a.75.75 0 111.06-1.06l3.97 3.97v-2.69a.75.75 0 011.5 0v5z"/>',
    "pan":          '<path stroke-linecap="round" stroke-linejoin="round" d="M10.05 4.575a1.575 1.575 0 10-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 013.15 0v1.5m-3.15 0l.075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 013.15 0V15M6.9 7.575a1.575 1.575 0 10-3.15 0v8.175a6.75 6.75 0 006.75 6.75h2.018a5.25 5.25 0 003.712-1.538l1.732-1.732a5.25 5.25 0 001.538-3.712l.003-2.024a.668.668 0 01.198-.471 1.575 1.575 0 10-2.228-2.228a3.818 3.818 0 00-1.12 2.687M6.9 7.575V12m6.27 4.5H21"/>',
    "copyright":    '<circle cx="12" cy="12" r="9"/><path stroke-linecap="round" stroke-linejoin="round" d="M15.5 10.4a3.75 3.75 0 100 3.2"/>',
    "quote":        '<path fill="currentColor" stroke="none" d="M9.7 5.4C6 6.7 3.5 9.7 3.5 13.9v4.9h6.3v-6.3H6.6c.1-2.3 1.2-4 3.1-4.8V5.4zm10.8 0c-3.7 1.3-6.2 4.3-6.2 8.5v4.9h6.3v-6.3h-3.2c.1-2.3 1.2-4 3.1-4.8V5.4z"/>',
    "scales":       '<path stroke-linecap="round" stroke-linejoin="round" d="M12 3v14M3.5 7.5h17M12 17l-3.5 4M12 17l3.5 4M3.5 7.5L1 12.5h5l-2.5-5zM20.5 7.5L18 12.5h5l-2.5-5zM4 21h16"/>',
    "dot":          '<circle cx="12" cy="12" r="6.5" fill="currentColor" stroke="none"/>',
    "box":          '<rect x="5" y="5" width="14" height="14" rx="2"/>',
    "grid":         '<rect x="3.5" y="3.5" width="7" height="7" rx="1"/><rect x="13.5" y="3.5" width="7" height="7" rx="1"/><rect x="3.5" y="13.5" width="7" height="7" rx="1"/><rect x="13.5" y="13.5" width="7" height="7" rx="1"/>',
    "list":         '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"/>'
  };

  function icon(name, cls = "") {
    const paths = ICONS[name];
    if (!paths) return "";
    return `<svg class="icon${cls ? " " + cls : ""}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths}</svg>`;
  }

  /** Coloured dot used by the G / PG / M / MA15+ / R18+ classification badges. */
  function classDot(color) {
    return `<svg class="class-dot" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="6" fill="${esc(color)}"/></svg>`;
  }

  function announce(msg) {
    const lr = $("#live-region");
    if (lr) lr.textContent = msg;
  }

  /** Map an access value to a human label + badge class. */
  const ACCESS_META = {
    "available":     { label: "Available",      cls: "badge--available", icon: "arrow-down" },
    "view-only":     { label: "View Only",      cls: "badge--view",      icon: "download-off" },
    "restricted":    { label: "Request to view digital asset", cls: "badge--restricted", icon: "lock" },
    "metadata-only": { label: "No digital asset", cls: "badge--meta",      icon: null }
  };
  function accessBadge(access) {
    // v4 — "Available" is a download-era label; with downloads removed it no
    // longer applies, so available items show no status badge at all. Only the
    // meaningful access states (View Only, No Digital, Request to view) render.
    if (access === "available") return "";
    const m = ACCESS_META[access] || ACCESS_META["metadata-only"];
    return `<span class="badge ${m.cls}">${m.icon ? `${icon(m.icon)} ` : ""}${m.label}</span>`;
  }

  function findItem(id)        { return ITEMS.find(i => i.id === id); }
  function findCollectionBySlug(slug) { return COLLECTIONS.find(c => c.slug === slug); }
  function categoryLabel(id)   { const c = CATEGORIES.find(x => x.id === id); return c ? c.label : id; }

  /* ---- Content classification (G / PG / M / MA15+ / R18+) ----
     Most cultural-collection material is General; a small share carries a higher
     advisory (e.g. medical/anatomy content). Seeded from the item id so each
     record always shows the same classification. Items may set `classification`
     explicitly in the data to override. */
  const CLASSIFICATIONS = {
    "G":     { code: "G",     label: "General",                        dot: "#2f9e44", cls: "class--g" },
    "PG":    { code: "PG",    label: "Parental Guidance Recommended",  dot: "#e9b949", cls: "class--pg" },
    "M":     { code: "M",     label: "Mature",                         dot: "#f08c00", cls: "class--m" },
    "MA15+": { code: "MA15+", label: "Mature Audiences",               dot: "#e03131", cls: "class--ma" },
    "R18+":  { code: "R18+",  label: "Restricted",                     dot: "#c92a2a", cls: "class--r" }
  };
  function itemClassification(i) {
    if (i.classification && CLASSIFICATIONS[i.classification]) return CLASSIFICATIONS[i.classification];
    // Medical/anatomy/pathology specimens lean to a higher advisory.
    const hay = [i.title, i.description, i.collection, (i.subjects||[]).join(" ")].join(" ").toLowerCase();
    if (/anatomy|patholog|specimen|surgical|dissection|human tissue/.test(hay)) {
      let h = 0; for (const c of i.id) h = (h * 31 + c.charCodeAt(0)) >>> 0;
      return (h % 3 === 0) ? CLASSIFICATIONS["MA15+"] : CLASSIFICATIONS["M"];
    }
    let h = 0; for (const c of i.id) h = (h * 31 + c.charCodeAt(0)) >>> 0;
    return (h % 8 === 0) ? CLASSIFICATIONS["PG"] : CLASSIFICATIONS["G"];   // mostly G
  }
  function classificationBadge(i) {
    const c = itemClassification(i);
    return `<span class="class-badge ${c.cls}" title="Advisory [Film & Gaming]: ${esc(c.code)} – ${esc(c.label)}">${classDot(c.dot)} [Film & Gaming] ${esc(c.code)} – ${esc(c.label)}</span>`;
  }

  // v0.7 — Content classification (G / PG / M / MA15+ / R18+) applies ONLY to
  // film, TV and video-game media. Other item types never show it.
  function isClassifiableMedia(i) {
    return /^(Audio \/ Video|Film|TV Show|Video Game)$/.test(i.type || "");
  }

  /* =========================================================================
     2. STATE (localStorage)
     ===================================================================== */

  const LS = {
    ACK:     "cc.ack.dismissed"
  };

  function read(key, fallback) {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
    catch { return fallback; }
  }
  function write(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch { /* ignore quota */ }
  }

  function todayISO() { return new Date().toISOString().slice(0, 10); }

  /* =========================================================================
     3. ROUTER  (hash routes -> view renderers)
     ===================================================================== */

  const VIEWS = [
    "home", "help", "help-article", "indigenous", "browse", "collection",
    "search", "item", "contact", "changelog"
  ];

  let lastView = null;
  function showView(name) {
    VIEWS.forEach(v => {
      const node = $("#view-" + v);
      if (node) node.hidden = (v !== name);
    });
    // v4 fix — only jump to the top when the VIEW actually changes. Re-rendering
    // the same view (e.g. applying a search filter) preserves the scroll
    // position so selecting a facet no longer throws the user back to the top.
    const main = $("#main");
    if (name !== lastView) {
      if (main) main.focus({ preventScroll: true });
      window.scrollTo(0, 0);
    }
    lastView = name;
  }

  /**
   * Routes:
   *   #/                       home
   *   #/indigenous             Indigenous Cultural Data
   *   #/browse                 Browse Collections
   *   #/collection/:slug       Collection detail
   *   #/search?q=...&...       Search results
   *   #/item/:id               Item detail
   *   #/contact                Contact Collections Team
   */
  function router() {
    const hash = location.hash || "#/";
    const [path, query] = hash.replace(/^#/, "").split("?");
    const parts = path.split("/").filter(Boolean); // e.g. ["collection","university-archives"]
    const params = new URLSearchParams(query || "");

    const root = parts[0] || "";

    if (root === "" )                 { renderHome();            showView("home"); }
    else if (root === "help" && parts[1]) { renderHelpArticle(parts[1]); showView("help-article"); }
    else if (root === "help")         { renderHelp();            showView("help"); }
    else if (root === "indigenous")   { renderIndigenous();      showView("indigenous"); }
    else if (root === "browse")       { renderBrowse();          showView("browse"); }
    else if (root === "collection")   { renderCollection(parts[1]); showView("collection"); }
    else if (root === "search")       { renderSearch(params);    showView("search"); }
    else if (root === "item")         { renderItem(decodeURIComponent(parts.slice(1).join("/"))); showView("item"); }
    else if (root === "contact")      { renderContact();         showView("contact"); }
    else if (root === "whats-changed"){ renderChangelog();        showView("changelog"); }
    else                              { renderHome();            showView("home"); }

    renderHeader(root);
  }

  function go(hash) { location.hash = hash; }

  /* =========================================================================
     4. HEADER & FOOTER
     ===================================================================== */

  function logoMark() {
    // Simple monochrome compass mark used throughout.
    return `<span class="logo-mark" aria-hidden="true">${icon("dot")}</span>`;
  }

  // v0.7 — Breadcrumb home link: a filled home icon (no label / logo).
  function homeCrumb() {
    return `<a href="#/" class="crumb-home" aria-label="Home"><svg class="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path fill-rule="evenodd" d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69a.75.75 0 011.06 0zm-1.742 4.136l-6.365 6.365a.75.75 0 01-.378.2V19.5a.75.75 0 00.75.75h4.5a.75.75 0 00.75-.75v-4.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75v4.5a.75.75 0 00.75.75h4.5a.75.75 0 00.75-.75v-5.056a.75.75 0 01-.372-.2l-6.365-6.365a2.25 2.25 0 00-3.182 0z" clip-rule="evenodd"/></svg></a>`;
  }

  function renderHeader(active) {
    const nav = [
      { key: "",         label: "Home",              href: "#/" },
      { key: "search",   label: "Search",            href: "#/search" },
      { key: "browse",   label: "Browse Collections",href: "#/browse" },
      { key: "help",     label: "Help & Guidance",   href: "#/help", group: ["help","help-article","indigenous","contact"] }
    ];

    const links = nav.map(n => {
      const isActive = n.key === active || (n.group && n.group.includes(active));
      return `<a href="${n.href}" class="nav-link${isActive ? " is-active" : ""}"${isActive ? ' aria-current="page"' : ""}>${esc(n.label)}</a>`;
    }).join("");

    $("#site-header").innerHTML = `
      <div class="header-inner">
        <a href="#/" class="brand" aria-label="Cultural Collections home">
          ${logoMark()}
          <span class="brand-text">
            <strong>CULTURAL COLLECTIONS</strong>
            <span>University of Melbourne</span>
          </span>
        </a>
        <button class="nav-toggle" id="nav-toggle" aria-expanded="false" aria-controls="primary-nav">Menu</button>
        <nav class="primary-nav" id="primary-nav" aria-label="Primary">${links}</nav>
      </div>`;

    const toggle = $("#nav-toggle");
    if (toggle) {
      toggle.addEventListener("click", () => {
        const navEl = $("#primary-nav");
        const open = navEl.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(open));
      });
    }
  }

  function renderFooter() {
    $("#site-footer").innerHTML = `
      <div class="footer-inner">
        <div class="footer-brand">
          ${logoMark()}
          <strong>CULTURAL COLLECTIONS</strong>
          <span>University of Melbourne</span>
          <p>A unified discovery platform for cultural collections held across the University of Melbourne.</p>
          <p class="footer-ack">The University of Melbourne acknowledges the Traditional Owners of the lands on which its campuses are situated.</p>
        </div>
        <nav class="footer-col" aria-label="Collections">
          <h2>Collections</h2>
          <a href="#/browse">Browse All Collections</a>
        </nav>
        <nav class="footer-col" aria-label="Help and guidance">
          <h2>Help &amp; Guidance</h2>
          <a href="#/help/search-tips">Search Tips</a>
          <a href="#/help/metadata-fields">Metadata &amp; Fields</a>
          <a href="#/help/rights-licensing">Rights &amp; Licensing</a>
          <a href="#/help/citing-collections">Citing Collections</a>
          <a href="#/indigenous">Indigenous Cultural Data</a>
          <a href="#/help/faqs">FAQs</a>
        </nav>
        <nav class="footer-col" aria-label="Access">
          <h2>Access</h2>
          <a href="#/contact">Request Access</a>
          <a href="#/indigenous">Accessibility</a>
          <a href="#/indigenous">Privacy Policy</a>
        </nav>
      </div>
      <div class="footer-base">
        <span>© 2026 University of Melbourne &nbsp;·&nbsp; Terms of Use &nbsp;·&nbsp; Privacy &nbsp;·&nbsp; Accessibility &nbsp;·&nbsp; <a href="#/whats-changed">What's changed (v0.3)</a></span>
        <span class="footer-share">Share: ${icon("info")} in ${icon("mail")}</span>
      </div>`;
  }

  /* =========================================================================
     5. SEARCH ENGINE (in-memory, Solr-style)
     ===================================================================== */

  /**
   * Available facet fields. Mirrors a Solr facet config.
   * Each returns a value for a given item.
   */
  // v4.2 — Object Type values (Video/Audio now belong here as moving image /
  // interview categories, per the simplified 2026 facet set).
  function objectType(i) {
    const t = (i.type || "").toLowerCase();
    if (/video|film|moving image/.test(t)) return "Video (Moving Image)";
    if (/audio|sound|interview|oral/.test(t)) return "Audio (Interviews)";
    if (/photo/.test(t)) return "Photograph";
    if (/paint|art|print|drawing|watercolour|sculpture/.test(t)) return "Artwork";
    if (/manuscript/.test(t)) return "Manuscript";
    if (/specimen|herbarium/.test(t)) return "Scientific Specimen";
    if (/object/.test(t)) return "Cultural Object";
    if (/book|publication|report|calendar|catalogue/.test(t)) return "Publication";
    if (/document|correspondence|map/.test(t)) return "Publication";
    return "Cultural Object";
  }

  // v4.2 — Digital Format values (Image / Full Text / PDF / Audio / Video / Other).
  function itemFormat(i) {
    const t = (i.type || "").toLowerCase();
    const f = ((i.format || []).join(" ")).toLowerCase();
    if (/video|film|moving image/.test(t)) return "Video";
    if (/audio|sound|interview|oral/.test(t)) return "Audio";
    if (/pdf|digitised pdf/.test(f)) return "PDF";
    if (/manuscript|typescript|document|correspondence|notes|letter|register|report/.test(t + " " + f)) return "Full Text";
    if (/photo|paint|art|object|specimen|image|map|print|drawing|watercolour/.test(t)) return "Image";
    return "Other";
  }

  // v4.2 — "Use" facet: usage/access filter derived from the access state.
  function itemUse(i) {
    if (i.access === "available") return "Download Available";
    if (i.access === "view-only") return "View Only";
    return null;   // restricted / metadata-only items contribute to neither
  }

  // Canonical value lists shown even when a result set doesn't include them all.
  const OBJECT_TYPES = ["Artwork", "Cultural Object", "Publication", "Manuscript", "Photograph", "Scientific Specimen", "Video (Moving Image)", "Audio (Interviews)"];
  const FORMATS      = ["Image", "Full Text", "PDF", "Audio", "Video", "Other"];
  const USES         = ["Download Available", "View Only"];

  // v4.2 — friendly Collection facet display labels (filter value stays the
  // item's actual collection name so filtering still matches the data).
  const COLLECTION_FACET_LABELS = {
    "Grainger Museum Collection": "Grainger Museum"
  };
  const collLabel = name => COLLECTION_FACET_LABELS[name] || name;

  /* v0.6 — collection-specific contact routing. Each collection either opens an
     Outlook email (mailto) or an external Smartsheet Access Request Form. Keyed
     by the collection's data name; `abbr` is the short code used in headings.
     Grouped by owning area (MDHS / M&C). Shared by the Contact Collections page
     and the object-detail "Contact Collection" button. */
  const SMARTSHEET_FORM_URL = "https://app.smartsheet.com/b/form/ccs-access-request"; // placeholder until final URL supplied
  const COLLECTION_CONTACTS = {
    "Medical History Museum":                              { area: "MDHS", areaNote: "Vernon Collections", abbr: "MHM", kind: "email", email: "mhm.info@unimelb.edu.au" },
    "Henry Forman Atkinson Dental Museum":                 { area: "MDHS", areaNote: "Vernon Collections", abbr: "HFA", kind: "email", email: "mhm.info@unimelb.edu.au" },
    "Harry Brookes Allen Museum of Anatomy and Pathology": { area: "MDHS", areaNote: "Vernon Collections", abbr: "HBA", kind: "email", email: "MDHS-museum@unimelb.edu.au" },
    "University Art Collection":                           { area: "Museums & Collections (M&C)", abbr: "UAC", kind: "form", formUrl: SMARTSHEET_FORM_URL },
    "Grainger Museum Collection":                          { area: "Museums & Collections (M&C)", abbr: "GM",  kind: "form", formUrl: SMARTSHEET_FORM_URL }
  };
  // Grouped, in display order, for the Contact Collections page.
  const CONTACT_GROUPS = [
    { area: "MDHS", note: "Vernon Collections", collections: ["Medical History Museum", "Henry Forman Atkinson Dental Museum", "Harry Brookes Allen Museum of Anatomy and Pathology"] },
    { area: "Museums & Collections (M&C)", collections: ["University Art Collection", "Grainger Museum Collection"] }
  ];
  const contactFor = name => COLLECTION_CONTACTS[name] || null;

  /* ------------------------------------------------------------------ *
   * v0.5 — Faceted Search Redesign (7 metadata groups, ~24 facets).
   * Several facet fields do not yet exist in the sample metadata, so they
   * are derived DETERMINISTICALLY from the item id/creator (a stable hash),
   * consistent with the seeded synthetic-data pattern used elsewhere in the
   * build. This keeps counts stable across renders and realistic for demo,
   * while the delivery team maps them to real Solr fields later.
   * ------------------------------------------------------------------ */
  function facetHash(str, salt) {
    let h = 2166136261 ^ (salt | 0);
    const s = String(str || "") + "|" + salt;
    for (let k = 0; k < s.length; k++) { h ^= s.charCodeAt(k); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }
  const facetPick = (seed, salt, arr) => arr[facetHash(seed, salt) % arr.length];

  // Real-field-informed derivations (meaningful, not random) ----------
  // Classification (governance sensitivity) mapped from the access state.
  function derClassification(i) {
    return ({ "available": "Public", "view-only": "Internal",
              "restricted": "Restricted", "metadata-only": "Sensitive" })[i.access] || "Public";
  }
  // Object access condition, from access state.
  function derObjectAccess(i) {
    return ({ "available": "Open Access", "view-only": "Open Access",
              "restricted": "Restricted", "metadata-only": "By Appointment" })[i.access] || "Open Access";
  }
  // Digital asset access condition, from access state.
  function derDamAccess(i) {
    return ({ "available": "Public", "view-only": "Internal",
              "restricted": "Restricted", "metadata-only": "Restricted" })[i.access] || "Public";
  }
  // Digital asset format type, from the existing Digital Format derivation.
  function derDamFormat(i) {
    const f = itemFormat(i);
    if (f === "Image" || f === "Full Text") {
      const t = objectType(i);
      if (t === "Cultural Object" || t === "Scientific Specimen") return "3D Object";
    }
    return ({ "Image": "Image", "Full Text": "PDF", "PDF": "PDF",
              "Audio": "Audio", "Video": "Video", "Other": "Image" })[f] || "Image";
  }
  // Licence type — public-domain / open items skew open, restricted skew reserved.
  function derLicence(i) {
    if (/public domain/i.test(i.rights || "")) return "Public Domain";
    if (i.access === "restricted" || i.access === "metadata-only") return "Rights Reserved";
    return facetPick(i.id, 71, ["Public Domain", "CC BY", "CC BY-SA", "Rights Reserved"]);
  }
  // Era / period — multi-valued so an item can be e.g. both 19th Century + Victorian Era.
  function derEra(i) {
    const y = i.year; if (!y) return [];
    const out = [];
    if (y < 1800) out.push("Pre-1800");
    else if (y < 1901) out.push("19th Century");
    else if (y <= 2000) out.push("20th Century");
    else out.push("Contemporary");
    if (y >= 1837 && y <= 1901) out.push("Victorian Era");
    return out;
  }
  // Object place of production (stable per item).
  function derPlaceProd(i) {
    return facetPick(i.id, 12, ["Melbourne", "Sydney", "London", "Paris", "Tokyo", "New York", "Berlin"]);
  }
  // Region derived from place of production (keeps the two consistent).
  function derRegion(i) {
    return ({ "Melbourne": "Oceania", "Sydney": "Oceania", "London": "Europe",
              "Paris": "Europe", "Berlin": "Europe", "Tokyo": "Asia", "New York": "Americas" })[derPlaceProd(i)] || "Oceania";
  }
  // Creator nationality (seeded on creator so all works by a creator agree).
  function derNationality(i) {
    if (!i.creator || /unknown/i.test(i.creator)) return null;
    return facetPick(i.creator, 33, ["Australian", "British", "Chinese", "Māori", "American", "French", "Japanese"]);
  }
  // Creator birth / death years (seeded on creator; plausible lifespan).
  function derCreatorBorn(i) {
    if (!i.creator || /unknown/i.test(i.creator)) return null;
    return 1830 + (facetHash(i.creator, 41) % 130); // 1830–1959
  }
  function derCreatorDied(i) {
    const b = derCreatorBorn(i); if (b == null) return null;
    return Math.min(b + 55 + (facetHash(i.creator, 42) % 35), 2024);
  }
  // Subject agent / location / event.
  function derSubjectAgent(i) { return facetPick(i.id, 51, ["Person", "Organisation", "Community"]); }
  function derSubjectLocation(i) { return facetPick(i.id, 52, ["Melbourne", "Victoria", "Australia"]); }
  function derSubjectEvent(i) {
    if (facetHash(i.id, 53) % 4 !== 0) return null; // sparse — only ~25% of items
    return facetPick(i.id, 54, ["World War I", "World War II", "Federation", "Olympic Games", "Gold Rush"]);
  }
  // Physical description / material technique (1–2 values, informed by object type).
  function derMaterial(i) {
    const t = objectType(i);
    let pool;
    if (t === "Artwork") pool = ["Oil on Canvas", "Watercolour", "Bronze", "Ink", "Paper"];
    else if (t === "Manuscript" || t === "Publication") pool = ["Ink", "Paper"];
    else if (t === "Scientific Specimen" || t === "Cultural Object") pool = ["Wood", "Bronze", "Paper"];
    else pool = ["Paper", "Ink", "Wood", "Watercolour"];
    const a = facetPick(i.id, 61, pool);
    const b = facetPick(i.id, 62, pool);
    return a === b ? [a] : [a, b];
  }
  // Named (sub-)collection — the real subCollection/series where present,
  // otherwise the parent collection so the browseable list is meaningful.
  function derNamedCollection(i) { return i.subCollection || i.collection || null; }

  /* v5.1 — Provenance. A small set of acquisition/custody categories drives the
     facet (discrete, countable values); the metadata record shows a fuller,
     concise sentence built from the same category. Deterministic per record. */
  const PROVENANCE_CATS = ["University Transfer", "Gift or Donation", "Purchase", "Bequest", "Field Collection", "Commissioned Work", "Long-term Loan"];
  function derProvenanceCat(i) { return facetPick(i.id, 81, PROVENANCE_CATS); }

  /* v5.3 — Credit line: a concise, approved-style acknowledgement of how the
     object is associated with the collection. Derived from the same acquisition
     category as Provenance (so the two agree) but phrased as a short credit
     statement, distinct from the fuller Provenance history. Prototype content. */
  function creditLineText(i) {
    const cat = derProvenanceCat(i);
    const yr = 1950 + (facetHash(i.id, 82) % 74); // same year seed as provenanceText
    const map = {
      "University Transfer": `Transferred from the University teaching collection, ${yr}.`,
      "Gift or Donation":    `Gift of a private benefactor, ${yr}.`,
      "Purchase":            `Purchased with the Collections Acquisition Fund, ${yr}.`,
      "Bequest":             `Bequest, ${yr}.`,
      "Field Collection":    `Collected in the field for the University collection, ${yr}.`,
      "Commissioned Work":   `Commissioned by the University of Melbourne, ${yr}.`,
      "Long-term Loan":      `Long-term loan to the University collection, ${yr}.`
    };
    return map[cat] || "";
  }

  /* v0.5 facet config. `control` drives rendering:
   *   "checkbox"    → checkbox list (multi-select, dynamic counts)
   *   "searchbrowse"→ checkbox list + search-within input + Browse All modal
   *   "daterange"   → From Year / To Year (uses fromParam/toParam + getYear)
   * `group` ties the facet to a heading block (see FACET_GROUPS). */
  const FACETS = {
    // Group 1 — Collection Details
    collection:      { label: "Collection Title",      group: "Collection Details", control: "checkbox",     get: i => i.collection },
    namedcoll:       { label: "Named Collections",     group: "Collection Details", control: "searchbrowse", get: i => derNamedCollection(i) },
    // v5.3 — Provenance facet removed (Provenance remains in the metadata record).
    // v0.6 — "Classification" facet removed per amendment (Change 1).
    // Group 2 — Creator
    creator:         { label: "Creator Name",          group: "Creator", control: "searchbrowse", get: i => (i.creator && !/unknown/i.test(i.creator)) ? i.creator : null },
    creatorBorn:     { label: "Creator Date of Birth", group: "Creator", control: "daterange", getYear: derCreatorBorn, fromParam: "born_from", toParam: "born_to" },
    creatorDied:     { label: "Creator Date of Death", group: "Creator", control: "daterange", getYear: derCreatorDied, fromParam: "died_from", toParam: "died_to" },
    nationality:     { label: "Nationality",           group: "Creator", control: "searchbrowse", get: i => derNationality(i), fixed: ["Australian", "British", "Chinese", "Māori", "American", "French", "Japanese"] },
    // Group 3 — Object
    type:            { label: "Object Type",           group: "Object", control: "checkbox", get: i => objectType(i), fixed: OBJECT_TYPES },
    prodDate:        { label: "Production Date",        group: "Object", control: "daterange", getYear: i => i.year, fromParam: "from", toParam: "to", presets: true },
    era:             { label: "Date (Era, Period, Century)", group: "Object", control: "searchbrowse", get: i => derEra(i), fixed: ["Pre-1800", "Victorian Era", "19th Century", "20th Century", "Contemporary"] },
    placeProd:       { label: "Object’s Place of Production", group: "Object", control: "searchbrowse", get: i => derPlaceProd(i) },
    // Group 4 — Subject / Topic
    subject:         { label: "Subject Terms",         group: "Subject / Topic", control: "searchbrowse", get: i => i.subjects || [] },
    subjectAgent:    { label: "People/Groups",         group: "Subject / Topic", control: "checkbox", get: i => derSubjectAgent(i), fixed: ["Person", "Organisation", "Community"] },
    subjectLocation: { label: "Subject Location",      group: "Subject / Topic", control: "checkbox", get: i => derSubjectLocation(i), fixed: ["Melbourne", "Victoria", "Australia"] },
    subjectEvent:    { label: "Subject Event",         group: "Subject / Topic", control: "checkbox", get: i => derSubjectEvent(i), fixed: ["World War I", "World War II", "Federation", "Olympic Games", "Gold Rush"] },
    material:        { label: "Physical Description / Material Technique", group: "Subject / Topic", control: "searchbrowse", get: i => derMaterial(i) },
    // Group 5 — Description
    language:        { label: "Language",              group: "Description", control: "searchbrowse", get: i => i.language },
    region:          { label: "Region",                group: "Description", control: "searchbrowse", get: i => derRegion(i), fixed: ["Oceania", "Europe", "Asia", "Americas", "Africa"] },
    // Group 6 — Copyright & Advisory
    licence:         { label: "Licence Type",          group: "Copyright & Advisory", control: "checkbox", get: i => derLicence(i), fixed: ["Public Domain", "CC BY", "CC BY-SA", "Rights Reserved"] },
    classRating:     { label: "Advisory", group: "Copyright & Advisory", control: "checkbox", get: i => isClassifiableMedia(i) ? itemClassification(i).code : null, fixed: ["G", "PG", "M", "MA15+", "R18+"] },
    // Group 7 — Access
    objAccess:       { label: "Object Access Condition",       group: "Access", control: "checkbox", get: i => derObjectAccess(i), fixed: ["Open Access", "Restricted", "By Appointment"] },
    damAccess:       { label: "Digital Asset Access Condition", group: "Access", control: "checkbox", get: i => derDamAccess(i), fixed: ["Public", "Internal", "Restricted"] },
    damFormat:       { label: "Digital Asset Format Type",     group: "Access", control: "checkbox", get: i => derDamFormat(i), fixed: ["Image", "Audio", "Video", "PDF", "3D Object"] }
  };

  // Render order + group headings for the sidebar.
  const FACET_GROUPS = [
    { title: "Collection Details", facets: ["collection", "namedcoll"] },
    { title: "Creator",           facets: ["creator", "creatorBorn", "creatorDied", "nationality"] },
    { title: "Object Classification", facets: ["type", "prodDate", "era", "placeProd"] },
    { title: "Subject / Topic",   facets: ["subject", "subjectAgent", "subjectLocation", "subjectEvent", "material"] },
    { title: "Description",       facets: ["language", "region"] },
    { title: "Copyright & Advisory", facets: ["licence", "classRating"] },
    { title: "Access",            facets: ["objAccess", "damAccess", "damFormat"] }
  ];

  // Value facets (checkbox / searchbrowse) vs date-range facets — used throughout.
  const VALUE_FACETS = Object.keys(FACETS).filter(f => FACETS[f].control !== "daterange");
  const DATE_FACETS  = Object.keys(FACETS).filter(f => FACETS[f].control === "daterange");

  /** Run a query against ITEMS, returning matched docs (before facet filtering). */
  function queryItems(q, mode) {
    q = (q || "").trim();
    if (!q) return ITEMS.slice();

    if (mode === "exact") {
      const needle = q.toLowerCase();
      return ITEMS.filter(i => searchableText(i).includes(needle));
    }
    if (mode === "boolean") {
      return booleanFilter(ITEMS, q);
    }
    // keyword: all terms must appear somewhere (AND of terms)
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    return ITEMS.filter(i => {
      const text = searchableText(i);
      return terms.every(t => text.includes(t));
    });
  }

  function searchableText(i) {
    return [
      i.title, i.creator, i.collection, i.type, i.description,
      (i.subjects || []).join(" "), i.culture, i.date
    ].join(" ").toLowerCase();
  }

  /** Minimal AND / OR / NOT boolean evaluation over terms. */
  function booleanFilter(items, q) {
    const tokens = q.split(/\s+/);
    return items.filter(i => {
      const text = searchableText(i);
      let result = null, opNext = "AND";
      tokens.forEach(tok => {
        const up = tok.toUpperCase();
        if (up === "AND" || up === "OR") { opNext = up; return; }
        if (up === "NOT") { opNext = "NOT"; return; }
        const present = text.includes(tok.toLowerCase());
        if (result === null) { result = present; return; }
        if (opNext === "AND") result = result && present;
        else if (opNext === "OR") result = result || present;
        else if (opNext === "NOT") result = result && !present;
        opNext = "AND";
      });
      return result === null ? true : result;
    });
  }

  /** Values a doc contributes to a facet — always an array (multi or single). */
  function facetValues(field, d) {
    const v = FACETS[field].get(d);
    if (v == null) return [];
    return Array.isArray(v) ? v : [v];
  }

  /** True if any facet or date-range filter is active in the given params. */
  function hasAnyFilter(params) {
    if (VALUE_FACETS.some(f => params.getAll("f_" + f).length)) return true;
    return DATE_FACETS.some(f => params.get(FACETS[f].fromParam) || params.get(FACETS[f].toParam));
  }

  /** Apply ALL active date-range facets (used by drill-down faceting + filtering). */
  function applyDateOnly(docs, params) {
    let out = docs;
    DATE_FACETS.forEach(f => {
      const cfg = FACETS[f];
      const from = parseInt(params.get(cfg.fromParam), 10);
      const to   = parseInt(params.get(cfg.toParam), 10);
      if (isNaN(from) && isNaN(to)) return;
      out = out.filter(d => {
        const y = cfg.getYear(d);
        if (y == null) return false;
        if (!isNaN(from) && y < from) return false;
        if (!isNaN(to)   && y > to)   return false;
        return true;
      });
    });
    return out;
  }

  /** A3 — Dynamic (Solr-style drill-down) facets.
   *  For each facet, counts are computed on the result set filtered by EVERY
   *  OTHER active facet (plus the date range), but NOT by the facet itself — so
   *  sibling values within the same facet stay selectable. Zero-count values are
   *  hidden, except values the user has actively selected (so they can deselect).
   *  Each entry is [value, count, displayLabel?]. */
  function computeFacets(base, params) {
    const out = {};
    VALUE_FACETS.forEach(field => {
      // Filter base by all OTHER value facets, plus every active date range.
      let docs = applyDateOnly(base, params);
      VALUE_FACETS.forEach(other => {
        if (other === field) return;
        const vals = params.getAll("f_" + other);
        if (vals.length) docs = docs.filter(d => {
          const dv = facetValues(other, d);
          return vals.some(v => dv.includes(v));
        });
      });

      const counts = {};
      docs.forEach(d => facetValues(field, d).forEach(v => { counts[v] = (counts[v] || 0) + 1; }));
      const active = params.getAll("f_" + field);

      let entries;
      if (FACETS[field].fixed) {
        // Keep canonical order, but drop zero-count values (unless selected).
        entries = FACETS[field].fixed
          .map(v => [v, counts[v] || 0])
          .filter(([v, n]) => n > 0 || active.includes(v));
      } else {
        entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
        active.forEach(v => { if (!(v in counts)) entries.push([v, 0]); });
      }
      out[field] = entries;
    });

    // Collection facet: alphabetical, friendly labels; hide zero-count (unless
    // selected). Each entry carries [value, count, label].
    const colCounts = Object.fromEntries(out.collection);
    const colActive = params.getAll("f_collection");
    out.collection = COLLECTIONS.filter(c => c.primary)
      .map(c => [c.name, colCounts[c.name] || 0, collLabel(c.name)])
      .filter(([name, n]) => n > 0 || colActive.includes(name))
      .sort((a, b) => a[2].localeCompare(b[2]));

    return out;
  }

  /** Apply active facet selections + all date ranges to docs. */
  function applyFilters(docs, params) {
    let out = docs.slice();
    VALUE_FACETS.forEach(field => {
      const vals = params.getAll("f_" + field);
      if (vals.length) out = out.filter(d => {
        const dv = facetValues(field, d);
        return vals.some(v => dv.includes(v));   // OR within a facet
      });
    });
    return applyDateOnly(out, params);   // AND across every active date range
  }

  function sortDocs(docs, sort) {
    const d = docs.slice();
    if (sort === "date-asc")  d.sort((a, b) => a.year - b.year);
    if (sort === "date-desc") d.sort((a, b) => b.year - a.year);
    if (sort === "title")     d.sort((a, b) => a.title.localeCompare(b.title));
    return d; // "relevance" keeps source order
  }

  /* =========================================================================
     6a. HOME
     ===================================================================== */

  function renderHome() {
    $("#view-home").innerHTML = `
      <!-- HERO -->
      <div class="hero">
        <div class="hero-inner">
          <p class="hero-eyebrow">${logoMark()} CULTURAL COLLECTIONS</p>
          <h1>Discover University of Melbourne Cultural Collections</h1>
          <p class="hero-sub">Search across museums, archives, art collections, scientific records, manuscripts and more — all in one place.</p>
          <form class="hero-search" id="hero-search" role="search">
            <label class="visually-hidden" for="hero-q">Search the collections</label>
            <span class="search-icon" aria-hidden="true">${icon("search")}</span>
            <input type="search" id="hero-q" placeholder="Search by keyword, title, creator, date, or collection…" />
            <label class="visually-hidden" for="hero-scope">Collection scope</label>
            <select id="hero-scope" class="scope-select">
              <option value="">All Collections</option>
              ${COLLECTIONS.filter(c => c.primary).map(c => `<option value="${esc(c.name)}">${esc(c.name)}</option>`).join("")}
            </select>
            <button type="submit" class="btn btn--primary">Search</button>
          </form>
          <p class="hero-suggest">Try:
            ${SUGGESTED_SEARCHES.map(s => `<a href="#" class="suggest-link" data-q="${esc(s)}">"${esc(s)}"</a>`).join("")}
          </p>
          <p class="hero-intro">The University of Melbourne’s cultural collections are unrivalled among Australian universities, spanning historical and contemporary collections across visual arts, cartography, medical history, zoology, archives and more, including significant collections of Aboriginal and Torres Strait Islander cultural heritage. Collections are cared for by central University departments, including the Museums and Collections department, Faculties and schools and Student and Scholarly Services. The social and cultural impact of our expansive collections is an integral part of the University’s Cultural Commons Strategy.</p>
        </div>
      </div>

      <!-- CULTURAL ACKNOWLEDGEMENT BANNER
           v0.7 — always shown near the hero (no longer suppressed after the
           Acknowledgement of Country modal is accepted). -->
      <div class="ack-banner" id="ack-banner">
        <div class="ack-banner-inner">
          <span class="ack-icon" aria-hidden="true">${icon("info")}</span>
          <p><strong>Cultural Acknowledgement:</strong> The University of Melbourne acknowledge Aboriginal and Torres Strait Islander people as the Traditional Owners of the unceded lands on which we work, learn and live. We pay respect to Elders past, present and future, and acknowledge the importance of Indigenous knowledge in the Academy.
          <a href="#/indigenous">Read about our Indigenous priorities</a></p>
          <button class="ack-dismiss" id="ack-banner-dismiss">Dismiss</button>
        </div>
      </div>

      <!-- STATS -->
      <div class="stats-strip stats-strip--3">
        <div class="stat"><span class="stat-num">240,000+</span><span class="stat-label">Collection Records</span></div>
        <div class="stat"><span class="stat-num">18</span><span class="stat-label">Contributing Collections</span></div>
        <div class="stat"><span class="stat-num">85,000+</span><span class="stat-label">Digital Assets</span></div>
      </div>

      <!-- BROWSE COLLECTIONS — v0.3: the six primary collection cards only -->
      <section class="container section">
        <div class="section-head">
          <div><h2>Browse Collections</h2></div>
          <a href="#/browse" class="link-arrow">View all collections →</a>
        </div>
        <div class="card-grid card-grid--3">
          ${COLLECTIONS.filter(c => c.primary).map(collectionCardHTML).join("")}
        </div>
      </section>

      <!-- Featured Items removed for 2026 (requires manual curation/admin).
           Future enhancement — intentionally no replacement component. -->

      <!-- HELP & GUIDANCE -->
      <section class="container section">
        <div class="section-head">
          <div><h2>Help &amp; Guidance</h2><p>Resources to help you get the most from Cultural Collections</p></div>
          <a href="#/help" class="link-arrow">All help resources →</a>
        </div>
        <div class="card-grid card-grid--4">
          ${[
            ["search","Search Tips","Learn how to use keyword search, Boolean operators, exact phrase matching and advanced filters to find what you need.","#/help/search-tips"],
            ["tag","Metadata & Fields","Understand the metadata fields used across collections including creator, culture, rights, format and persistent identifiers.","#/help/metadata-fields"],
            ["scales","Rights & Licensing","Guidance on copyright, open licences, rights statements and how to understand what you can and cannot do with items.","#/help/rights-licensing"],
            ["quote","Citing Collections","How to cite collection items in academic and research contexts including APA, Chicago, MLA and Harvard styles.","#/help/citing-collections"]
          ].map(([ic, t, b, href]) => `
            <a class="help-card" href="${href}">
              <span class="help-icon" aria-hidden="true">${icon(ic)}</span>
              <strong>${esc(t)}</strong>
              <span>${esc(b)}</span>
              <span class="link-arrow">Read guide →</span>
            </a>`).join("")}
        </div>

        <div class="faq-box">
          <div class="faq-head"><span>${icon("info")} Frequently Asked Questions</span><a href="#/help/faqs" class="link-arrow">View all FAQs</a></div>
          <div class="faq-grid">
            ${[
              "How do I search across multiple collections at once?",
              "Can I download images from the collections?",
              "What collections are currently included in Cultural Collections?",
              "What does \"View Only\" mean for digital assets?",
              "How do I request access to restricted records?",
              "How do I report an error or missing metadata?"
            ].map(q => `<a class="faq-item" href="#/help/faqs">› ${esc(q)}</a>`).join("")}
          </div>
        </div>
      </section>`;

    // Hero search submit
    $("#hero-search").addEventListener("submit", e => {
      e.preventDefault();
      const q = $("#hero-q").value.trim();
      const scope = $("#hero-scope").value;
      const p = new URLSearchParams();
      if (q) p.set("q", q);
      if (scope) p.append("f_collection", scope);
      go("#/search?" + p.toString());
    });
    // Suggested searches
    $$(".suggest-link", $("#view-home")).forEach(a => {
      a.addEventListener("click", e => {
        e.preventDefault();
        go("#/search?q=" + encodeURIComponent(a.dataset.q));
      });
    });
    // Dismiss banner (purely visual)
    const dismiss = $("#ack-banner-dismiss");
    if (dismiss) dismiss.addEventListener("click", () => $("#ack-banner").remove());
  }

  /* =========================================================================
     Shared item card
     ===================================================================== */

  function itemCardHTML(i, opts = {}) {
    const sel = selectedResults.has(i.id);
    const badge = accessBadge(i.access);   // "" for available items

    // v4 — the select checkbox and access status no longer sit on the image.
    // They live in a metadata controls row below the picture so the image stays
    // the clean hero element (avoids overlay copyright concerns).
    const selectCtl = opts.selectable
      ? `<label class="card-select"><input type="checkbox" data-result="${esc(i.id)}" ${sel?"checked":""} aria-label="Select ${esc(i.title)}" /> <span>Select</span></label>`
      : "";

    // Metadata-first LIST ROW (thumbnail ~15%, metadata ~85%).
    if (opts.list) {
      return `
        <article class="result-row${sel?" is-selected":""}">
          <a class="result-row-media placeholder" href="#/item/${encodeURIComponent(i.id)}" aria-label="${esc(i.title)}">
            <span class="ph-icon" aria-hidden="true">${icon(mediaGlyph(i.type))}</span>
          </a>
          <div class="result-row-main">
            <h3><a href="#/item/${encodeURIComponent(i.id)}">${esc(i.title)}</a></h3>
            <p class="result-row-meta"><span>${esc(i.collection)}</span> <span class="dot">·</span> ${esc(i.creator)} <span class="dot">·</span> ${esc(i.date)} <span class="dot">·</span> ${esc(i.type)}</p>
            ${(selectCtl || badge) ? `<div class="card-controls">${selectCtl}${badge}</div>` : ""}
          </div>
        </article>`;
    }

    // GRID CARD — image is a clean hero; the access badge overlays the media
    // top-left (v0.8.2), and the select control stays in the metadata body.
    return `
      <article class="item-card${opts.large ? " item-card--large" : ""}${opts.selectable ? " item-card--selectable" : ""}${sel?" is-selected":""}">
        <a class="item-card-media placeholder" href="#/item/${encodeURIComponent(i.id)}" aria-label="${esc(i.title)}">
          ${badge}
          <span class="ph-icon" aria-hidden="true">${icon(mediaGlyph(i.type))}</span>
          <span class="ph-label">${esc(i.type)} — ${esc(i.date)}</span>
        </a>
        <div class="item-card-body">
          <p class="item-card-meta"><span>${esc(i.collection)}</span> <span class="dot">·</span> ${esc(i.date)}</p>
          <h3><a href="#/item/${encodeURIComponent(i.id)}">${esc(i.title)}</a></h3>
          <p class="item-card-creator">Creator: ${esc(i.creator)}</p>
          ${opts.large ? "" : `<p class="item-card-desc">${esc(i.description)}</p>`}
          ${selectCtl ? `<div class="card-controls">${selectCtl}</div>` : ""}
        </div>
      </article>`;
  }

  // Selection state for the search results multi-select feature.
  const selectedResults = new Set();
  let viewSelectedOnly = false;

function mediaGlyph(type) {
  if (/photo/i.test(type)) return "photo";
  if (/paint|art/i.test(type)) return "art";
  if (/map/i.test(type)) return "map";
  if (/audio|video/i.test(type)) return "video";
  if (/object/i.test(type)) return "cube";
  if (/specimen/i.test(type)) return "flask";
  return "document";
}

  /* =========================================================================
     6a-ii. HELP AND GUIDANCE (landing page)
     ===================================================================== */

  function renderHelp() {
    // Cards link to dedicated help sub-pages (#/help/:topic), except the
    // Indigenous and Contact cards which link to their own full pages.
    const cards = [
      ["search", "Search Tips", "Learn how to use keyword search, Boolean operators, exact phrase matching and advanced filters to find what you need.", "#/help/search-tips"],
      ["tag", "Metadata and Fields", "Understand the metadata fields used across collections including creator, culture, rights, format and persistent identifiers.", "#/help/metadata-fields"],
      ["scales", "Rights and Licensing", "Guidance on copyright, open licences, rights statements and how to understand what you can and cannot do with items.", "#/help/rights-licensing"],
      ["quote", "Citing Collections", "How to cite collection items in academic and research contexts including APA, Chicago, MLA and Harvard styles.", "#/help/citing-collections"],
      ["lock", "Access Restrictions Explained", "Understand what View Only, Restricted and Metadata Only mean and how to request access.", "#/help/access-restrictions"],
      ["info", "FAQs", "Answers to common questions about searching, downloading and using the collections.", "#/help/faqs"],
      ["dot", "Indigenous Cultural Data and Access", "How Cultural Collections supports the respectful management, description and discovery of Aboriginal and Torres Strait Islander cultural heritage, knowledge and collections.", "#/indigenous"],
      ["mail", "Contact the Collections Team", "Submit an enquiry, request access to an item, or ask for further information from the Collections team.", "#/contact"]
    ];

    const faqs = HELP_ARTICLES.faqs.faqList.map(f => f.q);

    $("#view-help").innerHTML = `
      <div class="page-hero">
        <div class="container">
          <nav class="breadcrumb" aria-label="Breadcrumb">
            ${homeCrumb()} › <span>Help and Guidance</span>
          </nav>
          <h1>Help and Guidance</h1>
          <p class="page-hero-sub">Resources to help you search, understand and cite the University of Melbourne's cultural collections.</p>
        </div>
      </div>

      <section class="container section">
        <div class="card-grid card-grid--3">
          ${cards.map(([ic, t, b, href]) => `
            <a class="help-card" href="${href}">
              <span class="help-icon" aria-hidden="true">${icon(ic)}</span>
              <strong>${esc(t)}</strong>
              <span>${esc(b)}</span>
              <span class="link-arrow">Read guide →</span>
            </a>`).join("")}
        </div>

        <div class="faq-box">
          <div class="faq-head"><span>${icon("info")} Frequently Asked Questions</span><a href="#/help/faqs" class="link-arrow">View all FAQs</a></div>
          <div class="faq-grid">
            ${faqs.map(q => `<a class="faq-item" href="#/help/faqs">› ${esc(q)}</a>`).join("")}
          </div>
        </div>
      </section>`;
  }

  /* =========================================================================
     6a-iii. HELP ARTICLES (sub-pages of Help and Guidance)
     ===================================================================== */

  /** Content for each Help & Guidance sub-page. Kept concise by design. */
  const HELP_ARTICLES = {
    "search-tips": {
      icon: "search", title: "Search Tips",
      intro: "Cultural Collections is a search-first discovery platform. These tips help you find records quickly and precisely across all collections.",
      sections: [
        ["Keyword search", "Type any combination of title, creator, date, place or subject terms. By default all of your terms must appear in a record (an AND search), so adding terms narrows your results. Searching <em>bark painting Arnhem</em> returns records containing all three words."],
        ["Exact phrase", "Switch the search mode to <strong>Exact Phrase</strong> to match words in the exact order you typed them. Use this for known titles or names, for example <em>Foundation Charter</em>."],
        ["Boolean operators", "Switch to <strong>Boolean</strong> mode to combine terms with <code>AND</code>, <code>OR</code> and <code>NOT</code> in capitals. For example <em>painting AND Melbourne NOT portrait</em> finds paintings relating to Melbourne while excluding portraits."],
        ["Scoping and facets", "Use the <strong>All Collections</strong> selector to limit a search to one collection before you run it. After searching, refine results using the facets on the left: collection, item type, digital access, culture or origin, and date range."],
        ["Refining results", "Active filters appear as chips at the top of the results. Remove a chip to drop that filter, or choose <strong>Clear all filters</strong> to start again. Sort by relevance, date or title, and switch between grid and list views."]
      ],
      related: ["metadata-fields", "access-restrictions"]
    },
    "metadata-fields": {
      icon: "tag", title: "Metadata and Fields",
      intro: "Every record is described using a consistent set of metadata fields. Understanding these fields helps you interpret records and search more effectively.",
      sections: [
        ["Core descriptive fields", "<strong>Title</strong>, <strong>Creator</strong>, <strong>Date Created</strong> and <strong>Description</strong> identify and summarise the item. Creator may be a named person, an organisation, or <em>Unknown</em> where authorship is not recorded."],
        ["Format and extent", "<strong>Format</strong> records the physical or digital nature of the item (for example parchment document, oil on canvas, glass plate negative). <strong>Extent</strong> records size, page count or duration."],
        ["Collection and provenance", "<strong>Collection</strong> links the record to its parent collection and, where relevant, a sub-collection. <strong>Holding Institution</strong> identifies where the physical item is held."],
        ["Subjects and culture", "<strong>Subject / Keywords</strong> support topic-based discovery. <strong>Culture / Origin</strong> is recorded where an item relates to a specific cultural group, and may carry access conditions."],
        ["Rights and identifiers", "<strong>Rights</strong> states the licence or copyright status. The <strong>Persistent Identifier</strong> is a stable reference (for example <code>unimelb:item:arch:00001853-001</code>) that you can cite and that will not change over time."]
      ],
      related: ["rights-licensing", "citing-collections"]
    },
    "rights-licensing": {
      icon: "scales", title: "Rights and Licensing",
      intro: "Rights vary from item to item. Always check the rights statement on an individual record before reusing material.",
      sections: [
        ["Public domain", "Items assessed as <strong>Public Domain</strong> (often due to age) may be downloaded and reused for personal, research, educational or non-commercial purposes. Attribution to the University of Melbourne is requested."],
        ["Creative Commons", "Some digital reproductions are made available under a <strong>Creative Commons Attribution (CC BY 4.0)</strong> licence. You may share and adapt the material, including for commercial use, provided you give appropriate credit."],
        ["In copyright", "Items marked <strong>In copyright</strong> remain protected. Reuse beyond fair dealing requires permission from the rights holder, which may be the University or a third party."],
        ["Cultural conditions", "Items carrying <strong>Cultural conditions apply</strong> are subject to cultural protocols. Engage respectfully and seek consent from relevant Traditional Custodians before any commercial use. See Indigenous Cultural Data and Access for detail."],
        ["Getting permission", "For commercial reproduction or publication, or where rights are unclear, contact the Collections team with the item's persistent identifier and a description of your intended use."]
      ],
      related: ["citing-collections", "indigenous"]
    },
    "citing-collections": {
      icon: "quote", title: "Citing Collections",
      intro: "Cite collection items so others can locate the exact record you used. Every item detail page provides ready-made citations and export options.",
      sections: [
        ["What to include", "A good citation includes the creator, title, date, format, holding institution and the item's persistent identifier. The persistent identifier is the most reliable element because it never changes."],
        ["Supported styles", "Item records provide formatted citations in <strong>Chicago</strong>, <strong>APA 7th</strong>, <strong>MLA 9th</strong> and <strong>Harvard</strong>, plus a permalink. Use the citation tabs on any item detail page and copy the style your discipline requires."],
        ["Exporting references", "Use <strong>Export RIS</strong> or <strong>Export BibTeX</strong> on an item record to import the reference directly into reference managers such as EndNote, Zotero or Mendeley."],
        ["Example (Chicago)", "La Trobe, Charles Joseph. <em>Foundation Charter of the University of Melbourne</em>. 22 January 1853. Parchment document. University Archives, University of Melbourne. Persistent ID: unimelb:item:arch:00001853-001."]
      ],
      related: ["metadata-fields", "rights-licensing"]
    },
    "access-restrictions": {
      icon: "lock", title: "Access Restrictions Explained",
      intro: "Records carry an access status indicator that tells you what you can do with the digital asset. Look for the badge on item cards and detail pages.",
      sections: [
        ["Available", "The digital asset can be viewed online and downloaded, subject to the item's rights statement. Download options and resolutions appear on the item detail page."],
        ["View Only", "The record and a digital preview can be viewed online, but the asset cannot be downloaded. This often reflects copyright or cultural conditions."],
        ["Request to view", "Access is limited under privacy legislation, donor agreements or institutional policy. You can view the metadata record and submit a request to view to the collection custodian."],
        ["No Digital / Metadata Only", "Only a metadata record exists online; there is no digital asset. The physical item may be available to view in person by appointment."],
        ["Requesting access", "To request access to a restricted item or to arrange supervised access to a physical item, use the Contact the Collections Team form and include the item's persistent identifier."]
      ],
      related: ["rights-licensing", "indigenous"]
    },
    "faqs": {
      icon: "info", title: "Frequently Asked Questions",
      intro: "Answers to common questions about searching, downloading and using Cultural Collections.",
      faqList: [
        { q: "How do I search across multiple collections at once?", a: "By default, searches run across all collections. Leave the scope selector on <strong>All Collections</strong>, or choose a single collection to narrow your search before running it. Use the facets on the results page to refine afterwards." },
        { q: "Can I download images from the collections?", a: "It depends on the item's access status and rights. Items marked <strong>Available</strong> can be downloaded under their rights statement. <strong>View Only</strong> items can be viewed but not downloaded. Check the badge and the Rights and Access panel on each record." },
        { q: "What collections are currently included in Cultural Collections?", a: "The platform brings together records from museums, archives, art collections, photographic, scientific and research collections across the University. Use Browse Collections to see every contributing collection and its size." },
        { q: "What does 'View Only' mean for digital assets?", a: "It means you can view the record and an online preview, but the high-resolution digital asset is not available for download, usually due to copyright or cultural conditions. You can contact the Collections team if you need to use the asset." },
        { q: "How do I request access to restricted records?", a: "Open the record, then use the <strong>Request Access</strong> button or the Contact the Collections Team form. Include the item's persistent identifier and describe your intended use. The team aims to respond within 5 business days." },
        { q: "How do I report an error or missing metadata?", a: "Use the Contact the Collections Team form and select <strong>Contribute Additional Information</strong>. Quote the persistent identifier and describe the correction. Community knowledge helps us improve the accuracy of records." }
      ],
      related: ["search-tips", "access-restrictions"]
    }
  };

  function renderHelpArticle(topic) {
    const a = HELP_ARTICLES[topic];
    if (!a) { go("#/help"); return; }

    const body = a.faqList
      ? `<div class="help-faq-list">
           ${a.faqList.map(({ q, a: ans }) => `
             <details class="help-faq">
               <summary>${esc(q)}</summary>
               <div class="help-faq-body">${ans}</div>
             </details>`).join("")}
         </div>`
      : a.sections.map(([h, p]) => `<h2>${esc(h)}</h2><p>${p}</p>`).join("");

    const related = (a.related || []).map(key => {
      if (key === "indigenous") return `<a class="related-row" href="#/indigenous"><strong>Indigenous Cultural Data and Access</strong></a>`;
      const r = HELP_ARTICLES[key];
      return r ? `<a class="related-row" href="#/help/${key}"><strong>${esc(r.title)}</strong></a>` : "";
    }).join("");

    $("#view-help-article").innerHTML = `
      <div class="page-hero">
        <div class="container">
          <nav class="breadcrumb" aria-label="Breadcrumb">
            ${homeCrumb()} › <a href="#/help">Help and Guidance</a> › <span>${esc(a.title)}</span>
          </nav>
          <h1>${icon(a.icon)} ${esc(a.title)}</h1>
          <p class="page-hero-sub">${esc(a.intro)}</p>
        </div>
      </div>

      <div class="container layout-with-sidebar-right section">
        <div class="help-article-body">
          ${body}
          <p class="back-link"><a href="#/help" class="link-arrow">← Back to Help and Guidance</a></p>
        </div>
        <aside class="help-article-side">
          <div class="side-card">
            <h2 class="side-title">Related Guides</h2>
            ${related || `<a class="related-row" href="#/help"><strong>All help resources</strong></a>`}
          </div>
          <div class="side-card">
            <h2 class="side-title">Need more help?</h2>
            <p class="muted small">Contact the Collections team for enquiries, access requests or research assistance.</p>
            <a href="#/contact" class="btn btn--primary btn--block btn--sm">${icon("mail")} Contact Collections Team</a>
          </div>
        </aside>
      </div>`;
  }

  /* =========================================================================
     6b. INDIGENOUS CULTURAL DATA AND ACCESS
     ===================================================================== */

  function renderIndigenous() {
    $("#view-indigenous").innerHTML = `
      <div class="page-hero">
        <div class="container">
          <nav class="breadcrumb" aria-label="Breadcrumb">
            <a href="#/">Home</a> › <a href="#/indigenous">Help &amp; Guidance</a> › <span>Indigenous Cultural Data and Access</span>
          </nav>
          <h1>Indigenous Cultural Data and Access</h1>
          <p class="page-hero-sub">How Cultural Collections supports the respectful management, description and discovery of Aboriginal and Torres Strait Islander cultural heritage, knowledge and collections.</p>
        </div>
        <div class="cultural-warning">
          <div class="container">
            <strong>${icon("warning")} Cultural Warning:</strong> This page and the Cultural Collections platform contain references to Aboriginal and Torres Strait Islander peoples, communities, cultures and histories. Some records may contain images, voices or names of deceased persons.
          </div>
        </div>
      </div>

      <div class="container narrow section">
        <div class="review-banner" role="note">
          <strong>Content currently under review.</strong>
          <p>Final content will require endorsement by the University's Indigenous Advisory Group.</p>
        </div>
        <p>The University of Melbourne is committed to the respectful management, description and discovery of Aboriginal and Torres Strait Islander cultural heritage, knowledge and collections.</p>
        <p>Cultural Collections brings together records from collections across the University. Some records may contain Indigenous cultural information, imagery, language, stories, knowledge, or materials that are culturally sensitive.</p>

        <h2 class="iconed">${icon("dot")} Our Approach</h2>
        <p class="muted">How Cultural Collections supports responsible discovery and access</p>
        <ul class="stack-list">
          <li>Respecting Indigenous Cultural and Intellectual Property (ICIP).</li>
          <li>Supporting culturally appropriate access and use of collection information.</li>
          <li>Applying cultural warnings, notices and access controls where required.</li>
          <li>Working with Traditional Custodians, communities and collection custodians to improve the description and management of Indigenous materials.</li>
          <li>Recognising that cultural knowledge may have specific custodianship, permissions and protocols associated with its access and use.</li>
        </ul>

        <h2 class="iconed">${icon("document")} Access to Indigenous Cultural Information</h2>
        <p class="muted">What to expect when accessing collection records</p>
        <div class="two-col">
          <div class="mini-card">Include cultural warnings or notices.</div>
          <div class="mini-card">Contain information that is restricted or unavailable for public viewing.</div>
          <div class="mini-card">Have access conditions determined by collection custodians or Indigenous communities.</div>
          <div class="mini-card">Link to additional guidance about appropriate use and attribution.</div>
        </div>
        <div class="note-dark">${icon("info")} Where restrictions apply, Cultural Collections will clearly indicate the access status of the record. Look for access status indicators on individual item records.</div>

        <h3 class="overline">Access Status Indicators</h3>
        <div class="indicator-grid">
          <div class="indicator-card"><span class="badge badge--view">${icon("dot")} View Only</span><p>Record can be viewed but digital asset cannot be downloaded.</p></div>
          <div class="indicator-card"><span class="badge badge--restricted">${icon("lock")} Request to view</span><p>Access requires a request. Contact the collection custodian for access conditions.</p></div>
          <div class="indicator-card"><span class="badge badge--meta">${icon("warning")} Cultural Notice</span><p>Record includes culturally sensitive material. Please read notice before proceeding.</p></div>
        </div>

        <h2 class="iconed">${icon("scales")} Indigenous Cultural and Intellectual Property (ICIP)</h2>
        <p class="muted">Rights, recognition and responsibilities</p>
        <p>Indigenous Cultural and Intellectual Property refers to the rights of Aboriginal and Torres Strait Islander Peoples to maintain, control, protect and benefit from their cultural heritage, knowledge, cultural expressions and traditional practices.</p>
        <p>The University recognises the importance of respecting ICIP principles when managing and providing access to Indigenous cultural materials.</p>
        <div class="note-soft">${icon("info")} Users accessing Indigenous cultural materials through Cultural Collections are expected to engage with content respectfully and in accordance with the University's cultural protocols. Commercial use of Indigenous cultural materials requires prior consent from relevant Traditional Custodians and communities.</div>

        <h2 class="iconed">${icon("warning")} Cultural Warnings</h2>
        <p class="muted">Content users should be aware of</p>
        <ul class="stack-list">
          <li>Images, voices or names of deceased persons.</li>
          <li>Content that may be culturally sensitive.</li>
          <li>Historical language or descriptions that reflect the attitudes and practices of their time.</li>
        </ul>
        <p class="muted small">Such content is presented to support research, education and historical understanding and does not necessarily reflect contemporary views or University values.</p>

        <h2 class="iconed">${icon("document")} Related Policies and Guidance</h2>
        <p class="muted">Further information and resources</p>
        <ul class="stack-list link-list">
          <li>University of Melbourne Indigenous Cultural and Intellectual Property guidance. <span aria-hidden="true">${icon("external")}</span></li>
          <li>University of Melbourne Indigenous engagement and partnership frameworks. <span aria-hidden="true">${icon("external")}</span></li>
          <li>Collection-specific access and use conditions. <span aria-hidden="true">→</span></li>
          <li>Relevant Aboriginal and Torres Strait Islander cultural heritage resources. <span aria-hidden="true">${icon("external")}</span></li>
        </ul>

        <h2 class="iconed">${icon("mail")} Contact</h2>
        <p class="muted">Get in touch with the Cultural Collections team</p>
        <div class="note-soft">If you have questions about Indigenous cultural materials, cultural protocols, access conditions, or wish to provide feedback about a record, please contact the relevant collection custodian or the University of Melbourne Cultural Collections team.</div>
        <p><a href="#/contact" class="btn btn--primary">${icon("mail")} Contact the Cultural Collections Team</a></p>
      </div>`;
  }

  /* =========================================================================
     6c. BROWSE COLLECTIONS
     ===================================================================== */

  let browseState = { cats: [], types: [], digital: [], sort: "name-asc", view: "grid", q: "" };

  // Item-type filter values mapped to keyword rules tested against a
  // collection's `formats` array (and its category as a fallback signal).
  const TYPE_RULES = {
    "Images & Photographs": /photo|image|glass plate|lantern|albumen|gelatin|negative|postcard|poster/i,
    "Documents & Manuscripts": /document|manuscript|correspondence|paper|book|text|report|charter|diary/i,
    "Artworks & Objects": /paint|print|drawing|watercolour|sculpture|artwork|object|instrument|carv|fibre|bark/i,
    "Audio & Video": /film|video|sound|audio|recording/i,
    "Maps & Plans": /map|plan|drawing|survey|chart|architectural/i,
    "Scientific Specimens": /specimen|herbarium|mineral|fossil|pressed|petrolog|palaeo/i
  };
  function collectionHasType(c, typeLabel) {
    const rule = TYPE_RULES[typeLabel];
    if (!rule) return false;
    const hay = (c.formats || []).join(" ") + " " + (c.tags || []).join(" ") + " " + c.blurb;
    return rule.test(hay);
  }
  // Digital-access filter values mapped from a collection's `access` field.
  function collectionDigital(c) {
    if (c.access === "available" || c.access === "partial") return "Has downloadable assets";
    if (c.access === "view-only") return "Online viewable only";
    return "Metadata records only"; // restricted / metadata-only
  }

  function renderBrowse() {
    // Allow ?cat= to preselect a category
    const params = new URLSearchParams((location.hash.split("?")[1] || ""));
    if (params.has("cat")) browseState.cats = [params.get("cat")];

    paintBrowse();
  }

  function paintBrowse() {
    // v0.3 — simplified: a flat grid of collection cards. No "browse by type /
    // theme / institution", no category grouping. A search box filters across
    // collections. (FEIT is already excluded globally at the data boundary.)
    // v5.2 — remaining collections are shown alphabetically by visible name.
    let cols;
    if (browseState.q) {
      const n = browseState.q.toLowerCase();
      cols = COLLECTIONS.filter(c => (c.name + " " + c.blurb + " " + c.tags.join(" ")).toLowerCase().includes(n));
    } else {
      cols = COLLECTIONS.filter(c => c.primary);
    }
    cols = cols.slice().sort((a, b) => a.name.localeCompare(b.name));

    $("#view-browse").innerHTML = `
      <!-- DEV ANNOTATION (not user-facing) — Collection ordering:
           A future governance decision will determine collection ordering once
           additional collections are onboarded. No action required now. -->
      <div class="page-hero">
        <div class="container">
          <nav class="breadcrumb" aria-label="Breadcrumb">${homeCrumb()} › <span>Browse Collections</span></nav>
          <div class="page-hero-row">
            <div>
              <h1>Browse Collections</h1>
              <p class="page-hero-sub">Select a collection to discover the items held within.</p>
            </div>
          </div>
        </div>
      </div>

      <div class="container section">
        ${browseState.q ? `<div class="browse-result-head"><span class="muted">${cols.length} collection${cols.length===1?"":"s"} matching “${esc(browseState.q)}”</span> <button class="link-reset" id="browse-clearq">Clear search</button></div>` : ""}
        ${cols.length ? `<div class="card-grid card-grid--3">${cols.map(collectionCardHTML).join("")}</div>`
                      : `<p class="empty">No collections match “${esc(browseState.q)}”.</p>`}
      </div>`;

    wireBrowse();
  }

  function collectionCardHTML(c) {
    return `
      <a class="collection-card" href="#/collection/${c.slug}">
        <span class="collection-card-media placeholder">
          <span class="ph-label">${esc(c.name)}</span>
        </span>
        <span class="collection-card-body">
          <span class="tag-row">${c.tags.map(t=>`<span class="tag">${esc(t)}</span>`).join("")}</span>
          <strong>${esc(c.name)}</strong>
          <span class="collection-card-blurb">${esc(c.blurb)}</span>
          <span class="collection-card-foot">
            <span>${c.items.toLocaleString()} items</span>
          </span>
        </span>
      </a>`;
  }

  function viewToggleHTML(active, id) {
    return `
      <div class="view-toggle" role="group" aria-label="Display mode" data-toggle="${id}">
        <button class="${active==="grid"?"is-active":""}" data-view="grid" aria-pressed="${active==="grid"}">${icon("grid")} Grid</button>
        <button class="${active==="list"?"is-active":""}" data-view="list" aria-pressed="${active==="list"}">${icon("list")} List</button>
      </div>`;
  }

  function wireBrowse() {
    const root = $("#view-browse");
    const clearq = $("#browse-clearq", root);
    if (clearq) clearq.addEventListener("click", () => { browseState.q = ""; paintBrowse(); });
  }

  /* =========================================================================
     6d. COLLECTION DETAIL
     ===================================================================== */

  function renderCollection(slug) {
    const c = findCollectionBySlug(slug);
    if (!c) { go("#/browse"); return; }

    $("#view-collection").innerHTML = `
      <div class="collection-hero">
        <div class="container">
          <nav class="breadcrumb" aria-label="Breadcrumb">
            ${homeCrumb()} › <a href="#/browse">Browse Collections</a> › <span>${esc(c.name)}</span>
          </nav>
          <div class="collection-hero-row">
            <div class="collection-hero-media placeholder" aria-hidden="true"><span class="ph-icon">${icon("document")}</span></div>
            <div class="collection-hero-main">
              <span class="tag-row">${c.tags.map(t=>`<span class="tag tag--light">${esc(t)}</span>`).join("")}</span>
              <h1>${esc(c.name)}</h1>
              <p>${esc(c.blurb)}</p>
            </div>
          </div>
        </div>
      </div>

      ${c.advisory ? advisoryBanner(c.advisory) : ""}

      <div class="container layout-with-sidebar-right section">
        <div class="collection-body" id="collection-panel"></div>
        <aside class="collection-side">
          <div class="side-card">
            <h2 class="side-title">Actions</h2>
            <a href="#/search?f_collection=${encodeURIComponent(c.name)}" class="btn btn--primary btn--block">${icon("search")} Browse this collection</a>
          </div>
          <div class="side-card">
            ${collectionContactRows(c)}
            <a href="#/contact" class="link-arrow">Plan a research visit →</a>
          </div>
        </aside>
      </div>`;

    // store for panel renderer
    $("#view-collection").dataset.slug = slug;
    paintCollectionPanel(c);

    const citeBtn = $("[data-cite-collection]", $("#view-collection"));
    if (citeBtn) citeBtn.addEventListener("click", () => openCollectionCiteModal(c));
  }

  /** Cite a whole collection (not a single item). This is standard scholarly
   *  practice when referencing an archive or collection as a unit. */
  function collectionCitation(c, style) {
    const accessed = "14 June 2026";
    const url = `https://collections.unimelb.edu.au/#/collection/${c.slug}`;
    switch (style) {
      case "APA 7th":   return `University of Melbourne. (${c.dateRange}). <em>${c.name}</em> [Collection]. ${c.holding}. ${url}`;
      case "Harvard":   return `University of Melbourne (${c.earliest}) <em>${c.name}</em> [Collection], ${c.holding}. Available at: ${url} (Accessed: ${accessed}).`;
      case "Permalink": return url;
      default:          return `<em>${c.name}</em>. ${c.dateRange}. ${c.holding}. Persistent ID: ${c.id}. Accessed ${accessed}.`;
    }
  }

  function openCollectionCiteModal(c) {
    const styles = ["Chicago", "APA 7th", "Harvard", "Permalink"];
    openModal(`
      <button class="modal-x" data-close aria-label="Close">${icon("x")}</button>
      <h2>Cite this collection</h2>
      <p class="muted small">${esc(c.name)}</p>
      <p class="muted small">Use this when referencing the collection as a whole. To cite a single item, open that item and use Cite This Item.</p>
      <div class="cite-tabs" role="tablist">
        ${styles.map((s, idx) => `<button class="cite-tab ${idx===0?"is-active":""}" data-ccite="${s}" role="tab" aria-selected="${idx===0}">${s}</button>`).join("")}
      </div>
      <p class="cite-text" id="ccite-text">${collectionCitation(c, "Chicago")}</p>
      <div class="modal-foot">
        <button class="btn btn--ghost" data-close>Close</button>
        <button class="btn btn--primary" id="ccite-copy">${icon("copy")} Copy citation</button>
      </div>`,
      host => {
        $$("[data-ccite]", host).forEach(t => t.addEventListener("click", () => {
          $$("[data-ccite]", host).forEach(x => { x.classList.toggle("is-active", x===t); x.setAttribute("aria-selected", String(x===t)); });
          $("#ccite-text", host).innerHTML = collectionCitation(c, t.dataset.ccite);
        }));
        $("#ccite-copy", host).addEventListener("click", () => copyText($("#ccite-text", host).textContent, "Citation copied"));
      });
  }

  function snapshotRow(k, v) {
    return `<div class="snap-row"><span>${esc(k)}</span><strong>${esc(v)}</strong></div>`;
  }

  // v0.7 — Collection contact details rendered in the side card: stacked
  // label-over-value blocks (bold label, regular value). Email and telephone
  // are intentionally not shown on collection side-cards. Location sentences
  // are split into separate paragraphs for readability.
  function collectionContactRows(c) {
    const rows = [];
    if (c.location) rows.push(`<div class="contact-block"><span class="contact-label">Location</span>${sentenceParas(c.location)}</div>`);
    if (c.hours)    rows.push(`<div class="contact-block"><span class="contact-label">Opening hours</span><span class="contact-value">${esc(c.hours)}</span></div>`);
    return rows.join("");
  }

  // Split escaped text into one <p> per sentence, so paragraphs gain spacing.
  function sentenceParas(text) {
    return esc(text).split(/(?<=\.)\s+/).filter(Boolean)
      .map(s => `<p class="contact-para">${s.trim()}</p>`)
      .join("");
  }

  // Like sentenceParas but emits plain <p> (used for body copy such as "About
  // This Collection", which uses the default paragraph styling).
  function bodyParas(text) {
    return esc(text).split(/(?<=\.)\s+/).filter(Boolean)
      .map(s => `<p>${s.trim()}</p>`)
      .join("");
  }

  // v0.8 — Advisory banner. Advisories are NOT always cultural warnings: an item
  // or collection can carry any reason (cultural, medical, …) via its `advisory`
  // field; Aboriginal and Torres Strait Islander material defaults to the
  // cultural acknowledgement. One component renders every reason so the copy can
  // vary without changing the layout.
  const ADVISORIES = {
    cultural: {
      title: "Cultural Acknowledgement",
      icon: "info",
      link: "#/indigenous",
      linkLabel: "View Notice",
      body: "This record contains material relating to Aboriginal and Torres Strait Islander peoples and communities. Some items may be culturally sensitive. Please read our <a href=\"#/indigenous\">Cultural Acknowledgement</a> before proceeding."
    },
    medical: {
      title: "Content Advisory",
      icon: "warning",
      link: null,
      linkLabel: null,
      body: "This collection contains material of a medical, anatomical or surgical nature that may be distressing to some viewers. Discretion is advised."
    }
  };
  function advisoryBanner(kind) {
    const a = ADVISORIES[kind];
    if (!a) return "";
    return `
      <div class="ack-banner ack-banner--${kind}" role="note">
        <div class="ack-banner-inner">
          <span class="ack-icon" aria-hidden="true">${icon(a.icon)}</span>
          <p><strong>${esc(a.title.toUpperCase())}:</strong> ${a.body}</p>
          ${a.link ? `<a href="${a.link}" class="btn btn--ghost btn--sm ack-banner-btn">${a.linkLabel}</a>` : ""}
        </div>
      </div>`;
  }

  // Item-level advisory: explicit `advisory` reason, else cultural for records
  // flagged with a cultural notice.
  function itemAdvisory(i) {
    return i.advisory ? i.advisory : (i.culturalNotice ? "cultural" : null);
  }

  function paintCollectionPanel(c) {
    const panel = $("#collection-panel");
    // v5.2 — the collection in-page tab navigation was removed. The page now
    // shows the About This Collection content (with the compact collection
    // details) directly. Content is unchanged from the former Overview tab.
    panel.innerHTML = `
        <h2>About This Collection</h2>
        ${c.about
          ? `${bodyParas(c.about)}
             <p>The collection is held and managed by ${esc(c.holding)}. Use <a href="#/search?f_collection=${encodeURIComponent(c.name)}">Browse all items</a> to discover catalogued records, or contact the collection to arrange access to physical material.</p>`
          : `<p>${esc(c.blurb)} The collection is held and managed by ${esc(c.holding)}.</p>
             <p>Researchers, students and members of the public may access this collection to explore its history, trace individual records, or investigate topics of cultural, social and educational significance. Use <a href="#/search?f_collection=${encodeURIComponent(c.name)}">Browse all items</a> to discover catalogued records, or contact the collection to arrange access to physical material.</p>`}

        <details class="collection-details-compact" open>
          <summary>Collection details</summary>
          <table class="meta-table">
            ${metaRow("Total items", c.items.toLocaleString())}
            ${metaRow("Holding institution", c.holding)}
            ${metaRow("Physical location", c.location)}
            ${metaRow("Date Range", c.dateRange)}
            ${metaRow("Languages", c.languages)}
            ${metaRow("Formats Held", c.formats.join(", "))}
            ${metaRowRaw(pidLabel(), `<code>${esc(c.id)}</code>`)}
          </table>
        </details>`;
  }

  function metaRow(k, v) {
    return `<tr><th scope="row">${esc(k)}</th><td>${v}</td></tr>`;
  }

  // v0.7 — metaRow variant that keeps raw (HTML) label markup, used where a
  // label needs an inline element such as a hover tooltip.
  function metaRowRaw(k, v) {
    return `<tr><th scope="row">${k}</th><td>${v}</td></tr>`;
  }

  // v0.8 — "Persistent ID" label with a hover/focus tooltip. The copy is written
  // to answer the stakeholder question "what is the difference between Copy ID
  // and Permalink?" directly.
  const PID_TOOLTIP = "A permanent identifier for this record. Copy ID puts the identifier on your clipboard for citing or sharing. Permalink is a stable link that always opens this record page.";
  function pidLabel() {
    return `Persistent ID <span class="tip" tabindex="0" role="tooltip" aria-label="${esc(PID_TOOLTIP)}">${icon("info")}<span class="tip-text">${esc(PID_TOOLTIP)}</span></span>`;
  }

  function compactItemCard(i) {
    const badge = accessBadge(i.access);
    // v4 — controls below the image, not overlaid on it.
    return `
      <article class="compact-card">
        <a class="compact-media placeholder" href="#/item/${encodeURIComponent(i.id)}">
          <span class="ph-icon" aria-hidden="true">${icon(mediaGlyph(i.type))}</span>
        </a>
        <p class="compact-meta">${esc(i.date)} · ${esc(i.type)}</p>
        <a class="compact-title" href="#/item/${encodeURIComponent(i.id)}">${esc(i.title)}</a>
        ${badge ? `<div class="card-controls">${badge}</div>` : ""}
      </article>`;
  }

  /* =========================================================================
     6e. SEARCH RESULTS
     ===================================================================== */

  function renderSearch(params) {
    const q     = params.get("q") || "";
    const mode  = params.get("mode") || "keyword";
    const sort  = params.get("sort") || "relevance";
    const view  = params.get("view") || "grid";
    const page  = parseInt(params.get("page") || "1", 10);
    const per   = parseInt(params.get("per") || "9", 10);


    const base     = queryItems(q, mode);            // matched before facet filter
    let filtered   = applyFilters(base, params);     // after facets + date
    // "View Selected" narrows the results to only the ticked items.
    if (viewSelectedOnly) filtered = filtered.filter(d => selectedResults.has(d.id));
    const sorted   = sortDocs(filtered, sort);
    const facets   = computeFacets(base, params);    // A3 — dynamic drill-down counts

    const totalPages = Math.max(1, Math.ceil(sorted.length / per));
    const safePage   = Math.min(page, totalPages);
    const start      = (safePage - 1) * per;
    const pageDocs   = sorted.slice(start, start + per);

    // Build active filter chips
    const activeChips = [];
    VALUE_FACETS.forEach(field => {
      params.getAll("f_" + field).forEach(v => {
        const shown = field === "collection" ? collLabel(v) : v;
        activeChips.push({ label: `${FACETS[field].label}: ${shown}`, field, value: v });
      });
    });
    DATE_FACETS.forEach(field => {
      const cfg = FACETS[field];
      const f = params.get(cfg.fromParam), t = params.get(cfg.toParam);
      if (f || t) activeChips.push({ label: `${cfg.label}: ${f || "…"}–${t || "…"}`, field: "date:" + field });
    });

    $("#view-search").innerHTML = `
      <div class="search-hero">
        <div class="container">
          <nav class="breadcrumb breadcrumb--light" aria-label="Breadcrumb">${homeCrumb()} › <span>Search Results</span></nav>
          <form class="search-bar" id="search-form" role="search">
            <span class="search-icon" aria-hidden="true">${icon("search")}</span>
            <label class="visually-hidden" for="search-q">Search</label>
            <input type="text" id="search-q" value="${esc(q)}" placeholder="Search by keyword, title, creator…" autocomplete="off" />
            <button type="button" class="search-clear-x" id="search-clear-x" aria-label="Clear search and reset filters" title="Clear search" ${(q || hasAnyFilter(params)) ? "" : "hidden"}>${icon("x")}</button>
            <label class="visually-hidden" for="search-scope">Scope</label>
            <select id="search-scope" class="scope-select">
              <option value="">All Collections</option>
              ${COLLECTIONS.filter(c => c.primary).map(c=>`<option value="${esc(c.name)}">${esc(c.name)}</option>`).join("")}
            </select>
            <button class="btn btn--primary">Search</button>
          </form>
          <p class="search-help-text">Try: Percy Grainger · Aboriginal bark painting · "University Archives" · creator:smith</p>
        </div>
      </div>

      <!-- DEV ANNOTATION (not user-facing) — Search ranking:
           Q: How are default search results ranked before a sort is applied?
           Current assumption: Default = Relevance (Solr/Blacklight relevancy
           score on the query). With no query, default order is the index order.
           To confirm with the delivery team: boost fields, tie-breakers, and
           whether a curated default order is required. -->
      <div class="toolbar">
        <div class="container toolbar-inner">
          <span><strong>${sorted.length} results</strong> ${q?`for <em>"${esc(q)}"</em>`:""} <span class="muted">· Sorted by: ${({relevance:"Relevance","date-asc":"Date (oldest)","date-desc":"Date (newest)",title:"Title"})[sort]}</span></span>
          <div class="toolbar-controls">
            <label for="search-sort" class="muted">Sort by:</label>
            <select id="search-sort">
              <option value="relevance" ${sort==="relevance"?"selected":""}>Relevance</option>
              <option value="date-desc" ${sort==="date-desc"?"selected":""}>Date (newest)</option>
              <option value="date-asc"  ${sort==="date-asc"?"selected":""}>Date (oldest)</option>
              <option value="title"     ${sort==="title"?"selected":""}>Title A–Z</option>
            </select>
            ${viewToggleHTML(view, "search-view")}
          </div>
        </div>
      </div>

      <div class="container layout-with-sidebar section">
        <aside class="facets" aria-label="Filter results">
          <div class="facets-head"><h2>${icon("funnel")} Filter Results</h2><button class="link-reset" id="search-reset">Reset</button></div>
          <!-- DEV ANNOTATION (not user-facing) — v0.5 Faceted Search Redesign:
               7 metadata groups reflecting the revised discovery model. Facet
               values narrow dynamically (Solr-style drill-down); zero-count
               values are hidden; counts reflect the current result set.
               NOTE: "Object Type" appears once (in the Object group) rather than
               twice; a single control per field keeps dynamic faceting coherent.
               Several fields (nationality, era, place, subject agent/location/
               event, material, region, licence, access conditions, DAM format)
               are demo-derived and await mapping to real Solr fields. -->
          ${FACET_GROUPS.map(g => facetGroupHTML(g, facets, params)).join("")}
          <div class="facet-note">${icon("info")} Some results may contain materials of cultural significance. <a href="#/indigenous">Read our Cultural Acknowledgement</a></div>
        </aside>

        <div class="results">
          ${activeChips.length ? `<div class="active-filters"><span class="muted">Active filters:</span> ${activeChips.map(ch=>`<button class="chip" data-chip-field="${ch.field}" data-chip-value="${esc(ch.value||"")}">${esc(ch.label)} ${icon("x")}</button>`).join("")} <button class="chip-clear" id="search-clear">Clear all filters</button></div>` : ""}
          <div class="select-bar" id="select-bar"${selectedResults.size ? "" : " hidden"}>
            <span><strong id="select-count">${selectedResults.size}</strong> item${selectedResults.size===1?"":"s"} selected${viewSelectedOnly?" · showing selected only":""}</span>
            <div class="select-bar-actions">
              <button class="btn btn--primary btn--sm" id="view-selected">${viewSelectedOnly?"Show all results":`View Selected (${selectedResults.size})`}</button>
              <button class="btn btn--ghost btn--sm" id="clear-selection">Clear Selection</button>
            </div>
          </div>
          ${pageDocs.length ? `<div class="card-grid card-grid--3 ${view==="list"?"card-grid--list":""}">${pageDocs.map(i=>itemCardHTML(i, { selectable: true, list: view==="list" })).join("")}</div>` : `<p class="empty">${viewSelectedOnly?"No selected items to show.":`No results found${q?` for "${esc(q)}"`:""}. Try broadening your search or clearing filters.`}</p>`}
          ${paginationHTML(safePage, totalPages, sorted.length, start, pageDocs.length, per)}
        </div>
      </div>`;

    wireSearch(params);
  }

  // Wrap a facet block in a native <details> so it collapses/expands. `open`
  // defaults to true. The chevron is the <summary> marker (styled larger in CSS).
  function facetWrap(label, innerHTML, open = true) {
    return `
      <details class="facet-block"${open ? " open" : ""}>
        <summary><span>${esc(label)}</span><span class="facet-chevron" aria-hidden="true">${icon("chevron-down")}</span></summary>
        <div class="facet-body">${innerHTML}</div>
      </details>`;
  }

  // A4 — when a facet has more than this many values, only the most common are
  // shown in the panel and a "Browse All →" link opens the full-value modal.
  const FACET_BROWSE_CAP = 6;

  // v0.5 — facet groups open by default; the rest start collapsed to keep the
  // 23-facet panel scannable. Users can expand any group's facets on demand.
  const FACET_GROUPS_OPEN = ["Collection Details", "Object Classification"];

  // v0.5 — render one facet group: a heading plus each facet within it.
  function facetGroupHTML(group, facets, params) {
    const open = FACET_GROUPS_OPEN.includes(group.title);
    const inner = group.facets.map(field => {
      const cfg = FACETS[field];
      if (!cfg) return "";
      if (cfg.control === "daterange") return dateRangeHTML(field, params, open);
      return facetBlockHTML(field, facets[field], params, field === "collection" ? 6 : undefined, open);
    }).join("");
    if (!inner.trim()) return "";
    return `<div class="facet-group"><h3 class="facet-group-title">${esc(group.title)}</h3>${inner}</div>`;
  }

  // v0.5 — checkbox / search+browse facet. `searchbrowse` adds a search-within
  // input (client-side filter of the visible values) and always offers Browse All.
  function facetBlockHTML(field, entries, params, limit, open = true) {
    if (!entries || !entries.length) return "";
    const cfg = FACETS[field];
    // Keep a facet expanded if it has an active selection, even in a collapsed group.
    if (params.getAll("f_" + field).length) open = true;
    const searchable = cfg.control === "searchbrowse";
    const active = params.getAll("f_" + field);
    const cap = limit || FACET_BROWSE_CAP;
    const shown = entries.slice(0, cap);
    const more = entries.length - shown.length;

    const searchBox = searchable ? `
      <div class="facet-text">
        <span aria-hidden="true">${icon("search")}</span>
        <label class="visually-hidden" for="fs-${field}">Search ${esc(cfg.label)}</label>
        <input type="search" id="fs-${field}" data-facet-search="${field}" placeholder="Search ${esc(cfg.label)}…" autocomplete="off" />
      </div>` : "";

    const rows = shown.map(([val, n, label]) => `
      <label class="facet-row" data-facet-value="${esc((label || val).toLowerCase())}">
        <input type="checkbox" data-facet="${field}" value="${esc(val)}" ${active.includes(val)?"checked":""} />
        <span>${esc(label || val)}</span><span class="facet-count">${n}</span>
      </label>`).join("");
    const emptyNote = searchable ? `<p class="facet-empty muted small" data-facet-empty="${field}" hidden>No matching values.</p>` : "";
    // Browse All modal: always for search+browse; for checkbox only when capped.
    const browseAll = (searchable || more > 0)
      ? `<button class="link-more" data-browse-all="${field}">Browse All (${entries.length}) →</button>` : "";

    return facetWrap(cfg.label, searchBox + rows + emptyNote + browseAll, open);
  }

  // v0.5 — generic date-range facet (From Year / To Year). Production Date also
  // shows the newest-first presets; creator DOB/DOD are plain ranges.
  function dateRangeHTML(field, params, open = true) {
    const cfg = FACETS[field];
    const from = params.get(cfg.fromParam) || "", to = params.get(cfg.toParam) || "";
    if (from || to) open = true;   // keep an active range expanded
    const presets = cfg.presets ? [
      ["2020–Present","2020",""],
      ["2000–2019","2000","2019"],
      ["1980–1999","1980","1999"],
      ["1950–1979","1950","1979"],
      ["Pre-1949","","1949"]
    ] : [];
    const inner = `
        <div class="date-range">
          <label class="visually-hidden" for="df-${field}">From year</label>
          <input type="number" id="df-${field}" data-date-from="${field}" value="${esc(from)}" placeholder="From" />
          <span>to</span>
          <label class="visually-hidden" for="dt-${field}">To year</label>
          <input type="number" id="dt-${field}" data-date-to="${field}" value="${esc(to)}" placeholder="To" />
          <button class="btn btn--ghost btn--sm" data-date-apply="${field}">Go</button>
        </div>
        ${presets.map(([l,f,t])=>`<label class="facet-row"><input type="radio" name="datepreset-${field}" data-preset-field="${field}" data-from="${f}" data-to="${t}" ${from===f&&to===t?"checked":""}/><span>${l}</span></label>`).join("")}`;
    return facetWrap(cfg.label, inner, open);
  }

  function paginationHTML(page, totalPages, total, start, count, per) {
    if (total === 0) return "";
    const nums = [];
    for (let p = 1; p <= Math.min(totalPages, 5); p++) nums.push(p);
    if (totalPages > 6) { nums.push("…"); nums.push(totalPages); }
    else if (totalPages === 6) nums.push(6);
    return `
      <nav class="pagination" aria-label="Search results pages">
        <span class="muted">Showing <strong>${start+1}–${start+count}</strong> of ${total} results</span>
        <div class="page-nums">
          <button class="page-btn" data-page="${Math.max(1,page-1)}" ${page===1?"disabled":""}>‹ Previous</button>
          ${nums.map(n => n==="…" ? `<span class="page-ellipsis">…</span>` : `<button class="page-btn ${n===page?"is-active":""}" data-page="${n}">${n}</button>`).join("")}
          <button class="page-btn" data-page="${Math.min(totalPages,page+1)}" ${page===totalPages?"disabled":""}>Next ›</button>
        </div>
        <label class="muted">Per page:
          <select id="per-page">${[9,18,36].map(n=>`<option value="${n}" ${n===per?"selected":""}>${n}</option>`).join("")}</select>
        </label>
      </nav>`;
  }

  /** Helper: mutate the current search params then navigate. */
  function updateSearch(params, mutate) {
    const p = new URLSearchParams(params.toString());
    mutate(p);
    go("#/search?" + p.toString());
  }

  /** Reset the search to a brand-new session: no query, filters, tags, sort or
   *  page. Re-renders even when the hash is already "#/search" (setting the same
   *  hash fires no hashchange), so the X always works. */
  function resetSearchSession() {
    selectedResults.clear();
    viewSelectedOnly = false;
    if (location.hash === "#/search" || location.hash === "#/search?") {
      renderSearch(new URLSearchParams());   // already here — force a re-render
    } else {
      go("#/search");                        // hash changes — router re-renders
    }
  }

  function wireSearch(params) {
    const root = $("#view-search");

    $("#search-form", root).addEventListener("submit", e => {
      e.preventDefault();
      const q = $("#search-q").value.trim();
      const scope = $("#search-scope").value;
      updateSearch(new URLSearchParams(), p => {
        if (q) p.set("q", q);
        if (scope) p.append("f_collection", scope);
      });
    });

    // v4 — the explicit clear (X) button clears the field AND resets the whole
    // session: query, filters, selected tags, pagination and sort all return to
    // a fresh search state. A custom button is used (instead of the inconsistent
    // native one) so it works in every browser and can also clear filters that
    // are active when the query box is empty.
    const clearX = $("#search-clear-x", root);
    const searchInput = $("#search-q", root);
    if (clearX) clearX.addEventListener("click", () => {
      if (searchInput) searchInput.value = "";   // clear the field
      resetSearchSession();                       // reset query, filters, tags, sort, page
    });
    // Show/hide the X as the user types (it also shows when filters are active).
    if (searchInput) searchInput.addEventListener("input", () => {
      if (clearX) clearX.hidden = searchInput.value.trim() === "" && !hasAnyFilter(params);
    });

    $("#search-sort", root).addEventListener("change", e => updateSearch(params, p => { p.set("sort", e.target.value); p.set("page","1"); }));

    $$('[data-toggle="search-view"] button', root).forEach(b => b.addEventListener("click", () => updateSearch(params, p => p.set("view", b.dataset.view))));

    $$("[data-facet]", root).forEach(cb => cb.addEventListener("change", () => {
      updateSearch(params, p => {
        const field = "f_" + cb.dataset.facet;
        const vals = p.getAll(field).filter(v => v !== cb.value);
        p.delete(field);
        vals.forEach(v => p.append(field, v));
        if (cb.checked) p.append(field, cb.value);
        p.set("page","1");
      });
    }));

    // A4 — "Browse All" opens a modal with the full value list for that facet.
    $$("[data-browse-all]", root).forEach(b => b.addEventListener("click", () =>
      openBrowseAllModal(b.dataset.browseAll, params)));

    // v0.5 — search-within a facet: live-filter the visible values as the user types.
    $$("[data-facet-search]", root).forEach(inp => inp.addEventListener("input", () => {
      const field = inp.dataset.facetSearch;
      const term = inp.value.trim().toLowerCase();
      const body = inp.closest(".facet-body");
      let visible = 0;
      $$(".facet-row[data-facet-value]", body).forEach(r => {
        const match = !term || r.dataset.facetValue.includes(term);
        r.hidden = !match; if (match) visible++;
      });
      const empty = $(`[data-facet-empty="${field}"]`, body);
      if (empty) empty.hidden = visible !== 0;
    }));

    $$("[data-chip-field]", root).forEach(chip => chip.addEventListener("click", () => {
      updateSearch(params, p => {
        const field = chip.dataset.chipField;
        if (field.startsWith("date:")) {
          const cfg = FACETS[field.slice(5)];
          if (cfg) { p.delete(cfg.fromParam); p.delete(cfg.toParam); }
        } else {
          const key = "f_" + field;
          const vals = p.getAll(key).filter(v => v !== chip.dataset.chipValue);
          p.delete(key); vals.forEach(v => p.append(key, v));
        }
        p.set("page","1");
      });
    }));

    const clear = $("#search-clear", root);
    if (clear) clear.addEventListener("click", () => updateSearch(params, p => {
      VALUE_FACETS.forEach(f => p.delete("f_" + f));
      DATE_FACETS.forEach(f => { p.delete(FACETS[f].fromParam); p.delete(FACETS[f].toParam); });
      p.set("page","1");
    }));

    $("#search-reset", root).addEventListener("click", () => {
      const q = params.get("q");
      go("#/search" + (q ? "?q=" + encodeURIComponent(q) : ""));
    });

    // v0.5 — generic date-range apply (works for every date facet).
    $$("[data-date-apply]", root).forEach(btn => btn.addEventListener("click", () => {
      const field = btn.dataset.dateApply, cfg = FACETS[field];
      updateSearch(params, p => {
        const f = $(`[data-date-from="${field}"]`, root).value;
        const t = $(`[data-date-to="${field}"]`, root).value;
        if (f) p.set(cfg.fromParam, f); else p.delete(cfg.fromParam);
        if (t) p.set(cfg.toParam, t); else p.delete(cfg.toParam);
        p.set("page","1");
      });
    }));
    $$('input[data-preset-field]', root).forEach(r => r.addEventListener("change", () => {
      const cfg = FACETS[r.dataset.presetField];
      updateSearch(params, p => {
        if (r.dataset.from) p.set(cfg.fromParam, r.dataset.from); else p.delete(cfg.fromParam);
        if (r.dataset.to) p.set(cfg.toParam, r.dataset.to); else p.delete(cfg.toParam);
        p.set("page","1");
      });
    }));

    $$(".page-btn", root).forEach(b => { if (!b.disabled) b.addEventListener("click", () => updateSearch(params, p => p.set("page", b.dataset.page))); });
    const per = $("#per-page", root);
    if (per) per.addEventListener("change", e => updateSearch(params, p => { p.set("per", e.target.value); p.set("page","1"); }));

    $$("[data-more]", root).forEach(b => b.addEventListener("click", () => {
      b.textContent = "All values shown";
      b.disabled = true;
    }));

    // ---- Multi-select results feature ----
    const selectBar = $("#select-bar", root);
    function refreshSelectBar() {
      const n = selectedResults.size;
      if (selectBar) {
        selectBar.hidden = n === 0;
        const cnt = $("#select-count", selectBar); if (cnt) cnt.textContent = n;
        const vs = $("#view-selected", selectBar);
        if (vs && !viewSelectedOnly) vs.textContent = `View Selected (${n})`;
      }
    }
    $$("[data-result]", root).forEach(cb => cb.addEventListener("change", () => {
      if (cb.checked) selectedResults.add(cb.dataset.result);
      else selectedResults.delete(cb.dataset.result);
      cb.closest(".item-card, .result-row")?.classList.toggle("is-selected", cb.checked);
      // If we were showing selected-only and everything is unticked, exit that mode.
      if (viewSelectedOnly && selectedResults.size === 0) { viewSelectedOnly = false; renderSearch(params); return; }
      refreshSelectBar();
    }));
    const viewSel = $("#view-selected", root);
    if (viewSel) viewSel.addEventListener("click", () => {
      if (selectedResults.size === 0) return;
      viewSelectedOnly = !viewSelectedOnly;
      renderSearch(params);
    });
    const clearSel = $("#clear-selection", root);
    if (clearSel) clearSel.addEventListener("click", () => {
      selectedResults.clear(); viewSelectedOnly = false; renderSearch(params);
    });

  }

  /* =========================================================================
     6f. ITEM DETAIL
     ===================================================================== */

  /** Friendly file type for the viewer chrome (TIFF / JPEG / PDF / etc.). */
  function assetFormat(i) {
    const f = (i.format && i.format[0] || "").toLowerCase();
    if (/glass plate|gelatin|albumen|photo|negative/.test(f)) return "Gelatin silver print";
    return i.format && i.format[0] ? i.format[0] : "Digital asset";
  }

  /** Plausible pixel dimensions, derived deterministically from the id + asset
   *  number so each asset in a series shows its own (stable) numbers. */
  function assetDimensions(i, n) {
    let h = 0; for (const c of (i.id + "#" + (n || 1))) h = (h * 31 + c.charCodeAt(0)) >>> 0;
    const w = 2400 + (h % 2000);            // 2400–4399
    const ht = Math.round(w * (1.1 + (h % 7) / 10)); // taller than wide-ish
    return `${w} × ${ht} px`;
  }

  /* -------------------------------------------------------------------------
     Large Digital Viewer — for digitised multi-page documents (100+ pages).
     Styled like a cultural-collections / library archive reader rather than
     Adobe Acrobat: warm paper tones in greyscale, ruled page, archival framing.
     ------------------------------------------------------------------------- */
  function digitalViewerHTML(i) {
    const total = i.pages || 1;
    const thumbs = [];
    for (let n = 1; n <= total; n++) thumbs.push(n);
    return `
      <section class="digital-viewer" id="digital-viewer" aria-label="Digital viewer">
        <div class="dv-bar">
          <div class="dv-title">${icon("document")} Digital Viewer <span class="dv-pagecount" id="dv-pagecount">${total} pages</span></div>
          <form class="dv-search" id="dv-search" role="search">
            <label class="visually-hidden" for="dv-search-input">Search within document</label>
            <span aria-hidden="true">${icon("search")}</span>
            <input type="search" id="dv-search-input" placeholder="Search within document…" />
            <button class="btn btn--ghost btn--sm" type="submit">Search</button>
          </form>
          <div class="dv-tools">
            <button class="vtool" data-dv="zoomout" aria-label="Zoom out">${icon("zoom-out")}</button>
            <span class="dv-zoom" id="dv-zoom">100%</span>
            <button class="vtool" data-dv="zoomin" aria-label="Zoom in">${icon("zoom-in")}</button>
            <span class="vsep"></span>
            <button class="vtool vtool--text" data-dv="full" aria-label="Full screen">${icon("fullscreen")} Fullscreen</button>
            <a class="vtool vtool--text" data-dv="original" href="#" aria-label="Open original">${icon("external")} Open Original</a>
          </div>
        </div>
        <div class="dv-body">
          <nav class="dv-thumbs" id="dv-thumbs" aria-label="Page thumbnails">
            ${thumbs.map(n => `
              <button class="dv-thumb${n===1?" is-active":""}" data-dvpage="${n}" aria-label="Go to page ${n}">
                <span class="dv-thumb-page" aria-hidden="true">
                  <span class="dv-thumb-lines"></span>
                </span>
                <span class="dv-thumb-n">${n}</span>
              </button>`).join("")}
          </nav>
          <div class="dv-stage" id="dv-stage">
            <div class="dv-page" id="dv-page">
              <div class="dv-page-sheet" id="dv-page-sheet">
                <div class="dv-page-head">University of Melbourne Calendar — 1889</div>
                <div class="dv-page-lines" id="dv-page-lines"></div>
                <div class="dv-page-foot"><span id="dv-page-foot-num">Page 1</span> of ${total}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="dv-footer">
          <button class="btn btn--ghost btn--sm" data-dv="prev">‹ Previous</button>
          <span class="dv-pager">Page <strong id="dv-current">1</strong> of ${total}</span>
          <button class="btn btn--ghost btn--sm" data-dv="next">Next ›</button>
          <span class="dv-foot-note muted small" id="dv-search-status"></span>
        </div>
      </section>`;
  }

  /** Wire the Digital Viewer (page nav, thumbnails, zoom, search, fullscreen). */
  function wireDigitalViewer(root, i) {
    const dv = $("#digital-viewer", root);
    if (!dv) return;
    const total = i.pages || 1;
    let current = 1, zoom = 1;

    const sheet   = $("#dv-page-sheet", dv);
    const lines   = $("#dv-page-lines", dv);
    const curEl   = $("#dv-current", dv);
    const footNum = $("#dv-page-foot-num", dv);
    const zoomEl  = $("#dv-zoom", dv);

    // Render a deterministic set of "text" lines for a page (greyscale bars).
    function paintPage(n) {
      let h = 0; for (const c of (i.id + "p" + n)) h = (h * 31 + c.charCodeAt(0)) >>> 0;
      const rows = 14 + (h % 8);
      let html = "";
      for (let r = 0; r < rows; r++) {
        const w = 40 + ((h >> r) % 60);            // 40–99% width
        const indent = (r % 6 === 0) ? 6 : 0;
        html += `<span class="dv-line" style="width:${w}%;margin-left:${indent}%"></span>`;
      }
      lines.innerHTML = html;
      footNum.textContent = "Page " + n;
    }
    function goPage(n) {
      current = Math.min(total, Math.max(1, n));
      paintPage(current);
      curEl.textContent = current;
      $$(".dv-thumb", dv).forEach(t => t.classList.toggle("is-active", +t.dataset.dvpage === current));
      const active = $(`.dv-thumb[data-dvpage="${current}"]`, dv);
      if (active && active.scrollIntoView) active.scrollIntoView({ block: "nearest" });
    }
    function setZoom(z) { zoom = Math.min(2, Math.max(0.6, z)); sheet.style.transform = `scale(${zoom})`; zoomEl.textContent = Math.round(zoom * 100) + "%"; }

    $$(".dv-thumb", dv).forEach(t => t.addEventListener("click", () => goPage(+t.dataset.dvpage)));
    $$("[data-dv]", dv).forEach(b => b.addEventListener("click", e => {
      const a = b.dataset.dv;
      if (a === "next") goPage(current + 1);
      else if (a === "prev") goPage(current - 1);
      else if (a === "zoomin") setZoom(zoom + 0.1);
      else if (a === "zoomout") setZoom(zoom - 0.1);
      else if (a === "full") {
        e.preventDefault();
        if (!document.fullscreenElement && dv.requestFullscreen) dv.requestFullscreen().catch(()=>{});
        else if (document.exitFullscreen) document.exitFullscreen().catch(()=>{});
      }
      else if (a === "original") { e.preventDefault(); openLeaveSiteModal(i); }   // v4 — opens source record, not a download
    }));

    // Search within document — prototype: jump to a plausible "hit" page.
    $("#dv-search", dv).addEventListener("submit", e => {
      e.preventDefault();
      const term = $("#dv-search-input", dv).value.trim();
      const status = $("#dv-search-status", dv);
      if (!term) { status.textContent = ""; return; }
      let h = 0; for (const c of term.toLowerCase()) h = (h * 31 + c.charCodeAt(0)) >>> 0;
      const hits = 1 + (h % 5);
      const firstHit = 1 + (h % total);
      goPage(firstHit);
      status.textContent = `${hits} match${hits===1?"":"es"} for “${term}” — showing page ${firstHit}.`;
    });

    paintPage(1);
  }

  /** The media viewer — styled to resemble a real IIIF/Mirador-style viewer.
   *  Controls are presentational in this prototype but fully interactive. */
  function viewerHTML(i) {
    const has = i.access !== "metadata-only" && i.access !== "restricted";
    const rightsChip = i.rights === "Public Domain" ? `${icon("lock-open")} Public Domain`
      : i.rights === "Cultural conditions apply" ? `${icon("warning")} Cultural conditions`
      : i.access === "restricted" ? `${icon("lock")} Request to view`
      : `${icon("copyright")} In copyright`;

    if (!has) {
      // No digital asset — NO image placeholder. Show a concise text panel.
      // The metadata record below remains fully intact.
      return `
        <div class="no-asset" role="note">
          <h2>No digital asset available</h2>
          <p>Metadata is available for this record.</p>
          <p>You may still request access or contact the holding collection.</p>
          <p><a href="#/contact" class="btn btn--primary btn--sm">${icon("mail")} Request access / contact collection</a></p>
        </div>`;
    }

    return `
      <figure class="viewer" aria-label="Digital asset viewer">
        <div class="viewer-bar">
          <div class="viewer-tools">
            <button class="vtool" data-vzoom="out" aria-label="Zoom out">${icon("zoom-out")}</button>
            <button class="vtool" data-vzoom="in" aria-label="Zoom in">${icon("zoom-in")}</button>
            <span class="vzoom-readout" id="vzoom-readout">100%</span>
            <span class="vsep"></span>
            <button class="vtool" data-vrotate="left" aria-label="Rotate left">${icon("rotate-left")}</button>
            <button class="vtool" data-vrotate="right" aria-label="Rotate right">${icon("rotate-right")}</button>
            <span class="vsep"></span>
            <button class="vtool vtool--text" data-vfit aria-label="Fit to window">${icon("fit")} Fit</button>
            <button class="vtool vtool--text" data-vactual aria-label="Actual size">${icon("square")} 1:1</button>
          </div>
          <div class="viewer-meta">
            <span id="viewer-dims">${esc(assetFormat(i))} · ${assetDimensions(i, 1)}</span>
            <span class="vsep"></span>
            <button class="vtool vtool--text" data-vfull aria-label="Full screen">${icon("fullscreen")} Full screen</button>
          </div>
        </div>
        <div class="viewer-stage" id="viewer-stage">
          <span class="viewer-ph-icon" id="viewer-image" aria-hidden="true">${icon(mediaGlyph(i.type))}</span>
        </div>
        <!-- v5.3 — informational text (label, pan instruction, rights status) sits
             in a dedicated area BELOW the image, never overlaid on the pixels, so
             it is unambiguous that the image is collection content and the labels
             are interface content. -->
        <figcaption class="viewer-info">
          <span class="viewer-info-label" id="viewer-toplabel">${esc(mediaNoun(i.type))} — scroll or pinch to zoom</span>
          <span class="viewer-info-pan">${icon("pan")} Click and drag to pan</span>
          <span class="viewer-info-rights">${rightsChip}</span>
        </figcaption>
      </figure>`;
  }

  /** Returns the list of downloadable assets that make up this record.
   *  - photo/series items use `seriesCount` (+ `seriesLabel`)
   *  - multi-page documents use `pages`
   *  - everything else is a single asset
   *  Each asset: { n, label, tiff, jpeg } (sizes are illustrative placeholders). */
  function assetSeries(i) {
    let count = 1, label = "Image";
    if (i.seriesCount && i.seriesCount > 1) { count = i.seriesCount; label = i.seriesLabel || "Image"; }
    else if (i.pages && i.pages > 1)        { count = i.pages; label = "Page"; }
    const out = [];
    for (let n = 1; n <= count; n++) {
      // Deterministic, varied-looking sizes per asset.
      let h = 0; for (const c of (i.id + n)) h = (h * 31 + c.charCodeAt(0)) >>> 0;
      const tiff = (12 + (h % 320) / 10).toFixed(1);   // ~12–44 MB
      const jpeg = (1.2 + (h % 40) / 10).toFixed(1);   // ~1–5 MB
      out.push({ n, label: `${label} ${n}`, tiff, jpeg });
    }
    return out;
  }

  /** Viewer footer / image gallery.
   *  v4 — ALL download UI removed for 2026 (no buttons, badges, captions or
   *  popups). DEV NOTE: future download logic — when a DAM toggle marks an item
   *  as downloadable, render a Download button here; otherwise render nothing.
   *  For multi-asset records this is a scalable image gallery (collapses long
   *  series behind a "+N more" control). */
  function viewerFooterHTML(i) {
    const has = i.access !== "metadata-only" && i.access !== "restricted";
    if (!has) return "";   // no-asset states render their own panel via viewerHTML

    const assets = assetSeries(i);

    // Single asset → nothing to show beneath the viewer.
    if (assets.length === 1) return "";

    // Multi-asset → scalable image gallery. Shows the first GALLERY_VISIBLE
    // thumbnails; the rest sit behind a "+N more" toggle so 20+ images don't
    // overwhelm the page. Clicking a thumbnail switches the viewer.
    const VISIBLE = 8;
    const overflow = Math.max(0, assets.length - VISIBLE);
    return `<div class="asset-strip" data-asset-strip data-visible="${VISIBLE}">
        <div class="asset-strip-head">
          <strong>${assets.length} images in this series</strong>
          <span class="muted small">Select an image to view it</span>
        </div>
        <ul class="asset-thumbs">
          ${assets.map((a, idx) => `
            <li class="asset-thumb${a.n === 1 ? " is-active" : ""}${idx >= VISIBLE ? " is-hidden" : ""}" data-thumb="${a.n}">
              <button type="button" class="asset-thumb-media placeholder" data-view-asset="${a.n}" aria-label="View ${esc(a.label)}" aria-pressed="${a.n === 1 ? "true" : "false"}">
                <span class="ph-icon" aria-hidden="true">${icon(mediaGlyph(i.type))}</span>
                <span class="asset-thumb-n">${a.n}</span>
              </button>
              <span class="asset-thumb-label">${esc(a.label)}</span>
            </li>`).join("")}
        </ul>
        ${overflow > 0 ? `<button class="btn btn--ghost btn--sm asset-more" data-gallery-more>+ ${overflow} more</button>` : ""}
      </div>`;
  }

  function mediaNoun(type) {
    if (/photo/i.test(type)) return "Portrait photograph";
    if (/paint|art/i.test(type)) return "Artwork";
    if (/map/i.test(type)) return "Map";
    if (/object/i.test(type)) return "Object";
    if (/specimen/i.test(type)) return "Specimen";
    return "Document";
  }

  let currentItem = null; // the item currently shown in the detail view

  // v0.7 — Item Summary: Aboriginal Australian items surface "Culture / Origin"
  // instead of the (English) Language row. Scoped to Aboriginal Australian
  // cultural groups; the Māori record is unaffected.
  const ABORIGINAL_CULTURES = new Set(["Aboriginal Australian", "Yolŋu", "Anindilyakwa", "Anmatyerre", "Kunwinjku"]);

  /* ---- v0.8 — Metadata record field builders.
     Field names + sequencing follow stakeholder review: Title first, the DA
     title/DA format live with the digital asset (download) only, Object type
     takes the physical noun ("bark painting") and Material takes the medium
     ("ochre on bark"), and Classification sits as a record field near the end —
     a subject attribute, not an advisory. */

  function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  // Alternate Title — a meaningful short form where one can be derived from the
  // record's own title (strip a leading "Creator —" prefix and trailing year).
  function altTitle(i) {
    let t = i.title.replace(/^[^—]+—\s*/, "").replace(/,\s*(c\.)?\d{4}\s*$/, "");
    t = t.replace(/\s*\(Metadata Record Only\)\s*$/i, "").trim();
    return (t && t !== i.title) ? t : null;
  }

  // Series — only records digitised as part of a series carry one.
  function seriesField(i) {
    if (i.seriesCount && i.seriesLabel) return `${i.seriesLabel} series — ${i.seriesCount} images`;
    return null;
  }

  // Creator with lifespan, e.g. "Streeton, Arthur (1867–1943)". Unknown creators
  // keep their raw label with no fabricated dates.
  function creatorLifespan(i) {
    if (!i.creator) return null;
    if (/unknown/i.test(i.creator)) return i.creator;
    const b = derCreatorBorn(i), d = derCreatorDied(i);
    return `${i.creator} (${b}–${d})`;
  }

  // Role — the part the creator played in making the work, from the item type.
  function derRole(i) {
    const t = (i.type || "").toLowerCase();
    if (/photo/.test(t)) return "Photographer";
    if (/film|video|moving image/.test(t)) return "Filmmaker";
    if (/audio|sound|interview|oral/.test(t)) return "Interviewee";
    if (/paint|art|print|drawing|watercolour|sculpture/.test(t)) return "Artist";
    if (/map/.test(t)) return "Cartographer";
    if (/object/.test(t)) return "Maker";
    if (/book|publication|manuscript|document/.test(t)) return "Author";
    return null;
  }

  // Object type — the physical noun from the extent field ("1 bark painting"
  // → "Bark painting"), so Object type and Material don't repeat each other.
  function objectNoun(i) {
    const m = (i.extent || "").match(/1 ([a-z][a-z ]*?)(?:[,;]|$)/i);
    return m ? capitalize(m[1].trim()) : objectType(i);
  }

  // Dimensions — the measurement portion of extent ("42 × 58 cm").
  function dimensionsFromExtent(i) {
    const m = (i.extent || "").match(/\d[\d.,\s×x–-]*\s*(cm|mm|inches|inch|in\b)/i);
    return m ? m[0].trim() : null;
  }

  function accessStatusLabel(i) {
    return ({ "available": "Available", "view-only": "View Only",
              "restricted": "Request to view", "metadata-only": "No Digital Asset" })[i.access] || "Available";
  }

  // v0.8.4 — Licence icon shown at the start of the Terms of Use row. Uses the
  // official Creative Commons presskit glyphs (cc-icons/*.svg, downloaded from
  // creativecommons.org/mission/downloads). All glyphs share one coordinate space
  // (viewBox 5.5 -3.5 64 64), so the ring and licence elements from separate icon
  // files layer cleanly. Filled shapes render in currentColor (greyscale by design).
  const CC_VB = "5.5 -3.5 64 64";
  const CC_RING = "M37.441-3.5c8.951,0,16.572,3.125,22.857,9.372c3.008,3.009,5.295,6.448,6.857,10.314c1.561,3.867,2.344,7.971,2.344,12.314c0,4.381-0.773,8.486-2.314,12.313c-1.543,3.828-3.82,7.21-6.828,10.143c-3.123,3.085-6.666,5.448-10.629,7.086c-3.961,1.638-8.057,2.457-12.285,2.457s-8.276-0.808-12.143-2.429c-3.866-1.618-7.333-3.961-10.4-7.027c-3.067-3.066-5.4-6.524-7-10.372S5.5,32.767,5.5,28.5c0-4.229,0.809-8.295,2.428-12.2c1.619-3.905,3.972-7.4,7.057-10.486C21.08-0.394,28.565-3.5,37.441-3.5z M37.557,2.272c-7.314,0-13.467,2.553-18.458,7.657c-2.515,2.553-4.448,5.419-5.8,8.6c-1.354,3.181-2.029,6.505-2.029,9.972c0,3.429,0.675,6.734,2.029,9.913c1.353,3.183,3.285,6.021,5.8,8.516c2.514,2.496,5.351,4.399,8.515,5.715c3.161,1.314,6.476,1.971,9.943,1.971c3.428,0,6.75-0.665,9.973-1.999c3.219-1.335,6.121-3.257,8.713-5.771c4.99-4.876,7.484-10.99,7.484-18.344c0-3.543-0.648-6.895-1.943-10.057c-1.293-3.162-3.18-5.98-5.654-8.458C50.984,4.844,44.795,2.272,37.557,2.272z";
  const CC_CC = "M37.156,23.187l-4.287,2.229c-0.458-0.951-1.019-1.619-1.685-2c-0.667-0.38-1.286-0.571-1.858-0.571c-2.856,0-4.286,1.885-4.286,5.657c0,1.714,0.362,3.084,1.085,4.113c0.724,1.029,1.791,1.544,3.201,1.544c1.867,0,3.181-0.915,3.944-2.743l3.942,2c-0.838,1.563-2,2.791-3.486,3.686c-1.484,0.896-3.123,1.343-4.914,1.343c-2.857,0-5.163-0.875-6.915-2.629c-1.752-1.752-2.628-4.19-2.628-7.313c0-3.048,0.886-5.466,2.657-7.257c1.771-1.79,4.009-2.686,6.715-2.686C32.604,18.558,35.441,20.101,37.156,23.187z M55.613,23.187l-4.229,2.229c-0.457-0.951-1.02-1.619-1.686-2c-0.668-0.38-1.307-0.571-1.914-0.571c-2.857,0-4.287,1.885-4.287,5.657c0,1.714,0.363,3.084,1.086,4.113c0.723,1.029,1.789,1.544,3.201,1.544c1.865,0,3.18-0.915,3.941-2.743l4,2c-0.875,1.563-2.057,2.791-3.541,3.686c-1.486,0.896-3.105,1.343-4.857,1.343c-2.896,0-5.209-0.875-6.941-2.629c-1.736-1.752-2.602-4.19-2.602-7.313c0-3.048,0.885-5.466,2.658-7.257c1.77-1.79,4.008-2.686,6.713-2.686C51.117,18.558,53.938,20.101,55.613,23.187z";
  const CC_BY = "M46.129,20.557v13.085h-3.656v15.542h-9.944V33.643h-3.656V20.557c0-0.572,0.2-1.057,0.599-1.457c0.401-0.399,0.887-0.6,1.457-0.6h13.144c0.533,0,1.01,0.2,1.428,0.6C45.918,19.5,46.129,19.986,46.129,20.557z M33.042,12.329c0-3.008,1.485-4.514,4.458-4.514s4.457,1.504,4.457,4.514c0,2.971-1.486,4.457-4.457,4.457S33.042,15.3,33.042,12.329z";
  const CC_SA = "M23.271,23.985c0.609-3.924,2.189-6.962,4.742-9.114c2.552-2.152,5.656-3.228,9.314-3.228c5.027,0,9.029,1.62,12,4.856c2.971,3.238,4.457,7.391,4.457,12.457c0,4.915-1.543,9-4.627,12.256c-3.088,3.256-7.086,4.886-12.002,4.886c-3.619,0-6.743-1.085-9.371-3.257c-2.629-2.172-4.209-5.257-4.743-9.257H31.1c0.19,3.886,2.533,5.829,7.029,5.829c2.246,0,4.057-0.972,5.428-2.914c1.373-1.942,2.059-4.534,2.059-7.771c0-3.391-0.629-5.971-1.885-7.743c-1.258-1.771-3.066-2.657-5.43-2.657c-4.268,0-6.667,1.885-7.2,5.656h2.343l-6.342,6.343l-6.343-6.343L23.271,23.985L23.271,23.985z";
  const CC_PD = "M22.471,37.186V19.472h8.8c4.342,0,6.514,1.999,6.514,6c0,0.686-0.105,1.342-0.314,1.972c-0.209,0.629-0.572,1.256-1.086,1.886c-0.514,0.629-1.285,1.143-2.314,1.543c-1.028,0.399-2.247,0.6-3.656,0.6h-3.486v5.714H22.471z M26.871,22.785v5.372h3.771c0.914,0,1.6-0.258,2.058-0.772c0.458-0.513,0.687-1.152,0.687-1.915c0-1.79-0.953-2.686-2.858-2.686h-3.657V22.785z M38.984,37.186V19.472h6.859c2.818,0,5.027,0.724,6.629,2.171c1.598,1.448,2.398,3.677,2.398,6.686c0,3.01-0.801,5.24-2.398,6.686c-1.602,1.447-3.811,2.171-6.629,2.171H38.984z M43.387,23.186v10.287h2.57c1.562,0,2.695-0.466,3.4-1.401c0.705-0.933,1.057-2.179,1.057-3.742c0-1.562-0.352-2.809-1.057-3.743c-0.705-0.933-1.857-1.399-3.457-1.399L43.387,23.186L43.387,23.186z";

  function licenceIcon(licence) {
    const L = String(licence || "").toLowerCase();
    const glyphs = { "public domain": `<path d="${CC_PD}"/>`,
                     "cc by":          `<path d="${CC_CC}"/><path d="${CC_BY}"/>`,
                     "cc by-sa":       `<path d="${CC_CC}"/><path d="${CC_BY}"/><path d="${CC_SA}"/>` }[L];
    if (!glyphs) {
      // "Rights Reserved" has no Creative Commons glyph — keep the plain © mark.
      if (L === "rights reserved")
        return `<svg class="lic-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="8.5"/><path d="M15.6 9.4a4.4 4.4 0 100 5.2"/></svg>`;
      return "";
    }
    return `<svg class="lic-ico" viewBox="${CC_VB}" fill="currentColor" aria-hidden="true" focusable="false">` +
           `<circle fill="#fff" cx="37.5" cy="28.5" r="30.5"/><path d="${CC_RING}"/>${glyphs}</svg>`;
  }

  // Full metadata record, rendered in the stakeholder-preferred field order.
  function recordRows(i) {
    const R = [];
    const add = (k, v) => { if (v != null && String(v).trim() !== "") R.push(metaRow(k, v)); };
    add("Title", esc(i.title));
    add("Alternate Title", esc(altTitle(i)));
    add("Series", esc(seriesField(i)));
    add("Place of Production", esc(derPlaceProd(i)));
    add("Date", esc(i.date));
    add("Creator", esc(creatorLifespan(i)));
    add("Cultural Group", esc(i.culture));
    add("Role", esc(derRole(i)));
    add("Description", esc(i.description));
    add("Object type", esc(objectNoun(i)));
    add("Material", esc((i.format || []).join(", ")));
    add("Dimensions", esc(dimensionsFromExtent(i)));
    add("Language", esc(i.language));
    add("Named Collection", esc(i.subCollection));
    add("Collection", `<a href="#/collection/${encodeURIComponent(i.collectionSlug)}">${esc(i.collection)}</a>`);
    add("Holding Collection", esc(i.holding));
    add("Copyright", esc(i.rights));
    add("Credit line", esc(creditLineText(i)));
    add("Accession number", esc(i.acc));
    add("Terms of Use", `${licenceIcon(derLicence(i))}${esc(rightsCopy(i))}`);
    add("Access Status", esc(accessStatusLabel(i)));
    if (isClassifiableMedia(i)) R.push(metaRow("Advisory", classificationBadge(i)));
    add("Subject", (i.subjects || []).map(s => `<span class="tag">${esc(s)}</span>`).join(" "));
    add("Cite this record", `<a href="#/item/${encodeURIComponent(i.id)}">https://collections.unimelb.edu.au/#/item/${encodeURIComponent(i.id)}</a>`);
    return R.join("");
  }

  function renderItem(id) {
    const i = findItem(id);
    if (!i) { go("#/search"); return; }
    currentItem = i;
    const hasDA = hasDigitalAsset(i);   // v5.1 — DA-specific fields only when a Digital Asset exists

    $("#view-item").innerHTML = `
      <div class="container item-detail section">
        <nav class="breadcrumb" aria-label="Breadcrumb">
          ${homeCrumb()} › <a href="#/browse">Browse Collections</a> › <a href="#/collection/${i.collectionSlug}">${esc(i.collection)}</a> › <span>${esc(i.title)}</span>
        </nav>

        <div class="item-head">
          <div>
            <span class="tag-row">${accessBadge(i.access)} <span class="tag">${esc(i.type)}</span> <span class="tag">${esc(i.collection)}</span> <span class="tag">${esc(i.date)}</span></span>
            <h1>${esc(i.title)}</h1>
            <p class="muted">${esc(i.collection)} · ${esc(i.holding)}</p>
            <!-- v0.8 — Description sits directly after the title (About This Item
                 content); the separate heading was removed per stakeholder review. -->
            <p class="item-description">${esc(i.description)}</p>
            ${i.longDescription ? `<p class="item-description">${esc(i.longDescription)}</p>` : ""}
          </div>
          <div class="item-actions-top">
            <button class="btn btn--ghost btn--sm" data-share>${icon("external")} Share</button>
            <!-- v4 — Download removed for 2026. DEV NOTE: when a DAM toggle marks
                 an item downloadable, render a Download button here; else nothing. -->
          </div>
        </div>

        ${itemAdvisory(i) ? advisoryBanner(itemAdvisory(i)) : ""}

        <div class="item-grid">
          <div class="item-main">
            ${i.largeDocument
              ? `${digitalViewerHTML(i)}${hasDA ? `<p class="da-title" data-da-title>${esc(daTitle(i, 1))}</p>` : ""}`
              : `${viewerHTML(i)}${hasDA ? `<p class="da-title" data-da-title>${esc(daTitle(i, 1))}</p>` : ""}${viewerFooterHTML(i)}`}

            <!-- v0.8 — Metadata record. "Metadata Record" heading removed; the
                 table now uses the stakeholder field order directly. -->
            <table class="meta-table">
              ${recordRows(i)}
            </table>

            <div class="inline-contact">
              <div><span aria-hidden="true">${icon("mail")}</span> <strong>Need further information about this item?</strong><p>Contact the team that cares for this collection to request access, or to enquire about use of this item's digital assets.</p></div>
              <button type="button" class="btn btn--primary btn--sm" data-contact-collection>Contact Collection</button>
            </div>
          </div>

          <aside class="item-side">
            <div class="side-card">
              <h2 class="side-title">Item Actions</h2>
              <button class="btn btn--ghost btn--block" data-scroll-cite>${icon("quote")} Cite This Record</button>
              <button class="btn btn--ghost btn--block" data-full-record>${icon("document")} View Full Record ${icon("external")}</button>
            </div>
            <div class="side-card">
              <h2 class="side-title">Item Summary</h2>
              ${snapshotRow("Type", i.type)}
              ${snapshotRow("Date", i.date)}
              ${snapshotRow("Creator", creatorLifespan(i))}
              ${ABORIGINAL_CULTURES.has(i.culture) ? snapshotRow("Culture / Origin", i.culture) : snapshotRow("Language", i.language)}
              <!-- v4 — "Access: Available" replaced with a conditional "On Display"
                   field. Shown ONLY when the metadata exists; never Unknown / N/A. -->
              ${i.onDisplay ? snapshotRow("On Display", i.onDisplay) : ""}
            </div>
            <div class="side-card">
              <h2 class="side-title">Need further access or information?</h2>
              <p class="muted small">Contact the relevant collection to ask about access, use, or further information for this item.</p>
              <button type="button" class="btn btn--primary btn--block btn--sm" data-contact-email>${icon("mail")} Contact the collection</button>
            </div>
            <div class="side-card">
              <h2 class="side-title">Persistent Identifier</h2>
              <code class="pid">${esc(i.id)}</code>
              <div class="cite-actions"><button class="btn btn--ghost btn--sm" data-copy="${esc(i.id)}">${icon("copy")} Copy ID</button><a href="#/item/${encodeURIComponent(i.id)}" class="btn btn--ghost btn--sm">${icon("link")} Permalink</a></div>
              <p class="pid-caption muted small">A permanent identifier for this record. <strong>Copy ID</strong> puts the identifier on your clipboard for citing or sharing; <strong>Permalink</strong> is a stable link that always opens this record page.</p>
            </div>
            <!-- v0.8.1 — Citation sits in its own side-card, alongside (not inside)
                 the Persistent Identifier card. -->
            <div class="side-card" id="cite-card">
              <h2 class="side-title">Cite This Record</h2>
              <div class="cite-style-row">
                <label for="cite-style" class="muted small">Citation style</label>
                <select id="cite-style">
                  ${["Harvard","APA 7th","Chicago","MLA 9th"].map(s=>`<option value="${s}">${s}</option>`).join("")}
                </select>
              </div>
              <p class="cite-text" id="cite-text">${citation(i,"Harvard")}</p>
              <div class="cite-actions"><button class="btn btn--primary btn--sm" data-copy-cite>${icon("copy")} Copy Citation</button></div>
            </div>
          </aside>
        </div>
      </div>`;

    wireItem(i);
  }

  function rightsGlyph(i){ return i.rights==="Public Domain" ? "lock-open" : (i.access==="restricted" ? "lock" : "copyright"); }
  function rightsCopy(i){
    if (i.rights==="Public Domain") return "This item has been assessed as being in the public domain. The digital reproduction may be downloaded and reused for personal, research, educational or non-commercial purposes. Attribution to the University of Melbourne is requested.";
    if (i.access==="restricted") return "Access to this item is restricted under privacy legislation, donor agreement or institutional policy. A formal request is required.";
    if (i.rights==="Cultural conditions apply") return "Access and use of this item is subject to cultural conditions and protocols. Please engage respectfully and contact the collection custodian regarding appropriate use.";
    return "This item remains under copyright. Please check conditions before reuse and contact the collection for permissions.";
  }

  /* v5.1 — Rights & Access: per-image (Digital Asset) and parent (Collection
     Asset) descriptive fields. DA values change with the selected image; CA
     values stay constant across a record's images. Only present fields render. */
  function hasDigitalAsset(i) { return i.access !== "metadata-only" && i.access !== "restricted"; }

  // Title of the currently selected Digital Asset (image n).
  function daTitle(i, n) {
    const assets = assetSeries(i); const total = assets.length;
    const a = assets[(n || 1) - 1] || assets[0];
    return total > 1 ? `${i.title} — ${a.label} of ${total}` : `${i.title} — digital reproduction`;
  }

  // DA fields for image n. Returns [key, title, value] for each PRESENT field.
  function daFields(i, n) {
    const assets = assetSeries(i); const total = assets.length;
    const a = assets[(n || 1) - 1] || assets[0];
    const suffix = total > 1 ? ` (${a.label} of ${total})` : "";
    const pd = i.rights === "Public Domain";
    const restricted = i.access === "restricted";
    const cultural = i.rights === "Cultural conditions apply" || i.culturalNotice;
    const out = [
      ["caption", "Digital Asset Caption", `Digital reproduction of ${i.title}${suffix}, held by the ${i.collection}.`],
      ["credit",  "Digital Asset Credit Line", `Please credit this image as: ${i.collection}, University of Melbourne${total > 1 ? ` (${a.label})` : ""}.`],
      ["terms",   "Digital Asset Terms of Use", pd
        ? "This digital image may be accessed, copied, shared, published and reused, including commercially, provided the University of Melbourne is acknowledged (CC BY 4.0)."
        : restricted
          ? "This digital image is available on request only. It may not be copied, shared, published or reused without written permission from the collection."
          : "This digital image may be viewed online for research and study. Copying, publication or reuse requires written permission from the collection."]
    ];
    // DA Rights Notes — only when there is something extra to say (conditional).
    if (cultural) out.push(["notes", "Digital Asset Rights Notes", "Cultural conditions apply to this image. Please consult the collection before any reproduction or publication."]);
    else if (restricted) out.push(["notes", "Digital Asset Rights Notes", "Additional access restrictions apply to this image under donor agreement or institutional policy."]);
    return out;
  }

  // CA fields — constant for a record (its parent Collection Asset).
  function caFields(i) {
    const pd = i.rights === "Public Domain";
    return [
      ["Collection Asset Caption", `${i.title} — ${(i.type || "item").toLowerCase()} from the ${i.collection}${i.date ? `, ${i.date}` : ""}.`],
      ["Collection Asset Credit Line", `Collection of the ${i.holding}. ${i.collection}, University of Melbourne.`],
      ["Collection Asset Rights & Copyright", pd
        ? "The original work is in the public domain. No known copyright restrictions apply to the Collection Asset."
        : i.rights === "Cultural conditions apply"
          ? "Rights in the original work are subject to cultural conditions and protocols held with the source community and the collection."
          : `Copyright in the original work is held by the University of Melbourne or the original rights holder (${i.rights}). Contact the collection for reuse permissions.`]
    ];
  }

  // Rights & Access descriptive fields, interleaved DA/CA per the field list.
  // DA panels carry data-da-field so switchAsset can refresh them in place.
  function rightsAssetFieldsHTML(i, n) {
    const da = hasDigitalAsset(i) ? Object.fromEntries(daFields(i, n).map(([k, t, v]) => [k, [t, v]])) : {};
    const ca = Object.fromEntries(caFields(i).map(([t, v]) => [t, v]));
    const daPanel = (key) => da[key] ? `<div class="access-panel" data-da-field="${key}"><strong>${esc(da[key][0])}</strong><p>${esc(da[key][1])}</p></div>` : "";
    const caPanel = (title) => ca[title] != null ? `<div class="access-panel"><strong>${esc(title)}</strong><p>${esc(ca[title])}</p></div>` : "";
    return [
      daPanel("caption"),
      caPanel("Collection Asset Caption"),
      daPanel("credit"),
      caPanel("Collection Asset Credit Line"),
      daPanel("terms"),
      daPanel("notes"),
      caPanel("Collection Asset Rights & Copyright")
    ].join("");
  }

  // Refresh the DA-specific rights panels + Digital Asset Title for image n.
  function updateDAFields(root, i, n) {
    const map = Object.fromEntries(daFields(i, n).map(([k, t, v]) => [k, v]));
    $$("[data-da-field]", root).forEach(panel => {
      const v = map[panel.dataset.daField];
      const p = panel.querySelector("p");
      if (v != null && p) p.textContent = v;
    });
    const title = $("[data-da-title]", root);
    if (title) title.textContent = daTitle(i, n);
  }

  function citation(i, style) {
    const accessed = "14 June 2026";
    const creator = i.creator;
    switch (style) {
      case "APA 7th":   return `${creator} (${i.year}). <em>${i.title}</em>. ${i.holding}. ${i.id}`;
      case "MLA 9th":   return `${creator}. “${i.title}.” <em>Cross Collections Search</em>, ${i.year}, ${i.holding}. Accessed ${accessed}.`;
      case "Turabian":  return `${creator}. <em>${i.title}</em>. Melbourne: Cross Collections Search, ${i.year}. ${i.holding}.`;
      case "Harvard":   return `${creator} (${i.year}) <em>${i.title}</em>, ${i.holding}. Available at: ${i.id} (Accessed: ${accessed}).`;
      case "Permalink": return `https://collections.unimelb.edu.au/#/item/${i.id}`;
      default:          return `${creator}. <em>${i.title}</em>. ${i.date}. ${i.format[0]}. ${i.holding}. Persistent ID: ${i.id}. Accessed ${accessed}.`;
    }
  }

  function wireItem(i) {
    const root = $("#view-item");
    // Citation style selector (Harvard / APA / Chicago)
    const citeStyle = $("#cite-style", root);
    if (citeStyle) citeStyle.addEventListener("change", () => { $("#cite-text").innerHTML = citation(i, citeStyle.value); });

    // Share → copy-link modal (does NOT open email/Outlook).
    $$("[data-share]", root).forEach(b => b.addEventListener("click", () => openShareModal(i)));

    // Large Digital Viewer (for digitised multi-page documents).
    if (i.largeDocument) wireDigitalViewer(root, i);

    // "View Full Record" → confirm leaving for the source collection website.
    $$("[data-full-record]", root).forEach(b => b.addEventListener("click", () => openLeaveSiteModal(i)));

    // v0.6 — "Contact Collection" routes to the owning collection's email or
    // external form, via a confirmation modal (see openContactCollectionModal).
    $$("[data-contact-collection]", root).forEach(b => b.addEventListener("click", () => openContactCollectionModal(i)));

    // v5.2 — sidebar "Contact the collection": open Outlook (mailto) addressed to
    // this record's collection, with the persistent identifier as the subject and
    // a blank body. Collections without a configured email fall back to the
    // Contact Collections page (no misleading pre-addressed message).
    $$("[data-contact-email]", root).forEach(b => b.addEventListener("click", () => contactCollectionByEmail(i)));

    // "Cite This Record" sidebar button jumps to the citation side-card.
    const scrollCite = $("[data-scroll-cite]", root);
    if (scrollCite) scrollCite.addEventListener("click", () => {
      const box = $("#cite-card", root);
      if (box) { box.scrollIntoView({ behavior: "smooth", block: "center" }); box.classList.add("cite-flash"); setTimeout(() => box.classList.remove("cite-flash"), 1200); }
    });
    $$("[data-copy]", root).forEach(b => b.addEventListener("click", () => copyText(b.dataset.copy, "Identifier copied")));
    const copyCite = $("[data-copy-cite]", root);
    if (copyCite) copyCite.addEventListener("click", () => {
      copyText($("#cite-text").textContent, "Citation copied");
      copyCite.classList.add("is-copied");
      copyCite.innerHTML = `${icon("check")} Citation copied`;
      setTimeout(() => { copyCite.classList.remove("is-copied"); copyCite.innerHTML = `${icon("copy")} Copy Citation`; }, 1800);
    });
    wireViewer(root);
  }

  /** Interactive (but content-free) viewer controls: zoom, rotate, fit, 1:1,
   *  full screen and drag-to-pan over the placeholder glyph. */
  function wireViewer(root) {
    const stage   = $("#viewer-stage", root);
    const img     = $("#viewer-image", root);
    const readout = $("#vzoom-readout", root);
    if (!stage || !img) return;

    let zoom = 1, rot = 0, panX = 0, panY = 0;
    const MIN = 0.5, MAX = 4;

    function apply() {
      img.style.transform = `translate(${panX}px, ${panY}px) scale(${zoom}) rotate(${rot}deg)`;
      if (readout) readout.textContent = Math.round(zoom * 100) + "%";
    }
    function setZoom(z) { zoom = Math.min(MAX, Math.max(MIN, z)); apply(); }

    $$("[data-vzoom]", root).forEach(b => b.addEventListener("click", () =>
      setZoom(zoom + (b.dataset.vzoom === "in" ? 0.25 : -0.25))));
    $$("[data-vrotate]", root).forEach(b => b.addEventListener("click", () =>
      { rot += (b.dataset.vrotate === "right" ? 90 : -90); apply(); }));
    const fit = $("[data-vfit]", root);
    if (fit) fit.addEventListener("click", () => { zoom = 1; rot = 0; panX = panY = 0; apply(); });
    const actual = $("[data-vactual]", root);
    if (actual) actual.addEventListener("click", () => { setZoom(1); panX = panY = 0; apply(); });

    // Scroll to zoom
    stage.addEventListener("wheel", e => {
      e.preventDefault();
      setZoom(zoom + (e.deltaY < 0 ? 0.1 : -0.1));
    }, { passive: false });

    // Drag to pan
    let dragging = false, sx = 0, sy = 0;
    stage.addEventListener("pointerdown", e => { dragging = true; sx = e.clientX - panX; sy = e.clientY - panY; stage.setPointerCapture(e.pointerId); stage.classList.add("is-grabbing"); });
    stage.addEventListener("pointermove", e => { if (!dragging) return; panX = e.clientX - sx; panY = e.clientY - sy; apply(); });
    stage.addEventListener("pointerup", e => { dragging = false; stage.classList.remove("is-grabbing"); });

    // Multi-asset: thumbnail click switches the viewer; checkboxes select for
    // download; select-all toggles every checkbox; count updates the button.
    const strip = $("[data-asset-strip]", root);
    if (strip) {
      const topLabel = $("#viewer-toplabel", root);
      const dims     = $("#viewer-dims", root);
      const assets   = assetSeries(currentItem);
      const total    = assets.length;

      // Switch the main viewer to a given asset number.
      function switchAsset(n) {
        zoom = 1; rot = 0; panX = panY = 0; apply();
        img.style.filter = `grayscale(1) brightness(${0.85 + (n % 4) * 0.06})`;
        img.style.opacity = "0"; setTimeout(() => { img.style.opacity = "1"; }, 60);
        if (topLabel) topLabel.textContent = `${mediaNoun(currentItem.type)} — ${assets[n-1].label} of ${total} · scroll or pinch to zoom`;
        if (dims) dims.textContent = `${assetFormat(currentItem)} · ${assetDimensions(currentItem, n)}`;
        $$(".asset-thumb", strip).forEach(t => t.classList.toggle("is-active", +t.dataset.thumb === n));
        $$("[data-view-asset]", strip).forEach(b => b.setAttribute("aria-pressed", (+b.dataset.viewAsset === n) ? "true" : "false"));
        // v5.1 — keep the Digital Asset title + DA-specific rights fields in sync
        // with the selected image (CA fields stay unchanged).
        updateDAFields(root, currentItem, n);
      }
      $$("[data-view-asset]", strip).forEach(b => b.addEventListener("click", () => switchAsset(+b.dataset.viewAsset)));

      // Scalable gallery: "+N more" reveals the hidden thumbnails.
      const moreBtn = $("[data-gallery-more]", strip);
      if (moreBtn) moreBtn.addEventListener("click", () => {
        $$(".asset-thumb.is-hidden", strip).forEach(t => t.classList.remove("is-hidden"));
        moreBtn.remove();
      });

      switchAsset(1); // start on the first asset
    }

    // Full screen
    const full = $("[data-vfull]", root);
    if (full) full.addEventListener("click", () => {
      const fig = stage.closest(".viewer");
      if (!document.fullscreenElement && fig.requestFullscreen) fig.requestFullscreen().catch(()=>{});
      else if (document.exitFullscreen) document.exitFullscreen().catch(()=>{});
    });
  }

  function copyText(text, msg) {
    if (navigator.clipboard) navigator.clipboard.writeText(text).then(() => announce(msg)).catch(()=>announce(msg));
    else announce(msg);
  }

  /* =========================================================================
     6i. CONTACT COLLECTIONS TEAM
     ===================================================================== */

  // v0.6 — one contact card for a collection (email address or external form).
  function contactCardHTML(name) {
    const c = contactFor(name);
    const label = collLabel(name);
    if (!c) return "";
    if (c.kind === "form") {
      return `
        <div class="contact-card">
          <strong>${esc(label)}</strong>
          <span class="contact-method muted small">Access Request Form · External Smartsheet form</span>
          <a class="btn btn--primary btn--sm" href="${esc(c.formUrl)}" target="_blank" rel="noopener" data-contact-form="${esc(name)}">Open Form ${icon("external")}</a>
        </div>`;
    }
    // email
    const tbd = !c.email || c.email === "TBD";
    return `
      <div class="contact-card">
        <strong>${esc(label)}</strong>
        <span class="contact-method muted small">Email</span>
        ${tbd
          ? `<span class="contact-email muted">TBD</span><span class="muted small">Email address to be confirmed.</span>`
          : `<a class="contact-email" href="mailto:${esc(c.email)}">${esc(c.email)}</a>`}
      </div>`;
  }

  function renderContact() {
    $("#view-contact").innerHTML = `
      <div class="container section">
        <nav class="breadcrumb" aria-label="Breadcrumb">${homeCrumb()} › <span>Contact Collections Team</span></nav>
        <h1>Contact Collections Team</h1>
        <p class="muted">Contact the team that cares for each collection directly. Choose the collection you're interested in below to find its contact method — an email address or an external Access Request Form.</p>

        <div class="layout-with-sidebar-right">
          <div>
            ${CONTACT_GROUPS.map(g => `
              <section class="contact-group">
                <h2 class="contact-group-head">${esc(g.area)}${g.note ? ` <span class="muted small">${esc(g.note)}</span>` : ""}</h2>
                <div class="card-grid card-grid--2">
                  ${g.collections.map(contactCardHTML).join("")}
                </div>
              </section>`).join("")}

            <h2>What to expect</h2>
            <ol class="steps">
              <li><strong>Contact the collection</strong><span>Email the relevant collection team, or open its external Access Request Form, using the details above.</span></li>
              <li><strong>Team review</strong><span>A member of the collection team will review your enquiry. Complex requests, or those requiring consultation with a curator, may take additional time.</span></li>
              <li><strong>Response within 5 business days</strong><span>Teams aim to respond to enquiries within 5 business days, with an answer or a request for further information.</span></li>
            </ol>
          </div>

          <aside class="contact-side">
            <div class="side-card">
              <h2 class="side-title">Related Help</h2>
              <a class="related-row" href="#/help/rights-licensing">Rights &amp; Licensing</a>
              <a class="related-row" href="#/help/access-restrictions">Access Restrictions Explained</a>
              <a class="related-row" href="#/help/citing-collections">Citing Collections</a>
              <a class="related-row" href="#/help/faqs">FAQs</a>
            </div>
          </aside>
        </div>
      </div>`;
  }

  /* =========================================================================
     6j. CHANGE LOG — "What's changed 15 June"
     ===================================================================== */

  function renderChangelog() {
    // Timestamped refinements made after the initial v0.3 pass, newest first.
    const timeline = [
      ["07 July 2026 · v0.6", "Contact Collections", "Replaced the single “Submit a Request” form with collection-specific contact methods, grouped by owning area (MDHS · Vernon Collections, Museums & Collections). Each collection now shows its own route: an email address (Medical History Museum & Henry Forman Atkinson Dental Museum → mhm.info@unimelb.edu.au; Harry Brookes Allen Museum → MDHS-museum@unimelb.edu.au) or an external Smartsheet Access Request Form (University Art Collection, Grainger Museum). The generic request form no longer appears anywhere."],
      ["07 July 2026 · v0.6", "Object Records", "The “Contact Collection” button on an object now routes to the collection that owns it. A confirmation modal names the collection and warns the user they are leaving CCS, then Continue opens Outlook (mailto, pre-filled with the item title and ID) for email collections, or the external Access Request Form for Smartsheet collections. Cancel closes the modal. The Contact Collections page is retained in navigation and help pathways."],
      ["07 July 2026 · v0.6", "Faceted Search", "Removed the Classification facet entirely (heading, search, Browse All, values and counts). Renamed the “Object” facet group to “Object Classification”. No other facets, values, styling or interactions changed."],
      ["02 July 2026 · v0.5", "Faceted Search", "Restructured the faceted search panel into the revised metadata / discovery model: seven grouped facet sets (Collection Details, Creator, Object, Subject / Topic, Description, Copyright & Advisory, Access) covering 23 facets. Group headings organise the panel while keeping the existing black-and-white styling, spacing and interaction patterns unchanged. To keep the larger panel scannable, the Collection Details and Object groups are expanded by default and the remaining groups start collapsed; any facet with an active selection stays expanded."],
      ["02 July 2026 · v0.5", "Faceted Search", "Added the new facet controls: Checkbox List facets (multi-select with live counts), Search + Browse facets (a search-within box plus the Browse All modal for the full value list), and Date Range facets (From Year / To Year) — including three date ranges: Production Date, Creator Date of Birth and Creator Date of Death."],
      ["02 July 2026 · v0.5", "Faceted Search", "New facets added: Named Collections, Classification, Creator Name, Nationality, Era / Period / Century, Place of Production, Subject Terms, Subject Agent, Subject Location, Subject Event, Physical Description / Material Technique, Language, Region, Licence Type, Film & Gaming Classification, Object Access Condition, Digital Asset Access Condition and Digital Asset Format Type. All keep dynamic drill-down, hide-zero-count, multi-select and active-filter chips. (Dev note: metadata not yet in the sample set is demo-derived deterministically and awaits mapping to real Solr fields; Object Type is shown once, in the Object group, to keep faceting coherent.)"],
      ["20 June 2026 · v4.3", "Item Records", "Added a content Classification (G / PG / M / MA15+ / R18+) shown prominently beneath the item title and in the metadata summary, visible for every asset type without opening the metadata."],
      ["20 June 2026 · v4.3", "Faceted Search", "Made facets dynamic (Solr-style drill-down): facet counts now update on the current result set and zero-count values are hidden, so users only see filter options that contain matching records. Selected values stay visible so they can be removed."],
      ["20 June 2026 · v4.3", "Faceted Search", "Added a Browse All modal for facets with many values — a searchable, multi-select list of all values with counts and Apply / Cancel, opening from a “Browse All →” link in the facet panel."],
      ["19 June 2026 · v4.2", "Faceted Search", "Simplified the faceted search to five facets in order: Collection, Date Range, Object Type, Digital Format, Use. Collection is now alphabetical with friendly labels (Grainger Museum, …). Date Range is newest-first (2020–Present → Pre-1949). Object Type and Digital Format values were replaced per the MVP set, and a new Use facet (Download Available / View Only) acts as a usage/access filter. Removed the Creator, Place, Material and Themes facets entirely (facets are filters, not a second search engine)."],
      ["19 June 2026 · v4.1", "Search", "Added a reliable clear (X) button in the search field (replacing the inconsistent native one). It appears whenever a query or any filter is active and resets the whole session — query, filters, tags, pagination and sort — returning to a fresh search state, even when no query text is present."],
      ["19 June 2026 · v4.1", "Homepage", "Added the Cultural Commons introductory paragraph directly beneath the hero search bar."],
      ["19 June 2026 · v4.1", "Collections", "Replaced the About This Collection copy for all six collections with the supplied text; renamed the Grainger collection to “Grainger Museum Collection”."],
      ["19 June 2026 · v4.1", "Collections & Search", "Removed the “Available” availability icon from collection pages and removed download-related labels (Available / Available to download / Download unavailable) from result cards."],
      ["19 June 2026 · v4.1", "Search & Collections", "Moved the select checkbox and access-status indicators off the collection imagery and into the metadata area below each card, keeping the image as a clean hero element."],
      ["19 June 2026 · v4", "Item Records", "Removed all download UI for 2026 — Download button, badges, captions and the unavailable pop-up are gone (dev note: future DAM toggle will reveal a Download button when an item is downloadable)."],
      ["19 June 2026 · v4", "Item Records", "Replaced “Access: Available” with a conditional “On Display: <venue>” field, shown only when the metadata exists (never Unknown / N/A). Added a generic “Need further access or information? Contact the relevant collection” panel."],
      ["19 June 2026 · v4", "Item Records", "Reworked the image series into a scalable gallery — shows a row of thumbnails with a “+N more” control so 20+ images no longer overwhelm the page. Added a dev note on future cross-collection related-items logic."],
      ["19 June 2026 · v4", "Citations", "Removed Turabian; kept Harvard, APA, MLA and Chicago. Added a dev note to validate final styles with participating faculties."],
      ["19 June 2026 · v4", "Search", "Fixed the filter bug — applying a facet no longer jumps the page to the top; scroll position is preserved. Recent Searches now expire after 3 days with helper text noting they are temporarily stored on this device. Added a dev note on default ranking (Relevance)."],
      ["19 June 2026 · v4", "Search", "Moved the Format facet to the bottom and renamed it Digital Format, adding a “Digital assets only” option. Added a dev note on dynamic facet narrowing."],
      ["19 June 2026 · v4", "Homepage", "Simplified the Acknowledgement of Country modal to a single Continue button with lighter wording (no checkbox or separate submit). Removed the Collection Types quick fact. Removed the Featured Items section entirely (future enhancement) and its orphaned stars/references."],
      ["19 June 2026 · v4", "Collections", "Added a dev note: collection ordering is a future governance decision once more collections are onboarded."],
      ["16 June 2026 · 11:45", "Item Records", "Increased the demo digital-asset series to 20 assets (was 5) so up to 20 can be viewed and selected; the thumbnail strip now scrolls if it grows tall."],
      ["16 June 2026 · 11:20", "Contact Collections", "Submit a Request form: added an optional Attachment field; expanded the Item Reference(s) help to explain it is a record's persistent ID, found on any object page via the Copy ID button; moved the six request-type descriptors below the form into a Request types explained section; and made the sidebar Request Types list link to those descriptors."],
      ["16 June 2026 · 11:00", "Search", "Added a Format facet (Image, PDF, Audio / Video) directly beneath Object Type, and removed Audio / Video from Object Type — object type now describes what the thing is, format describes the digital surrogate."],
      ["16 June 2026 · 10:40", "Search", "Made the Recent Searches panel collapsible, auto-collapsing once it spans more than five day-groups so it stays compact; added a count badge."],
      ["16 June 2026 · 10:20", "Search", "Restructured the filter panel: Collection, Creator (text), Date Range, Place (text), Object Type, Material and Themes. Every facet is now collapsible with a larger, active chevron. Added matching sample records so the seeded Recent Searches all return results."],
      ["16 June 2026 · 09:30", "Item Records", "Added a Large Digital Viewer for digitised multi-page documents (sample: a 126-page University Calendar) — page thumbnails, reading pane, page count, zoom, search-within-document, fullscreen and Open Original. Styled as a library/archive reader; download stays disabled."],
      ["16 June 2026 · 09:15", "Item Records", "Added MLA 9 and Turabian to the citation style selector (now Harvard, APA 7, Chicago, MLA 9, Turabian) with dynamic update and Copy Citation."],
      ["16 June 2026 · 09:00", "Search", "Added persistent Recent Searches beneath the search bar — stored in the browser for 20 days (max 30, auto-expiring), grouped by Today / Yesterday / N Days Ago, with click-to-rerun and Clear History. No login required."],
      ["15 June 2026 · 08:32", "Item Records", "Clicking any Download control now opens a pop-up explaining the feature is unavailable for the 2026 MVP. The caption sits directly beneath the Download button."],
      ["15 June 2026 · 08:25", "Item Records", "Disabled all download actions for the MVP (no download capability yet) and added a “Download feature unavailable for the MVP” caption beneath them. Added a caption under the Persistent Identifier explaining Copy ID vs Permalink and that the PID resolves to this record page."],
      ["15 June 2026 · 08:00", "Collections & Search", "Each collection is now fully backed by real artefact records matching its 50–80 count, flowing through cards, item pages and the faceted search."],
      ["15 June 2026 · 07:40", "Collections", "Increased each collection's holdings to roughly 50–80 artefacts, randomised per collection."],
      ["15 June 2026 · 07:29", "Collections", "Removed the duplicate “Browse all items” action on collection pages — “Search this collection” remains, as both did the same thing."],
      ["15 June 2026 · 07:10", "Collections", "Renamed the Sub-Collections tab to Named Collections, and merged the Collection Snapshot into the Collection details panel on the Overview tab."],
      ["15 June 2026 · 06:40", "Homepage", "Restored the Featured Items section between Browse Collections and Help & Guidance as a placeholder, noting that its inclusion in the 2026 release is still under consideration."],
      ["15 June 2026 · 06:40", "Item Records", "Copy Citation now shows a confirmation directly on the button (✔ Citation copied)."],
      ["15 June 2026 · 06:05", "Search", "Pinned the six highlighted collections as the canonical Collection facet, and added sample records to Medical History, Dental and Anatomy & Pathology so each returns results."],
      ["15 June 2026 · 05:30", "Homepage & Search", "Home Browse Collections now shows only the six highlighted collection cards; the All Collections scope dropdowns list only those six; nudged result-card status badges clear of the selection checkbox."]
    ];

    const groups = [
      ["Search", [
        "Removed the Culture / Origin and Digital Access facets to keep discovery metadata-first.",
        "Renamed the Item Type facet to Object Type.",
        "Added a new Format facet (Image, PDF, Audio, AV).",
        "Removed the Keyword / Exact Phrase / Boolean search modes in favour of a single search box with example helper text. Advanced search is noted as a future enhancement.",
        "Added multi-select on results: checkboxes on each result card, a selection action bar, View Selected (n) to show only chosen items, and Clear Selection."
      ]],
      ["Collections", [
        "Simplified Browse Collections to a flat grid of collection cards — removed browse by type, theme and institution and the extra grouping pages.",
        "Browse now leads with five collections: Medical History Museum, Henry Forman Atkinson Dental Museum, Harry Brookes Allen Museum of Anatomy and Pathology, Grainger Museum and University Art Collection.",
        "Collection landing pages now prioritise an expanded About this Collection; Collection Details is demoted to a compact, collapsible summary.",
        "Collection Snapshot reduced to Total items, Holding institution and Physical location.",
        "Removed Share Collection and Cite Collection — these actions are for records, not collections.",
        "Removed repeated cultural acknowledgement and rights & access blocks from the Overview tab."
      ]],
      ["Item Records", [
        "Implemented three clear asset states: Downloadable (download button, options and viewer), View Only (viewer only, no download, labelled View only) and No Digital Asset.",
        "No-asset records no longer show a large empty image placeholder — they show a short text panel while keeping the full metadata record intact.",
        "Share now opens a small Share this item modal with a copy-link action (Link copied) instead of opening email.",
        "Simplified item citations to a single style selector (Harvard, APA, Chicago) with one Copy Citation action.",
        "Replaced the Restricted label with Request to view across badges, statuses and panels."
      ]],
      ["Contact Collections", [
        "Renamed Open Request Form to Submit Request and removed duplicate calls to action.",
        "Item Reference is now Item Reference(s) and accepts several identifiers separated by commas, with an example.",
        "Removed the redundant Need Further Information section and the cultural sensitivity message."
      ]],
      ["Homepage", [
        "The secondary cultural acknowledgement banner no longer appears once the entry Acknowledgement of Country has been accepted.",
        "Featured Items temporarily disabled (component preserved in code as a future enhancement)."
      ]],
      ["Accessibility", [
        "Redesigned List View to be metadata-first: small thumbnail (~15% of the row) with title, collection, creator, date, status badge and save action taking the remaining width.",
        "Added an under-review information banner to the Indigenous Data page noting that final content requires endorsement by the University's Indigenous Advisory Group."
      ]],
      ["Future Enhancements", [
        "Advanced / Boolean search.",
        "Featured Items curation.",
        "Final Indigenous Data content, pending Indigenous Advisory Group endorsement."
      ]]
    ];

    $("#view-changelog").innerHTML = `
      <div class="page-hero">
        <div class="container">
          <nav class="breadcrumb" aria-label="Breadcrumb">${homeCrumb()} › <span>What's changed</span></nav>
          <h1>What's changed — Version 4 (latest: v0.6 Contact & Faceted Search)</h1>
          <p class="page-hero-sub">Cultural Collections prototype. A summary of the refinements and enhancements following stakeholder review, technical estimation workshops and the Product Owner reviews. The latest update (v0.6) moves Contact Collections to collection-specific contact methods, routes the object “Contact Collection” button to the owning collection, removes the Classification facet and renames the Object facet group; everything else in the prototype is unchanged.</p>
        </div>
      </div>

      <div class="container narrow section">
        <section class="changelog-group">
          <h2>Latest refinements (timestamped)</h2>
          <ol class="changelog-timeline">
            ${timeline.map(([when, area, text]) => `
              <li>
                <span class="changelog-time">${esc(when)}</span>
                <span class="changelog-area">${esc(area)}</span>
                <span class="changelog-text">${esc(text)}</span>
              </li>`).join("")}
          </ol>
        </section>

        <h2 class="changelog-section-head">Full v0.3 summary by area</h2>
        ${groups.map(([title, items]) => `
          <section class="changelog-group">
            <h2>${esc(title)}</h2>
            <ul class="changelog-list">
              ${items.map(t => `<li>${esc(t)}</li>`).join("")}
            </ul>
          </section>`).join("")}
        <p class="muted small">This is a prototype for user testing and stakeholder feedback. Sample data is illustrative only.</p>
      </div>`;
  }

  /* =========================================================================
     7. MODALS
     ===================================================================== */

  function openModal(html, onMount) {
    const host = $("#modal-host");
    host.hidden = false;
    host.innerHTML = `<div class="modal-overlay" data-overlay></div><div class="modal" role="dialog" aria-modal="true">${html}</div>`;
    const closeEls = $$("[data-close], [data-overlay]", host);
    closeEls.forEach(c => c.addEventListener("click", closeModal));
    document.addEventListener("keydown", escClose);
    if (onMount) onMount(host);
    // focus first focusable
    const f = host.querySelector("button, [href], input, select, textarea");
    if (f) f.focus();
  }
  function closeModal() {
    const host = $("#modal-host");
    host.hidden = true; host.innerHTML = "";
    document.removeEventListener("keydown", escClose);
  }
  function escClose(e) { if (e.key === "Escape") closeModal(); }

  /* ---- Acknowledgement modal (first visit) ----
     v4 — simplified per PO review: no checkbox, no separate submit. The user
     reads the acknowledgement and clicks one Continue button. Lighter wording. */
  function maybeShowAck() {
    if (read(LS.ACK, false)) return;
    openModal(`
      <div class="modal-head">
        ${logoMark()} <div><strong>CULTURAL COLLECTIONS</strong><span class="muted small">University of Melbourne</span></div>
      </div>
      <h2>Acknowledgement of Country</h2>
      <blockquote class="ack-quote">
        <p>The University of Melbourne respectfully acknowledges the Traditional Custodians throughout Australia whose cultural heritage, knowledge, histories and collections we care for, and the Traditional Custodians of the lands on which our campuses, collections and communities are situated.</p>
        <p>We recognise their continuing connections to Country, culture and community, and pay our respects to Elders past and present.</p>
      </blockquote>
      <p class="muted small">Some records may contain cultural material, or images, voices or names of people who have passed away. <a href="#/indigenous" data-close>Learn more</a></p>
      <div class="modal-foot">
        <button class="btn btn--primary" id="ack-continue">Continue</button>
      </div>`,
      host => {
        $("#ack-continue", host).addEventListener("click", () => { write(LS.ACK, true); closeModal(); });
      });
  }

  /* v4 — download-unavailable modal removed (no download messaging in 2026). */

  /* ---- A4: Browse All facet values modal ---- */
  function openBrowseAllModal(field, params) {
    const base = queryItems(params.get("q") || "", params.get("mode") || "keyword");
    const facets = computeFacets(base, params);
    const entries = facets[field] || [];
    const active = new Set(params.getAll("f_" + field));
    const facetLabel = FACETS[field].label;

    const rowsHTML = entries.map(([val, n, label]) => `
      <label class="browseall-row" data-search="${esc((label || val).toLowerCase())}">
        <input type="checkbox" data-ba-value="${esc(val)}" ${active.has(val) ? "checked" : ""} />
        <span class="browseall-name">${esc(label || val)}</span>
        <span class="browseall-count">${n}</span>
      </label>`).join("");

    openModal(`
      <button class="modal-x" data-close aria-label="Close">${icon("x")}</button>
      <h2>Browse All ${esc(facetLabel)}</h2>
      <div class="facet-text browseall-search">
        <span aria-hidden="true">${icon("search")}</span>
        <label class="visually-hidden" for="browseall-q">Search ${esc(facetLabel)}</label>
        <input type="search" id="browseall-q" placeholder="Search ${esc(facetLabel)}…" autocomplete="off" />
      </div>
      <div class="browseall-list" id="browseall-list">${rowsHTML || `<p class="muted small">No values available.</p>`}</div>
      <p class="browseall-empty muted small" id="browseall-empty" hidden>No matching values.</p>
      <div class="modal-foot">
        <button class="btn btn--ghost" data-close>Cancel</button>
        <button class="btn btn--primary" id="browseall-apply">Apply Filters</button>
      </div>`,
      host => {
        // Live filter the value list as the user types.
        const q = $("#browseall-q", host), list = $("#browseall-list", host), empty = $("#browseall-empty", host);
        q.addEventListener("input", () => {
          const term = q.value.trim().toLowerCase();
          let visible = 0;
          $$(".browseall-row", list).forEach(r => {
            const match = !term || r.dataset.search.includes(term);
            r.hidden = !match; if (match) visible++;
          });
          empty.hidden = visible !== 0;
        });
        // Apply selected values to the search, then close.
        $("#browseall-apply", host).addEventListener("click", () => {
          const chosen = $$("[data-ba-value]", host).filter(cb => cb.checked).map(cb => cb.dataset.baValue);
          const p = new URLSearchParams(params.toString());
          p.delete("f_" + field);
          chosen.forEach(v => p.append("f_" + field, v));
          p.set("page", "1");
          closeModal();
          go("#/search?" + p.toString());
        });
      });
  }

  /* ---- Share modal (copy link — does NOT open email) ---- */
  function openShareModal(item) {
    const url = `https://collections.unimelb.edu.au/#/item/${item.id}`;
    openModal(`
      <button class="modal-x" data-close aria-label="Close">${icon("x")}</button>
      <h2>Share this item</h2>
      <p class="muted small">${esc(item.title)}</p>
      <label class="form-label" for="share-url">Item link
        <input type="text" id="share-url" value="${esc(url)}" readonly />
      </label>
      <div class="modal-foot">
        <button class="btn btn--ghost" data-close>Close</button>
        <button class="btn btn--primary" id="share-copy">${icon("copy")} Copy link</button>
      </div>`,
      host => {
        const input = $("#share-url", host);
        input.addEventListener("focus", () => input.select());
        $("#share-copy", host).addEventListener("click", () => {
          input.select();
          copyText(input.value, "Link copied");
          const btn = $("#share-copy", host);
          btn.innerHTML = `${icon("check")} Link copied`;
          setTimeout(() => { btn.innerHTML = `${icon("copy")} Copy link`; }, 1500);
        });
      });
  }

  /* ---- Leave-site (View Full Record) modal ---- */
  /** Warns the user they are about to leave Cultural Collections for the
   *  source collection's own website, where the fuller record lives. */
  function openLeaveSiteModal(item) {
    // Plausible source-system URL for the prototype (no real navigation).
    const sourceUrl = `https://${item.collectionSlug.replace(/-/g, "")}.unimelb.edu.au/record/${encodeURIComponent(item.id)}`;
    openModal(`
      <button class="modal-x" data-close aria-label="Close">${icon("x")}</button>
      <h2>You are leaving Cultural Collections</h2>
      <p>You are about to leave Cultural Collections and move to the original collection's website, where a more detailed record for this item is held.</p>
      <div class="leave-target">
        <span class="leave-icon" aria-hidden="true">${icon("external")}</span>
        <div>
          <strong>${esc(item.collection)}</strong>
          <span class="muted small">${esc(item.holding)}</span>
          <code class="leave-url">${esc(sourceUrl)}</code>
        </div>
      </div>
      <p class="muted small">The source website may have different terms of use, access conditions and privacy practices to Cultural Collections.</p>
      <div class="modal-foot">
        <button class="btn btn--ghost" data-close>Stay here</button>
        <button class="btn btn--primary" id="leave-go">Continue to source website ${icon("external")}</button>
      </div>`,
      host => {
        $("#leave-go", host).addEventListener("click", () => {
          announce("Prototype only — the source collection website would open in a new tab in the live service.");
          closeModal();
        });
      });
  }

  /* ---- v5.2: Contact the collection (sidebar) — open Outlook via mailto ----
     To = the record's collection email; Subject = the record's persistent
     identifier (URL-encoded); body left blank (no cc/bcc/greeting/signature).
     If the collection has no configured email, fall back to the Contact
     Collections page rather than opening a misleading pre-addressed message. */
  // v5.3.1 — Resolve a contact email for a record's collection. Uses the real
  // mapped address where one exists; otherwise a plausible per-collection
  // prototype address (<slug>@unimelb.edu.au) so the record-page contact CTA can
  // open an Outlook compose for records in any collection, not just the few with
  // a hand-mapped mailbox. Returns null only if no collection can be resolved.
  function collectionEmail(i) {
    const c = contactFor(i.collection);
    if (c && c.kind === "email" && c.email && c.email !== "TBD") return c.email;
    if (i.collectionSlug) return `${i.collectionSlug}@unimelb.edu.au`;
    return null;
  }

  function contactCollectionByEmail(i) {
    const email = collectionEmail(i);
    // Only records with an available collection email open a compose window;
    // otherwise fall back to the Contact Collections page (never a misleading
    // or malformed message).
    if (!email || !i.id) { go("#/contact"); return; }
    // v5.3 — primary: Outlook Web compose deep link (To + Subject only, no body),
    // opened in a new tab so the user stays on the record. mailto is a fallback
    // only if the popup is blocked.
    const url = `https://outlook.office.com/mail/deeplink/compose?to=${encodeURIComponent(email)}&subject=${encodeURIComponent(i.id)}`;
    const win = window.open(url, "_blank", "noopener,noreferrer");
    if (!win) window.location.href = `mailto:${email}?subject=${encodeURIComponent(i.id)}`;
  }

  /* ---- v0.6: Contact Collection routing modal ----
     Determines which collection owns the object, then confirms before opening
     either Outlook (mailto) or the collection's external Smartsheet form. */
  function openContactCollectionModal(item) {
    const name = item.collection;
    const c = contactFor(name);
    const label = collLabel(name);

    // Fallback: unknown collection → send the user to the Contact Collections page.
    if (!c) {
      openModal(`
        <button class="modal-x" data-close aria-label="Close">${icon("x")}</button>
        <h2>Contact Collection</h2>
        <p>Find the contact details for this collection on the Contact Collections page.</p>
        <div class="contact-route"><span class="leave-icon" aria-hidden="true">${icon("mail")}</span><div><strong>${esc(label)}</strong></div></div>
        <div class="modal-foot">
          <button class="btn btn--ghost" data-close>Cancel</button>
          <a class="btn btn--primary" href="#/contact" data-close>Go to Contact Collections</a>
        </div>`);
      return;
    }

    const isForm = c.kind === "form";
    const tbd = !isForm && (!c.email || c.email === "TBD");
    const lead = isForm
      ? "You are about to leave CCS and open an external Access Request Form."
      : "You are about to leave CCS and open Outlook to contact the collection team.";
    const detail = isForm
      ? `<span class="muted small">External Smartsheet Access Request Form</span>`
      : (tbd ? `<span class="muted small">Email address to be confirmed</span>`
             : `<a class="contact-email" href="mailto:${esc(c.email)}">${esc(c.email)}</a>`);

    openModal(`
      <button class="modal-x" data-close aria-label="Close">${icon("x")}</button>
      <h2>Contact Collection</h2>
      <p>${esc(lead)}</p>
      <div class="contact-route">
        <span class="leave-icon" aria-hidden="true">${isForm ? `${icon("external")}` : `${icon("mail")}`}</span>
        <div>
          <span class="muted small">Collection</span>
          <strong>${esc(label)}</strong>
          ${detail}
        </div>
      </div>
      <div class="modal-foot">
        <button class="btn btn--ghost" data-close>Cancel</button>
        ${tbd
          ? `<button class="btn btn--primary" disabled title="Email address to be confirmed">Continue</button>`
          : `<button class="btn btn--primary" id="contact-continue">Continue</button>`}
      </div>`,
      host => {
        const go = $("#contact-continue", host);
        if (!go) return;
        go.addEventListener("click", () => {
          if (isForm) window.open(c.formUrl, "_blank", "noopener");
          else window.location.href = "mailto:" + c.email + "?subject=" + encodeURIComponent("Enquiry: " + item.title + " (" + item.id + ")");
          closeModal();
        });
      });
  }

  /* ---- Download confirmation modal ---- */
  /** assets: array of { n, label, tiff, jpeg }; format: "TIFF" | "JPEG". */
  function openDownloadModal(item, assets, format) {
    format = format || "TIFF";
    const key = format.toLowerCase();
    const total = assets.reduce((s, a) => s + parseFloat(a[key]), 0).toFixed(1);
    const many = assets.length > 1;
    const cultural = item.rights === "Cultural conditions apply";

    openModal(`
      <button class="modal-x" data-close aria-label="Close">${icon("x")}</button>
      <h2>Confirm download</h2>
      <p class="muted small">${esc(item.title)}</p>
      <p>You are about to download ${many ? `<strong>${assets.length} assets</strong>` : `<strong>1 asset</strong>`} as <strong>${esc(format)}</strong> (about <strong>${total} MB</strong> in total).</p>
      ${many ? `<ul class="download-list">
        ${assets.map(a => `<li><span>${esc(a.label)}</span><span class="muted small">${format} · ${a[key]} MB</span></li>`).join("")}
      </ul>` : `<div class="download-single"><span class="placeholder mini" aria-hidden="true"><span class="ph-icon">${icon(mediaGlyph(item.type))}</span></span><div><strong>${esc(assetSeries(item)[0].label)}</strong><span class="muted small">${format} · ${assets[0][key]} MB</span></div></div>`}
      <div class="note-soft small">${cultural ? `${icon("warning")} This material carries cultural conditions. Please engage respectfully and in accordance with the University's cultural protocols. Commercial use requires prior consent.` : `${icon("info")} Files are provided for personal, research and educational use. Please check the item's rights statement before reuse and acknowledge the source.`}</div>
      <div class="modal-foot">
        <button class="btn btn--ghost" data-close>Cancel</button>
        <button class="btn btn--primary" id="download-go">${icon("download")} Download ${esc(format)}${many ? ` (${assets.length})` : ""}</button>
      </div>`,
      host => {
        $("#download-go", host).addEventListener("click", () => {
          announce(`Prototype only — ${assets.length} ${format} file${many ? "s" : ""} (~${total} MB) would download in the live service.`);
          closeModal();
        });
      });
  }

  /* =========================================================================
     8. BOOT
     ===================================================================== */

  function init() {
    renderFooter();
    window.addEventListener("hashchange", router);
    router();
    maybeShowAck();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();

})();
