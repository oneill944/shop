self.addEventListener('push', function(event) {
    const data = event.data ? event.data.json() : {};
    const title = data.title || "Új termék a kosárba!";
    const options = {
        body: data.body || "Nézd meg a listát!",
        icon: 'IMG_4302.png',
        badge: 'IMG_4302.png'
    };
    event.waitUntil(self.registration.showNotification(title, options));
});
