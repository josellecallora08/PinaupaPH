self.addEventListener('install', (event) => {
  // console.log('Service Worker installed');
});

self.addEventListener('activate', (event) => {
  // console.log('Service Worker activated');
});

self.addEventListener('fetch', (event) => {
  // console.log('Fetch intercepted:', event.request.url);
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
