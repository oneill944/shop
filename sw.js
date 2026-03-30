const CACHE_NAME = 'kozos-lista-v0.9.1';

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

self.addEventListener('push', (event) => {
    let data = { title: 'Új tétel!', body: 'Valaki írt a listára.' };
    
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
        // KRITIKUS: Az egyedi tag és a renotify kényszeríti ki az újabb hangot/rezgést
        tag: 'notification-' + Date.now(), 
        renotify: true,
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now()
        }
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then((clientList) => {
            if (clientList.length > 0) {
                return clientList[0].focus();
            }
            return clients.openWindow('/');
        })
    );
});
