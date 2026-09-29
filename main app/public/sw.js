/**
 * Obsidian Studio — Service Worker (PWA offline support)
 *
 * Strategies:
 *  - App navigations:            network-first, fall back to cached shell (offline)
 *  - Vault API reads (GET):      network-first, cache successful reads (offline reading)
 *  - Vault API writes (POST...): always pass through to the network
 *  - Static assets:              stale-while-revalidate (instant + self-updating)
 */

const SHELL_CACHE = 'obsidian-studio-shell-v3';
const RUNTIME_CACHE = 'obsidian-studio-runtime-v3';

const SHELL_ASSETS = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/js/app.js',
  '/js/dataview-engine.js',
  '/js/markdown-engine.js',
  '/js/graph-view.js',
  '/js/vault-apps.js',
  '/styles/obsidian-core.css',
  '/styles/web-colors.css',
  '/styles/web-layout.css',
  '/styles/web-typography.css',
  '/styles/web-components.css',
  '/styles/web-interactive.css',
  '/styles/web-reading-view.css',
  '/styles/language-folders-highlight.css',
  '/styles/vault-theme.css',
  '/styles/apple-toggle.css',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE)
      .then(cache => cache.addAll(SHELL_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== SHELL_CACHE && k !== RUNTIME_CACHE).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const fresh = await fetch(request);
    if (fresh && fresh.ok) cache.put(request, fresh.clone());
    return fresh;
  } catch {
    const cached = await cache.match(request);
    if (cached) return cached;
    throw new Error('offline and not cached');
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(SHELL_CACHE);
  const cached = await cache.match(request);
  const network = fetch(request)
    .then(fresh => {
      if (fresh && fresh.ok) cache.put(request, fresh.clone());
      return fresh;
    })
    .catch(() => cached);
  return cached || network;
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return; // writes go straight to the network

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return; // let CDN fonts/images use HTTP cache

  // App shell navigation
  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request, SHELL_CACHE).catch(() => caches.match('/')));
    return;
  }

  // Vault data: index, note contents, assets/banners — cache for offline reading
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirst(request, RUNTIME_CACHE).catch(() =>
      new Response(JSON.stringify({ error: 'offline' }), { status: 503, headers: { 'Content-Type': 'application/json' } })
    ));
    return;
  }

  // Static assets: serve instantly, refresh in the background
  if (/\.(css|js|mjs|png|jpg|jpeg|webp|svg|ico|woff2?)$/i.test(url.pathname) || url.pathname === '/manifest.webmanifest') {
    event.respondWith(staleWhileRevalidate(request));
  }
});
