// Immediately execute this function to handle /index paths
(function() {
  // Get the current path and normalize it
  var path = window.location.pathname;
  
  // Check if the path is /index, /index.html or starts with /index/
  if (path === '/index' || path === '/index.html' || path === '/index/' || path.indexOf('/index/') === 0) {
    // Set title immediately
    document.title = '404 - Page Not Found';
    
    // Create and inject 404 error page styles
    var style = document.createElement('style');
    style.textContent = `
      .error-page {text-align: center; padding: 2rem 1rem; max-width: 600px; margin: 0 auto; font-family: 'Segoe UI', Arial, sans-serif;}
      .error-page h1 {font-size: 6rem; margin: 0; color: #C25938; line-height: 1; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);}
      .error-content {margin: 2rem 0;}
      .error-content p {margin: 0.5rem 0; font-size: 1.2rem;}
      .suggestion {opacity: 0.9; font-size: 1rem !important; margin-top: 1rem !important;}
      .error-actions {margin-top: 2rem;}
      .home-button {display: inline-block; background-color: #C25938; color: white !important; padding: 0.75rem 1.5rem; border-radius: 22px; text-decoration: none; font-weight: 500; transition: transform 0.3s, box-shadow 0.3s; box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05); position: relative; overflow: hidden;}
      .button-text {position: relative; z-index: 2;}
      .emoji {display: inline-block; transform-origin: center; animation: float 3s ease-in-out infinite;}
      @keyframes float {0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); }}
      .home-button:hover {transform: translateY(-2px) scale(1.03); box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);}
      @media (prefers-color-scheme: dark) {.home-button {box-shadow: 0 3px 12px rgba(0, 0, 0, 0.2);} .error-page h1 {color: #E27A59; text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);}}
      body {background-color: white; color: #222; margin: 0; padding: 0;}
      @media (prefers-color-scheme: dark) {body {background-color: #121520; color: #e1e5ed;}}
    `;
    document.head.appendChild(style);
    
    // Replace entire body content with 404 error page
    document.addEventListener('DOMContentLoaded', function() {
      document.body.innerHTML = '<div class="error-page">' +
        '<h1>404</h1>' +
        '<div class="error-content">' +
        '<p>Oopsie~ This page seems to have glitched away! <span class="emoji">⌨️✨</span></p>' +
        '<p class="suggestion">Maybe check your URL or return to my <a href="/">digital wonderland</a>?</p>' +
        '</div>' +
        '<div class="error-actions">' +
        '<a href="/" class="home-button"><span class="button-text">✨ Return Home ✨</span></a>' +
        '</div>' +
        '</div>';
    });
    
    // If DOMContentLoaded already fired, update the page immediately
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
      document.body.innerHTML = '<div class="error-page">' +
        '<h1>404</h1>' +
        '<div class="error-content">' +
        '<p>Oopsie~ This page seems to have glitched away! <span class="emoji">⌨️✨</span></p>' +
        '<p class="suggestion">Maybe check your URL or return to my <a href="/">digital wonderland</a>?</p>' +
        '</div>' +
        '<div class="error-actions">' +
        '<a href="/" class="home-button"><span class="button-text">✨ Return Home ✨</span></a>' +
        '</div>' +
        '</div>';
    }
  }
})(); 