self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('ubox-pwa-cache-v1').then((cache) => {
        return cache.addAll([
          '/',
          '/home',
          '/images/web-app-manifest-192x192.png',
          '/images/web-app-manifest-512x512.png',
          '/images/screenshot1.png',
          '/images/screenshot2.png',
          '/styles/globals.css',
          '/leaflet/dist/leaflet.css',
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });