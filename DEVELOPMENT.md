# Development Guide
<!-- Version: v1.1.0 -->
<!-- Last Updated: 2025-05-14 -->

This document provides instructions for setting up and developing this GitHub Pages site locally.

## Prerequisites

- **Ruby**: This site uses Jekyll, which requires Ruby
- **Git**: For version control
- **Bundler**: For managing Ruby dependencies
- **rbenv** (recommended): For managing Ruby versions

## Setup

### 1. Install Ruby (via rbenv)

macOS:
```bash
# Install Homebrew if not already installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install rbenv and ruby-build
brew install rbenv

# Initialize rbenv
rbenv init

# Add rbenv to your shell (follow the printed instructions)
# Usually this means adding 'eval "$(rbenv init -)"' to your ~/.zshrc or ~/.bash_profile

# Install Ruby
rbenv install 3.2.2
rbenv global 3.2.2

# Verify Ruby installation
ruby -v
```

Linux:
```bash
# Install dependencies
sudo apt update
sudo apt install git curl libssl-dev libreadline-dev zlib1g-dev autoconf bison build-essential libyaml-dev libreadline-dev libncurses5-dev libffi-dev libgdbm-dev

# Install rbenv
curl -fsSL https://github.com/rbenv/rbenv-installer/raw/HEAD/bin/rbenv-installer | bash

# Add rbenv to your shell (add to ~/.bashrc)
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(rbenv init -)"' >> ~/.bashrc
source ~/.bashrc

# Install Ruby
rbenv install 3.2.2
rbenv global 3.2.2

# Verify Ruby installation
ruby -v
```

Windows:
```bash
# Install Ruby via RubyInstaller: https://rubyinstaller.org/
# Choose Ruby+Devkit version
```

### 2. Install Jekyll and Bundler

```bash
gem install bundler jekyll
```

### 3. Clone the Repository (if you haven't already)

```bash
git clone https://github.com/azurepwq/azurepwq.git
cd azurepwq
```

### 4. Install Dependencies

```bash
bundle install
```

## Development Workflow

### 1. Update README.md

The site's content is maintained in `README.md`. When you modify this file, it will automatically be synced to your `index.md` file (which includes Jekyll front matter) when you use the npm start command.

### 2. Using NPM Scripts

This project includes helpful npm scripts to streamline development:

```bash
# Start both the Jekyll server and watch for README.md changes (recommended)
npm start

# Start just the Jekyll development server with livereload
npm run serve

# Build the site for production
npm run build 

# Manually sync README.md content to index.md (preserving front matter)
npm run sync

# Watch README.md for changes and automatically sync to index.md
npm run watch

# Clean the Jekyll build
npm run clean

# Run Jekyll doctor to find potential issues
npm run test
```

### 3. Automatic Sync of README.md to index.md

The sync mechanism works in two ways:

1. **Local Development**: When you run `npm start`, the watch script automatically monitors README.md for changes and syncs them to index.md while preserving the front matter.

2. **GitHub Automation**: When you push changes to the main branch, a GitHub Actions workflow (`.github/workflows/sync-readme-to-index.yml`) automatically runs the sync script and commits any changes to index.md.

The `sync-readme-to-index.sh` script copies the content from `README.md` to `index.md` while preserving the Jekyll front matter. You can also run it manually:

```bash
./sync-readme-to-index.sh
```

Make this script executable if it's not already:
```bash
chmod +x sync-readme-to-index.sh
```

### 4. Start the Jekyll Server

```bash
bundle exec jekyll serve --livereload
```

This will start a local server at http://localhost:4000 with live reload enabled.

### 5. Watch for README Changes (Optional)

For automatic syncing when you edit README.md, use the watch script in a separate terminal:

```bash
chmod +x watch-and-sync.sh
./watch-and-sync.sh
```

## File Structure

