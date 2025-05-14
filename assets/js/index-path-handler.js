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
      body {background-color: white; color: #222; margin: 0; padding: 0 1rem; line-height: 1.5;}
      @media (prefers-color-scheme: dark) {body {background-color: #121520; color: #e1e5ed;}}
    `;
    document.head.appendChild(style);
    
    // Replace main content with 404 error page, but preserve the theme toggle
    const updateBody = function() {
      // Keep the theme toggle if it exists
      var themeToggle = document.querySelector('.theme-toggle');
      
      // Create the 404 content
      var errorContent = document.createElement('main');
      errorContent.id = 'main-content';
      errorContent.innerHTML = '<div class="error-page">' +
        '<h1>404</h1>' +
        '<div class="error-content">' +
        '<p>Oopsie~ This page seems to have glitched away! <span class="emoji">⌨️✨</span></p>' +
        '<p class="suggestion">Maybe check your URL or return to my <a href="/">digital wonderland</a>?</p>' +
        '</div>' +
        '<div class="error-actions">' +
        '<a href="/" class="home-button"><span class="button-text">✨ Return Home ✨</span></a>' +
        '</div>' +
        '</div>';
      
      // Create a skip to content link
      var skipLink = document.createElement('a');
      skipLink.href = '#main-content';
      skipLink.className = 'skip-to-content';
      skipLink.textContent = 'Skip to content';
      
      // Create the footer
      var footer = document.createElement('footer');
      footer.className = 'site-footer';
      footer.innerHTML = '<div class="copyright">&copy; <span id="copyright-year">' + 
                          new Date().getFullYear() + 
                          '</span> azurepwq. All rights reserved.</div>';
      
      // Clear the body
      document.body.innerHTML = '';
      
      // Add the elements back in the right order
      document.body.appendChild(skipLink);
      if (themeToggle) {
        document.body.appendChild(themeToggle);
      } else {
        // Create a new theme toggle if one doesn't exist
        var newThemeToggle = document.createElement('div');
        newThemeToggle.className = 'theme-toggle';
        newThemeToggle.innerHTML = `
          <button id="theme-toggle-btn" aria-label="Toggle dark/light mode">
            <svg class="sun-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
            <svg class="moon-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </button>
        `;
        document.body.appendChild(newThemeToggle);
        
        // Set up theme toggle functionality
        setTimeout(function() {
          const themeToggle = document.getElementById('theme-toggle-btn');
          const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
          
          // Check for saved theme preference or use the system preference
          const currentTheme = localStorage.getItem('theme') || 
                              (prefersDarkScheme.matches ? 'dark' : 'light');
          
          // Set the initial theme
          document.documentElement.setAttribute('data-theme', currentTheme);
          updateThemeToggleIcon(currentTheme);
          
          // Toggle theme when button is clicked
          themeToggle.addEventListener('click', () => {
            const newTheme = document.documentElement.getAttribute('data-theme') === 'light' 
                            ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeToggleIcon(newTheme);
          });
          
          // Update the toggle icon based on current theme
          function updateThemeToggleIcon(theme) {
            const moonIcon = document.querySelector('.moon-icon');
            const sunIcon = document.querySelector('.sun-icon');
            
            if (theme === 'dark') {
              moonIcon.style.display = 'none';
              sunIcon.style.display = 'block';
            } else {
              moonIcon.style.display = 'block';
              sunIcon.style.display = 'none';
            }
          }
        }, 0);
      }
      
      document.body.appendChild(errorContent);
      document.body.appendChild(footer);
    };
    
    // Update the page immediately if already interactive or complete
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
      updateBody();
    } else {
      // Otherwise wait for DOMContentLoaded
      document.addEventListener('DOMContentLoaded', updateBody);
    }
  }
})(); 