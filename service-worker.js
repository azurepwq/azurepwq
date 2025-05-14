/**
 * Auto-unregistering Service Worker for azurepwq.com
 * This is a modified version that will automatically unregister itself
 * to fix any cached issues and ensure a clean browsing experience.
 */

// This is an empty service worker that unregisters itself on activation
self.addEventListener('install', event => {
  self.skipWaiting();
});

// Unregister self when activated
self.addEventListener('activate', event => {
  event.waitUntil(
    self.registration.unregister()
      .then(() => {
        console.log('Service worker has been unregistered to fix caching issues');
        return self.clients.matchAll();
      })
      .then(clients => {
        // Inform all clients that service worker has been removed
        clients.forEach(client => {
          client.postMessage({
            type: 'SERVICE_WORKER_UNREGISTERED',
            message: 'Service worker has been unregistered'
          });
        });
      })
  );
});

// Empty fetch handler that doesn't intercept anything
self.addEventListener('fetch', event => {
  // Don't intercept any requests
  // Just let the browser handle everything normally
});