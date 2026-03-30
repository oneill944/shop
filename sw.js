const CACHE_NAME = 'kozos-lista-v0.9.0';

// Telepítéskor gyorsítótárazás (opcionális offline módhoz)
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

// ÉRTESÍTÉS KEZELÉSE
self.addEventListener('push', (event) => {
    let data = { title: 'Új tétel!', body: 'Valaki frissítette a listát.' };
    
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
        // A 'tag' és a 'renotify' a kulcs: minden üzenet kapjon rezgést
        tag: 'msg-' + Date.now(), 
        renotify: true,
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

// Kattintás az értesítésre: nyissa meg az appot
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
