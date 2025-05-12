/**
 * Service Worker Registration
 * Version: {{ site.asset_version }}
 */

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js?v={{ site.asset_version }}.{{ site.time | date: "%Y%m%d%H%M" }}')
      .then(registration => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      })
      .catch(error => {
        console.log('ServiceWorker registration failed: ', error);
      });
  });
} 