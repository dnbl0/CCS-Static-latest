/**
 * Cultural Collections Search (CCS) - Blacklight API Adapter
 * Connects the CCS search interface to the Blacklight JSON API endpoint (/catalog.json)
 * with transparent fallback to local mock data (collection-data.js).
 */
(function(window) {
  'use strict';

  // Same-origin, free stand-in served by api/catalog.js. Use ?endpoint=<url> (or CCS_CONFIG.apiEndpoint) to point at a real Blacklight server, e.g. https://ead-ccs-test.app.unimelb.edu.au/catalog.json
  const DEFAULT_ENDPOINT = '/catalog.json';
  const STORAGE_KEY = 'ccs_api_mode'; // 'mock' | 'live'

  const BlacklightAdapter = {
    // Determine active mode from URL param, localStorage, or default
    getMode() {
      if (typeof window === 'undefined' || !window.location) return 'mock';
      const params = new URLSearchParams(window.location.search || '');
      const urlMode = params.get('api');
      if (urlMode === 'live' || urlMode === 'mock') {
        try { localStorage.setItem(STORAGE_KEY, urlMode); } catch (e) {}
        return urlMode;
      }
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === 'live' || stored === 'mock') return stored;
      } catch (e) {}
      return window.CCS_CONFIG?.apiMode || 'mock';
    },

    isLive() {
      return this.getMode() === 'live';
    },

    setMode(mode) {
      if (typeof window === 'undefined' || !window.location) return;
      try { localStorage.setItem(STORAGE_KEY, mode); } catch (e) {}
      const url = new URL(window.location.href);
      url.searchParams.set('api', mode);
      window.location.href = url.toString();
    },

    getEndpoint() {
      if (typeof window === 'undefined' || !window.location) return DEFAULT_ENDPOINT;
      const params = new URLSearchParams(window.location.search || '');
      return params.get('endpoint') || window.CCS_CONFIG?.apiEndpoint || DEFAULT_ENDPOINT;
    },

    // Convert CCS filter state into Blacklight URL query parameters
    toBlacklightParams(f, page = 1, perPage = 20) {
      const params = new URLSearchParams();
      params.set('format', 'json');
      if (f && f.q) params.set('q', f.q);
      if (page > 1) params.set('page', String(page));
      if (perPage) params.set('per_page', String(perPage));

      // Sort mapping
      if (f && f.sort === 'az') params.set('sort', 'title_ssort asc, pub_date_isim desc');
      else if (f && f.sort === 'new') params.set('sort', 'pub_date_isim desc, title_ssort asc');
      else if (f && f.sort === 'old') params.set('sort', 'pub_date_isim asc, title_ssort asc');

      // Facet mapping
      if (f && f.collection && f.collection.length) {
        f.collection.forEach(c => params.append('f[collection_name_ssim][]', c));
      }
      if (f && f.type && f.type.length) {
        f.type.forEach(t => params.append('f[format_ssim][]', t));
      }
      if (f && f.subject && f.subject.length) {
        f.subject.forEach(s => params.append('f[subject_ssim][]', s));
      }
      if (f && f.culture && f.culture.length) {
        f.culture.forEach(c => params.append('f[culture_ssim][]', c));
      }
      if (f && f.place && f.place.length) {
        f.place.forEach(p => params.append('f[place_ssim][]', p));
      }
      if (f && (f.yFrom != null || f.yTo != null)) {
        if (f.yFrom != null) params.set('range[pub_date_isim][begin]', String(f.yFrom));
        if (f.yTo != null) params.set('range[pub_date_isim][end]', String(f.yTo));
      }
      return params;
    },

    // Transform Blacklight JSON document to CCS item shape
    transformDocument(doc) {
      const str = val => Array.isArray(val) ? val[0] : (val || '');
      const num = val => {
        const parsed = parseInt(str(val), 10);
        return isNaN(parsed) ? null : parsed;
      };

      return {
        id: doc.id || doc._id || Math.random().toString(36).substring(7),
        title: str(doc.title_tsim || doc.title_display || doc.title || 'Untitled Record'),
        img: str(doc.thumbnail_url_ssim || doc.media_url_ssim || doc.img || ''),
        collection: str(doc.collection_name_ssim || doc.collection || 'Cultural Collections'),
        objectType: str(doc.format_ssim || doc.objectType || 'Cultural Object'),
        creator: str(doc.creator_tsim || doc.author_tsim || doc.creator || 'Maker unknown'),
        date: str(doc.date_display_ssim || doc.pub_date_isim || doc.date || 'Undated'),
        dateStart: num(doc.pub_date_isim || doc.dateStart),
        dateEnd: num(doc.pub_date_isim || doc.dateEnd),
        licence: str(doc.licence_ssim || doc.licence || 'Rights Reserved'),
        access: str(doc.access_ssim || doc.access || 'By Appointment'),
        material: str(doc.material_ssim || doc.material || ''),
        subject: str(doc.subject_ssim || doc.subject || ''),
        place: str(doc.place_ssim || doc.place || ''),
        accession: str(doc.accession_ssim || doc.accession || ''),
        raw: doc
      };
    },

    // Execute query with live fetch and automatic fallback to mock ITEMS
    async query(f, page = 1, perPage = 20) {
      if (!this.isLive()) {
        return { source: 'mock', success: true };
      }

      const endpoint = this.getEndpoint();
      const params = this.toBlacklightParams(f, page, perPage);
      const url = `${endpoint}?${params.toString()}`;

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout

        const response = await fetch(url, {
          signal: controller.signal,
          headers: { 'Accept': 'application/json' },
          mode: 'cors'
        });
        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status} from Blacklight API`);
        }

        const data = await response.json();
        const docs = data.response?.docs || data.data || [];
        const total = data.response?.numFound ?? docs.length;

        const items = docs.map(d => this.transformDocument(d));
        return {
          source: 'live',
          success: true,
          items,
          total,
          facets: data.facet_counts || null,
          data
        };
      } catch (err) {
        console.warn('[BlacklightAdapter] Live API call failed, falling back to local data:', err.message);
        return {
          source: 'mock_fallback',
          success: false,
          error: err.message,
          endpoint
        };
      }
    },

    // Fetch a single document by ID from Blacklight (/catalog/:id.json)
    async fetchRecord(id) {
      if (!this.isLive() || !id) {
        return { source: 'mock', success: true };
      }

      const endpoint = this.getEndpoint();
      const base = endpoint.replace(/\/catalog(\.json)?$/, '');
      const url = `${base}/catalog/${encodeURIComponent(id)}.json`;

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);

        const response = await fetch(url, {
          signal: controller.signal,
          headers: { 'Accept': 'application/json' },
          mode: 'cors'
        });
        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status} from Blacklight record API`);
        }

        const data = await response.json();
        const doc = data.data?.attributes || data.data || data.document || data.response?.document || data;
        const item = this.transformDocument(doc);
        return {
          source: 'live',
          success: true,
          item,
          data
        };
      } catch (err) {
        console.warn('[BlacklightAdapter] Record fetch failed, falling back to local data:', err.message);
        return {
          source: 'mock_fallback',
          success: false,
          error: err.message
        };
      }
    }
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = BlacklightAdapter;
  }
  if (typeof window !== 'undefined') {
    window.BlacklightAdapter = BlacklightAdapter;
  } else if (typeof global !== 'undefined') {
    global.BlacklightAdapter = BlacklightAdapter;
  }
})(typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : this));
