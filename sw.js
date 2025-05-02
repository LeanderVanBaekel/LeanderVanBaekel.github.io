/* ------------------------------------------------------------------
   Simple PWA service worker – v1
   • precache core files on install
   • network-first for JSON (stale-while-revalidate fallback)
------------------------------------------------------------------ */
const VERSION   = 'v1';
const CORE_ASSETS = [
  '.',                        // index.html
  'manifest.webmanifest',
  'sw.js',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'https://cdn.jsdelivr.net/npm/chart.js'  // external but cacheable
];

// ---------- install ----------
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(VERSION).then(c=>c.addAll(CORE_ASSETS))
  );
  self.skipWaiting();
});

// ---------- activate ----------
self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys=>Promise.all(
      keys.filter(k=>k!==VERSION).map(k=>caches.delete(k))
    ))
  );
  self.clients.claim();
});

// ---------- fetch ----------
self.addEventListener('fetch', evt => {
  const { request } = evt;
  const isJSON = request.url.includes('/data/') && request.url.endsWith('.json');

  if (isJSON) {                      // JSON: network-first, cache fallback
    evt.respondWith(
      fetch(request).then(r=>{
        const copy = r.clone();
        caches.open(VERSION).then(c=>c.put(request, copy));
        return r;
      }).catch(()=>caches.match(request))
    );
    return;
  }

  // Core & static: cache-first
  evt.respondWith(
    caches.match(request).then(hit => hit || fetch(request))
  );
});