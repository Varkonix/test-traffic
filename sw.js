const CACHE_NAME = 'speedtest-v1';

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll([
                './',
                './index.html',
                './manifest.json',
                './icon.svg'
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    if (event.request.url.includes('speed.cloudflare.com') || event.request.url.includes('ipapi.co') || event.request.url.includes('amazonaws.com')) {
        return;
    }
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
