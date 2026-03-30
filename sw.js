const CACHE_NAME = 'kozos-lista-v0.9.5';

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

self.addEventListener('push', (event) => {
    let data = { title: 'Bevásárló lista', body: 'Új tétel!' };
    if (event.data) {
        try { data = event.data.json(); } catch (e) { data.body = event.data.text(); }
    }

    const options = {
        body: data.body,
        icon: 'IMG_4302.png',
        badge: 'IMG_4302.png',
        // Az egyedi tag megakadályozza az üzenetek összevonását
        tag: 'notif-' + Date.now(),
        renotify: true,
        vibrate: [200, 100, 200]
    };

    event.waitUntil(self.registration.showNotification(data.title, options));
});