- **README.md**: Main content (used for GitHub profile)
- **index.md**: Jekyll page with front matter (generated from README.md)
- **_layouts/**: Contains HTML layouts
- **assets/css/**: Contains stylesheets
- **_config.yml**: Jekyll configuration

## Making Style Changes

Edit the CSS files in `assets/css/` to change the appearance of your site:

```bash
# Main stylesheet
assets/css/style.css
```

### Contact Button Styling

The site uses custom CSS classes for styling contact buttons:

- `.contact-list`: Container for the contact items (vertical list)
- `.contact-item`: Individual contact item container
- `.social-button`: Base style for all contact buttons
- `.github-button`: GitHub-specific button with brand color
- `.twitter-button`: X (formerly Twitter)-specific button with brand color (black)
- `.email-button`: Email-specific button with brand color

These classes can be customized in `assets/css/style.css` to change:
- Button colors (using CSS variables in `:root`)
- Button size and spacing
- Hover effects
- Icon sizing and positioning

Example HTML structure in README.md:
```html
<div class="contact-list">
  <div class="contact-item">
    <a href="..." class="social-button github-button">
      <img src="..."> Label
    </a>
  </div>
</div>
```

## Caching Strategy

The site uses a Service Worker for improved performance and offline capabilities:

### Service Worker Implementation

- Located in `service-worker.js` in the root directory
- Provides caching for static assets and pages
- Configured to allow updates to propagate on refresh

### Testing Cache Behavior

1. **Developer Tools**: Chrome DevTools > Application > Service Workers
2. **Force Update**: Enable "Update on reload" to force fresh content
3. **Unregister**: During development, you can unregister the Service Worker to prevent caching

### Development Mode

During development, you may want to:
```javascript
// In service-worker.js
self.addEventListener('install', (event) => {
  // Force activation without waiting for tabs to close
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // Claim clients immediately
  event.waitUntil(clients.claim());
});
```

## Icon Generation

The site includes tools for generating various icons and assets:

### Favicon Generator

Use `favicon-generator.html` to create favicon files:

1. Open `favicon-generator.html` in your browser
2. Upload or create your desired icon
3. Customize colors and settings
4. Generate and download the icon files
5. Place files in the appropriate locations in the project

### Using Generated Icons

- `favicon.ico` goes in the root directory
- `apple-touch-icon.png` goes in the root directory
- Other size variations should be placed as specified in `_layouts/default.html`

## Deployment

Changes are automatically deployed when pushed to the main branch. GitHub Actions will:

1. Sync README.md to index.md via `.github/workflows/sync-readme-to-index.yml`
2. Build and deploy the site via GitHub Pages

## International Accessibility

The site includes optimizations for better accessibility in regions with restricted internet access, particularly China:

### CDN and Performance Optimizations

1. **Use CDN-friendly Image Sources**:
   - For icons and images, prefer `cdn.jsdelivr.net` over direct GitHub links:
   ```html
   <!-- Prefer this (works in China) -->
   <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg">
   
   <!-- Instead of this (may be blocked) -->
   <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original.svg">
   ```

2. **Resource Hints**:
   - The site uses DNS prefetching and preconnect to speed up resource loading:
   ```html
   <link rel="dns-prefetch" href="https://cdn.jsdelivr.net">
   <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
   ```

3. **Minimize External Resources**:
   - Keep external resources minimal and hosted on CDNs accessible globally
   - Inline critical CSS when possible

### Testing Accessibility

To verify the site works in China, you can use:
- [WebSitePulse](https://www.websitepulse.com/tools/china-firewall-test) - Great Wall of China firewall test
- [Pingdom](https://tools.pingdom.com/) - Test load times from different locations
- [GreatFire.org Analyzer](https://en.greatfire.org/analyzer) - Check if resources are blocked

## Troubleshooting

### Ruby Version Issues

If you encounter Ruby version issues:
```bash
rbenv local 3.2.2  # Sets Ruby version for this project
gem install bundler  # Reinstall bundler
bundle install  # Reinstall dependencies
```

### Jekyll Build Errors

For Jekyll build errors, check:
```bash
bundle exec jekyll build --trace
```

### Sass Deprecation Warnings

The site currently uses the Jekyll theme's Sass files which contain deprecated `@import` statements. These warnings are expected and won't prevent the site from building properly:

```
Deprecation Warning [import]: Sass @import rules are deprecated and will be removed in Dart Sass 3.0.0.
```

These warnings can be safely ignored until the Jekyll theme is updated to use modern Sass `@use` and `@forward` rules.

### Gemfile Issues

If you need to reset your Gemfile:
```bash
bundle init
echo 'gem "github-pages", group: :jekyll_plugins' >> Gemfile
echo 'gem "webrick", "~> 1.7"' >> Gemfile
bundle install
```

## Security Headers

The site implements several security headers for improved security:

### Content Security Policy

Located in `_layouts/default.html`, the CSP restricts:
- Which resources can be loaded
- Where scripts can be executed from
- Frame embedding policies

Example:
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline';">
```

### Cache Control Headers

For GitHub Pages, cache headers are configured via:
- `_headers` file (if using Netlify)
- Service Worker cache settings

## External Resources

- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Favicon Generator](https://realfavicongenerator.net/)
- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [GitHub Pages](https://docs.github.com/en/pages)
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

## Quick Start

1. Clone the repository
2. Install dependencies with `bundle install`
3. Run the development server with `bundle exec jekyll serve`
4. Visit `http://localhost:4000` in your browser

## Project Structure

The project follows a standard Jekyll site structure with the following key components:

- `_layouts/` - HTML templates used for pages
- `_includes/` - Reusable HTML components
- `assets/` - CSS, JavaScript, and images
- `_config.yml` - Main configuration file
- `.github/workflows/` - GitHub Actions deployment configuration

## Jekyll Setup

This project uses Jekyll 4.x with the following configuration:

- **Theme**: jekyll-theme-minimal
- **Plugins**: jekyll-github-metadata, jekyll-feed, jekyll-sitemap, jekyll-seo-tag, and more
- **Custom Domain**: The site is configured to use `azurepwq.com` via the CNAME file

### Local Development

To run the site locally:

```bash
bundle install
bundle exec jekyll serve
```

Jekyll will start a local server at `http://localhost:4000`. Changes to files will automatically trigger a rebuild.

### GitHub Pages Deployment

The site is deployed to GitHub Pages using GitHub Actions. The workflow is defined in `.github/workflows/github-pages.yml`.

When you push to the `main` branch, GitHub Actions will:
1. Checkout the repository
2. Set up Ruby
3. Install dependencies
4. Build the site with Jekyll
5. Ensure the CNAME file exists
6. Deploy the site to GitHub Pages

## Technical Implementation

// ... existing code ...

## Caching Strategy

// ... existing code ...

## Asset Generation

// ... existing code ...

## Security Implementation

// ... existing code ...

## Testing and Debugging

// ... existing code ...

## Deployment

This site is deployed using GitHub Pages with a custom GitHub Actions workflow. The deployment process is as follows:

1. Push changes to the `main` branch
2. GitHub Actions builds the Jekyll site
3. The built site is deployed to GitHub Pages
4. The site is available at `azurepwq.com`

### Troubleshooting Deployment

If you encounter issues with deployment:

1. Check the GitHub Actions workflow logs
2. Ensure all dependencies are properly specified in the Gemfile
3. Verify that the CNAME file is being created in the `_site` directory
4. Check DNS settings if the custom domain is not working

## External Resources

// ... existing code ...

## LiveReload Troubleshooting

The Jekyll development server includes LiveReload functionality that automatically refreshes your browser when files change. If you're experiencing issues with LiveReload, follow these steps:

### Content Security Policy (CSP) Configuration

The website uses Content Security Policy headers for security. LiveReload requires WebSocket connections to function properly, so the CSP headers need to allow connections to the LiveReload server:

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; ... connect-src 'self' ws://localhost:35730 wss://localhost:35730;">
```

The CSP header is defined in `_layouts/default.html`.

### LiveReload Port Configuration

This project uses port 35730 for LiveReload instead of the default 35729 to avoid conflicts with other applications. The port is configured in:

1. `package.json` in the "serve" script
2. `assets/js/livereload-debug.js` for the debugging tools

If you need to change this port, make sure to update both locations and the CSP header.

### Testing LiveReload Connection

1. Open the file `/dev/livereload-test/` in your browser when running the development server. This page includes a debug script that will show connection status.
2. Check the browser console for connection messages.
3. Look for the visual indicator in the bottom right of the page.
4. Use the "Reconnect LiveReload" button to force a reconnection attempt.

> **Note**: The LiveReload test page is configured with `published: false` and will not be included in production builds. It's specifically for local development testing.

### Common Issues

1. **Connection Refused**: Make sure Jekyll is running with LiveReload enabled (`--livereload`).
2. **CSP Errors**: Check that the Content Security Policy includes the WebSocket endpoints.
3. **HTTPS Sites**: If using HTTPS locally, LiveReload must use secure WebSockets (`wss://`).
4. **Port Conflicts**: LiveReload uses port 35730 in this project. If you see "port is in use" errors, you can change the port in `package.json` and update the other files accordingly.
5. **Connection Reset Errors**: If you see `Errno::ECONNRESET: Connection reset by peer` errors, this is often normal when browser tabs are closed or refreshed. These errors don't affect site functionality.
6. **Multiple Jekyll Servers**: Ensure you don't have multiple Jekyll instances running simultaneously, as they may conflict with each other.

### Debugging Script

A debugging script is available at `assets/js/livereload-debug.js`. Include it in any page to debug LiveReload connections:

```html
<script src="{% raw %}{% include asset_path.html path='/assets/js/livereload-debug.js' %}{% endraw %}"></script>
```

This script provides:
- Real-time connection status
- Connection events logging in the console
- A visual indicator showing connection status
- A reconnect button for manual reconnection attempts

## Custom Pages

### 404 Page

The site includes a custom 404 error page (`404.html`) that matches the site's design:

1. **Styling**: Uses the brand color variables for consistency
2. **Animations**: Includes subtle hover effects without color changes
3. **Mobile Responsive**: Adapts to different screen sizes

To test the 404 page, navigate to any non-existent URL (e.g., `/nonexistent-page`).