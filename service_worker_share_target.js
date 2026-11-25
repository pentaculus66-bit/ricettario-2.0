const SHARE_CACHE_NAME = 'ricettario-share-target-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Intercept Web Share Target POST requests (PDFs, photos, screenshots, text)
  if (event.request.method === 'POST' && url.searchParams.get('share-target') === '1') {
    event.respondWith(
      (async () => {
        try {
          const formData = await event.request.formData();
          const cache = await caches.open(SHARE_CACHE_NAME);

          // Clear any previous shared payload
          const oldKeys = await cache.keys();
          await Promise.all(oldKeys.map((k) => cache.delete(k)));

          const files = formData.getAll('shared_files').filter((f) => f && typeof f === 'object' && f.size > 0);
          const meta = {
            title: formData.get('title') || '',
            text: formData.get('text') || '',
            url: formData.get('url') || '',
            files: []
          };

          for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const itemKey = `/__shared_file_${i}`;
            const headers = new Headers({
              'Content-Type': file.type || 'application/octet-stream',
              'X-File-Name': encodeURIComponent(file.name || `condiviso_${i + 1}`)
            });
            await cache.put(itemKey, new Response(file, { headers }));
            meta.files.push({
              key: itemKey,
              name: file.name || `condiviso_${i + 1}`,
              type: file.type || ''
            });
          }

          await cache.put(
            '/__shared_meta__',
            new Response(JSON.stringify(meta), {
              headers: { 'Content-Type': 'application/json' }
            })
          );
        } catch (err) {
          // Ignore form parse error and still open app cleanly
        }

        const redirectUrl = new URL('./index.html?shared=1', self.location.href).href;
        return Response.redirect(redirectUrl, 303);
      })()
    );
    return;
  }

  // Pass-through fetch handler so Chrome recognizes the Service Worker as offline-capable
  event.respondWith(fetch(event.request));
});