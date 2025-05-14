/**
 * Service Worker Registration
 * Version: {{ site.asset_version }}
 * Generated: {{ site.time | date: '%Y-%m-%d %H:%M' }}
 */

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // In development mode (localhost), handle service worker differently
    const isLocalhost = window.location.hostname === 'localhost' || 
                        window.location.hostname === '127.0.0.1' ||
                        window.location.hostname.includes('0.0.0.0');
                        
    if (isLocalhost) {
      console.log('Running in development mode - minimal service worker functionality');
      
      // In development, unregister any existing service worker to avoid caching issues
      navigator.serviceWorker.getRegistrations().then(registrations => {
        for(let registration of registrations) {
          registration.unregister();
          console.log('Development mode: Service worker unregistered');
        }
      });
      
      return; // Don't register service worker in development
    }
    
    // In production, register the service worker normally
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
        
        // Check for updates
        if (registration.active) {
          registration.update();
        }
        
        // Listen for controllerchange events
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          console.log('New service worker activated, reloading for fresh content');
          window.location.reload();
        });
      })
      .catch(error => {
        console.log('ServiceWorker registration failed: ', error);
      });
  });
} 