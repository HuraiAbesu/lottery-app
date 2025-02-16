const cacheName = 'lottery-app-v1';
const resourcesToPrecache = [
    '/',
    'index.html',
    'style.css',
    'script.js',
    'manifest.json',
    'sound/doramu.mp3',
    'icons/icon-192x192.png',
    'icons/icon-512x512.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => cache.addAll(resourcesToPrecache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(cachedResponse => cachedResponse || fetch(event.request))
    );
});
