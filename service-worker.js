/**
 * Service Worker for azurepwq.com
 * Version: {{ site.asset_version }}
 * Generated: {{ site.time | date: '%Y-%m-%d %H:%M' }}
 */

// Use simple cache name to avoid template errors
const CACHE_NAME = 'azurepwq-cache-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/assets/css/style.css',
  '/apple-touch-icon.png',
  '/favicon.ico',
  '/favicon-16x16.png',
  '/favicon-32x32.png'
];

// Install event - cache core assets
self.addEventListener('install', event => {
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service worker installed');
        
        // Add resources one by one instead of using addAll
        return Promise.all(
          ASSETS_TO_CACHE.map(url => {
            // Fetch and cache each resource individually
            return fetch(url)
              .then(response => {
                if (!response.ok) {
                  throw new Error(`Failed to fetch ${url}`);
                }
                return cache.put(url, response);
              })
              .catch(error => {
                console.log(`Failed to cache ${url}: ${error.message}`);
                // Continue with other resources even if one fails
                return Promise.resolve();
              });
          })
        );
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Handle network requests
self.addEventListener('fetch', event => {
  // Use a simple network-first strategy
  event.respondWith(
    fetch(event.request)
      .catch(() => {
        return caches.match(event.request);
      })
  );
});