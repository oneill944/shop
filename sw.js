const CACHE_NAME = 'kozos-lista-v0.9.2';

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

self.addEventListener('push', (event) => {
    let data = { title: 'Bevásárló lista', body: 'Valami történt!' };
    
    if (event.data) {
        try {
            data = event.data.json();
        } catch (e) {
            data.body = event.data.text();
        }
    }

    const options = {
        body: data.body,
        icon: 'IMG_4302.png',
        badge: 'IMG_4302.png',
        // Kényszerítjük a telefont, hogy minden üzenetet külön kezeljen
        tag: 'notif-' + Math.random().toString(36).substr(2, 9),
        renotify: true,
        vibrate: [200, 100, 200],
        silent: false,
        requireInteraction: true // Az értesítés kint marad, amíg el nem olvassák
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            if (clientList.length > 0) {
                return clientList[0].focus();
            }
            return clients.openWindow('/');
        })
    );
});
