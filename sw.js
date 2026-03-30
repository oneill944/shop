// sw.js - Service Worker az iOS értesítésekhez
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

// Ez figyeli az értesítéseket
self.addEventListener('push', function(event) {
    const data = event.data ? event.data.json() : { title: 'Bevásárló lista', body: 'Új tétel érkezett!' };
    event.waitUntil(
        self.registration.showNotification(data.title, {
            body: data.body,
            icon: 'IMG_4302.png',
            badge: 'IMG_4302.png'
        })
    );
});
