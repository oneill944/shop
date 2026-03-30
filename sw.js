// sw.js tartalma
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

// Ez fogadja a háttérüzeneteket
self.addEventListener('push', (event) => {
    const data = event.data ? event.data.json() : {};
    event.waitUntil(
        self.registration.showNotification(data.title || "Új termék a kosárba!", {
            body: data.body || "Frissült a lista.",
            icon: 'IMG_4302.png',
            badge: 'IMG_4302.png'
        })
    );
});
