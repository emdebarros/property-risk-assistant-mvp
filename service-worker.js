// The v1 suffix is very important for cache updates. When you change static assets (HTML, CSS, JS), incrementing the version (v2, v3, etc.) tells the service worker to ignore the old cache and build a fresh one.
const CACHE_NAME = 'avivo-app-risk-checker-cache-v1';

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll([
                '/',
                '/index.html',
                '/risques.html',
                '/style.css',
                '/script.js',
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

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

//clear the old cache in the activate event :
/*
const CACHE_NAME = 'avivo-app-risk-checker-cache-v1'; // changed from v1 to v2

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

*/