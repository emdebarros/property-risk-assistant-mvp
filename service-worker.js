// Update this version to force a new cache build
const CACHE_NAME = 'avivo-app-risk-checker-cache-v2';

// Install event: cache essential files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/risques.html',
        '/style.css',
        '/script.js',
        '/loadLayout.js',
        '/header.html',
        '/footer.html',
        '/manifest.json',
        '/favicon_io/android-chrome-192x192.png',
        '/favicon_io/android-chrome-512x512.png',
        '/favicon_io/apple-touch-icon.png',
        '/favicon_io/favicon-16x16.png',
        '/favicon_io/favicon-32x32.png',
        '/favicon_io/favicon.ico'
      ]);
    })
  );
});

// Fetch event: serve from cache, fallback to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// Activate event: delete old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      )
    )
  );
});