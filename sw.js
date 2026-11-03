/* LANE 2.7.0 — fix Safari stale HTML: valid cache.put signature, network-first HTML and config */
const CACHE = 'lane-shell-v2.7.0';
const APP_SHELL = ['./', './index.html', './config.js', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png', './icons/favicon-32.png', './branding/lane-banner.png', './branding/lane-icon-transparent.png'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(APP_SHELL)));
});
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k.startsWith('lane-shell-') && k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;
  const isDocument = request.mode === 'navigate' || url.pathname.endsWith('/index.html');
  const isConfig = url.pathname.endsWith('/config.js');
  if (isDocument || isConfig) {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(request, {cache: 'no-store'});
        if (fresh.ok) {
          const cache = await caches.open(CACHE);
          const key = isConfig ? './config.js' : './index.html';
          await cache.put(key, fresh.clone());
        }
        return fresh;
      } catch (error) {
        const cached = await caches.match(isConfig ? './config.js' : './index.html');
        return cached || Response.error();
      }
    })());
    return;
  }
  event.respondWith((async () => {
    const cached = await caches.match(request);
    if (cached) return cached;
    const response = await fetch(request);
    if (response.ok && url.pathname.startsWith(new URL(self.registration.scope).pathname)) {
      const cache = await caches.open(CACHE);
      await cache.put(request, response.clone());
    }
    return response;
  })());
});
