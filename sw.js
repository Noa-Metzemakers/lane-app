/* LANE 2.4 — network-first documents, offline fallback; safe update flow */
const CACHE = 'lane-shell-v2.4.0';
const APP_SHELL = ['./', './index.html', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png', './icons/favicon-32.png', './branding/lane-banner.png'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(APP_SHELL)));
  // Do not skipWaiting here; the app will notify the user before replacing the UI.
});
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => (k.startsWith('lane-') && k !== CACHE)).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;
  if (request.mode === 'navigate' || url.pathname.endsWith('/index.html')) {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(request, {cache:'no-store'});
        if (fresh.ok) {
          const cache = await caches.open(CACHE);
          await cache.put('./index.html', fresh.clone());
        }
        return fresh;
      } catch (_) {
        return (await caches.match('./index.html')) || Response.error();
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
