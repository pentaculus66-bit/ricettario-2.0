const CACHE_NAME = 'bottega-legno-v3';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME && k !== 'bottega-shared-files').map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Gestione condivisione da Galleria / File Manager Android (Web Share Target)
  if (event.request.method === 'POST' && url.pathname.endsWith('/share-target')) {
    event.respondWith((async () => {
      try {
        const formData = await event.request.formData();
        const file = formData.get('media');
        const title = formData.get('title') || '';
        const text = formData.get('text') || '';

        if (file) {
          const cache = await caches.open('bottega-shared-files');
          const headers = new Headers({
            'Content-Type': file.type || 'application/octet-stream',
            'X-File-Name': encodeURIComponent(file.name || 'allegato'),
            'X-Share-Title': encodeURIComponent(String(title)),
            'X-Share-Text': encodeURIComponent(String(text))
          });
          await cache.put('/shared-input', new Response(file, { headers }));
        }
      } catch (err) {
        console.error('Errore ricezione condivisione:', err);
      }
      return Response.redirect('./index.html?share_target=1', 303);
    })());
    return;
  }

  if (event.request.method !== 'GET') return;

  if (url.origin !== location.origin) return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        return response;
      })
      .catch(() => caches.match(event.request).then((cached) => cached || caches.match('./index.html')))
  );
});