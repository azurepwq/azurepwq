# Development Guide

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

The site's content is maintained in `README.md`. When you modify this file, you'll need to sync it to your `index.md` file (which includes Jekyll front matter).

### 2. Sync README.md to index.md

The `sync-readme-to-index.sh` script copies the content from `README.md` to `index.md` while preserving the Jekyll front matter:

```bash
./sync-readme-to-index.sh
```

Make this script executable if it's not already:
```bash
chmod +x sync-readme-to-index.sh
```

### 3. Start the Jekyll Server

```bash
bundle exec jekyll serve --livereload
```

This will start a local server at http://localhost:4000 with live reload enabled.

### 4. Watch for README Changes (Optional)

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

### Gemfile Issues

If you need to reset your Gemfile:
```bash
bundle init
echo 'gem "github-pages", group: :jekyll_plugins' >> Gemfile
echo 'gem "webrick", "~> 1.7"' >> Gemfile
bundle install
``` 