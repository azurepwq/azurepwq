/**
 * LiveReload Debug Script
 * 
 * This script helps debug LiveReload connection issues.
 * Include it in your page to log LiveReload connection events.
 */

(function() {
  const port = 35729;
  const hostname = window.location.hostname || 'localhost';
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  const url = `${protocol}//${hostname}:${port}/livereload`;
  
  console.log(`[LiveReload Debug] Attempting to connect to: ${url}`);
  
  let socket;
  let reconnectAttempts = 0;
  const maxReconnectAttempts = 5;
  
  function connect() {
    try {
      socket = new WebSocket(url);
      
      socket.onopen = function() {
        console.log('[LiveReload Debug] Connection established successfully ✅');
        reconnectAttempts = 0;
        document.body.classList.add('livereload-connected');
        
        // Add visual indicator
        showStatus('connected');
      };
      
      socket.onclose = function(event) {
        console.log(`[LiveReload Debug] Connection closed (code: ${event.code}, reason: ${event.reason || 'No reason provided'})`);
        document.body.classList.remove('livereload-connected');
        
        // Add visual indicator
        showStatus('disconnected');
        
        // Try to reconnect
        if (reconnectAttempts < maxReconnectAttempts) {
          reconnectAttempts++;
          console.log(`[LiveReload Debug] Attempting to reconnect (${reconnectAttempts}/${maxReconnectAttempts})...`);
          setTimeout(connect, 3000);
        }
      };
      
      socket.onerror = function(error) {
        console.error('[LiveReload Debug] WebSocket error:', error);
        showStatus('error');
      };
      
      socket.onmessage = function(event) {
        console.log('[LiveReload Debug] Message received:', event.data);
        showStatus('message-received');
      };
    } catch (error) {
      console.error('[LiveReload Debug] Error creating WebSocket:', error);
      showStatus('error');
    }
  }
  
  function showStatus(status) {
    // Create status indicator if it doesn't exist
    let indicator = document.getElementById('livereload-indicator');
    if (!indicator) {
      indicator = document.createElement('div');
      indicator.id = 'livereload-indicator';
      indicator.style.position = 'fixed';
      indicator.style.bottom = '10px';
      indicator.style.right = '10px';
      indicator.style.padding = '5px 10px';
      indicator.style.borderRadius = '4px';
      indicator.style.fontSize = '12px';
      indicator.style.fontFamily = 'monospace';
      indicator.style.zIndex = '9999';
      document.body.appendChild(indicator);
    }
    
    // Update status
    switch (status) {
      case 'connected':
        indicator.textContent = '🟢 LiveReload Connected';
        indicator.style.backgroundColor = '#4CAF50';
        indicator.style.color = 'white';
        break;
      case 'disconnected':
        indicator.textContent = '🔴 LiveReload Disconnected';
        indicator.style.backgroundColor = '#F44336';
        indicator.style.color = 'white';
        break;
      case 'error':
        indicator.textContent = '⚠️ LiveReload Error';
        indicator.style.backgroundColor = '#FF9800';
        indicator.style.color = 'white';
        break;
      case 'message-received':
        indicator.textContent = '📨 LiveReload Update';
        indicator.style.backgroundColor = '#2196F3';
        indicator.style.color = 'white';
        setTimeout(() => {
          showStatus('connected');
        }, 1000);
        break;
    }
  }
  
  // Start connection process
  connect();
  
  // Add button to manually reconnect
  window.reconnectLiveReload = function() {
    console.log('[LiveReload Debug] Manual reconnection initiated');
    if (socket) {
      socket.close();
    }
    reconnectAttempts = 0;
    connect();
  };
  
  // Add button to test connection
  const reconnectButton = document.createElement('button');
  reconnectButton.textContent = 'Reconnect LiveReload';
  reconnectButton.style.position = 'fixed';
  reconnectButton.style.bottom = '40px';
  reconnectButton.style.right = '10px';
  reconnectButton.style.padding = '5px 10px';
  reconnectButton.style.zIndex = '9999';
  reconnectButton.addEventListener('click', window.reconnectLiveReload);
  document.body.appendChild(reconnectButton);
})(); 