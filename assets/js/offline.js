/**
 * Offline detection
 * Version: {{ site.asset_version }}
 */

(function() {
  // Check online status on load
  checkOnlineStatus();
  
  // Listen for online/offline events
  window.addEventListener('online', showOnlineStatus);
  window.addEventListener('offline', showOfflineStatus);
  
  function checkOnlineStatus() {
    if (navigator.onLine) {
      showOnlineStatus();
    } else {
      showOfflineStatus();
    }
  }
  
  function showOfflineStatus() {
    // Check if notification already exists
    if (document.getElementById('offline-notification')) return;
    
    const notification = document.createElement('div');
    notification.id = 'offline-notification';
    notification.className = 'offline-notification';
    notification.innerHTML = `
      <div class="offline-message">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="1" y1="1" x2="23" y2="23"></line>
          <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"></path>
          <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"></path>
          <path d="M10.71 5.05A16 16 0 0 1 22.58 9"></path>
          <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"></path>
          <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
          <line x1="12" y1="20" x2="12.01" y2="20"></line>
        </svg>
        You're offline. Some content may be unavailable.
      </div>`;
    
    document.body.prepend(notification);
    
    // Add styles if they don't already exist
    if (!document.getElementById('offline-styles')) {
      const style = document.createElement('style');
      style.id = 'offline-styles';
      style.textContent = `
        .offline-notification {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background-color: var(--accent-color);
          color: white;
          text-align: center;
          padding: 8px 16px;
          z-index: 9999;
          font-size: 14px;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: transform 0.3s ease;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .offline-message {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        
        html[data-theme="dark"] .offline-notification {
          background-color: #2d3748;
        }
        
        @media (prefers-color-scheme: dark) {
          html:not([data-theme="light"]) .offline-notification {
            background-color: #2d3748;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }
  
  function showOnlineStatus() {
    const notification = document.getElementById('offline-notification');
    if (notification) {
      notification.remove();
    }
  }
})(); 