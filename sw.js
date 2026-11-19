self.addEventListener('push', event => {
  let data = {};
  try { data = event.data ? event.data.json() : {}; } catch (_) { data = {body: event.data?.text() || ''}; }
  event.waitUntil(self.registration.showNotification(data.title || 'OneChat', {
    body: data.body || 'Hai una nuova notifica',
    tag: data.tag || 'onechat-message',
    data: {url: '/Onechat/'},
  }));
});
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data?.url || '/Onechat/'));
});
