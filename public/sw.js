// Enkel service worker för receptbanken.
// Strategi: cache-first för statiska resurser (CSS/JS/bilder/manifest),
// network-first för HTML (så uppdateringar syns direkt), fallback till cache offline.

const CACHE_VERSION = 'recept-v1';
const HTML_CACHE = `${CACHE_VERSION}-html`;
const STATIC_CACHE = `${CACHE_VERSION}-static`;

const PRECACHE_URLS = [
  '/',
  '/alla',
  '/kombinera',
  '/veckoplan',
  '/manifest.json',
  '/icon.svg',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(HTML_CACHE).then((cache) => cache.addAll(PRECACHE_URLS)),
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => !k.startsWith(CACHE_VERSION))
          .map((k) => caches.delete(k)),
      ),
    ),
  );
  self.clients.claim();
});

const isHtmlRequest = (req) =>
  req.method === 'GET' &&
  (req.headers.get('accept')?.includes('text/html') ?? false);

const isStaticAsset = (url) =>
  /\.(css|js|svg|png|jpg|jpeg|webp|woff2?|ico)$/.test(url.pathname) ||
  url.pathname.startsWith('/_astro/');

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  if (isHtmlRequest(req)) {
    event.respondWith(networkFirst(req, HTML_CACHE));
    return;
  }
  if (isStaticAsset(url)) {
    event.respondWith(cacheFirst(req, STATIC_CACHE));
    return;
  }
});

async function networkFirst(req, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const fresh = await fetch(req);
    if (fresh && fresh.status === 200) {
      cache.put(req, fresh.clone());
    }
    return fresh;
  } catch (err) {
    const cached = await cache.match(req);
    if (cached) return cached;
    // Fallback: index
    const fallback = await cache.match('/');
    if (fallback) return fallback;
    throw err;
  }
}

async function cacheFirst(req, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  if (cached) return cached;
  try {
    const fresh = await fetch(req);
    if (fresh && fresh.status === 200) {
      cache.put(req, fresh.clone());
    }
    return fresh;
  } catch (err) {
    if (cached) return cached;
    throw err;
  }
}

// Trim recept-sidor till 50 senaste i HTML-cachen
self.addEventListener('message', async (event) => {
  if (event.data === 'trim-cache') {
    const cache = await caches.open(HTML_CACHE);
    const requests = await cache.keys();
    const receptReqs = requests.filter((r) => new URL(r.url).pathname.startsWith('/recept/'));
    if (receptReqs.length > 50) {
      const taBort = receptReqs.slice(0, receptReqs.length - 50);
      await Promise.all(taBort.map((r) => cache.delete(r)));
    }
  }
});
