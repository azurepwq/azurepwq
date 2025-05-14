source "https://rubygems.org"

# Use standalone Jekyll for local development
gem "jekyll", "~> 4.3.2"
gem "webrick", "~> 1.8"
gem "jekyll-theme-minimal"
gem "faraday-retry"

# Use these plugins for compatibility with GitHub Pages features
# without actually using the github-pages gem which conflicts with Jekyll 4.x
group :jekyll_plugins do
  gem "jekyll-github-metadata"
  gem "jekyll-feed"
  gem "jekyll-sitemap"
  gem "jekyll-seo-tag"
  gem "jekyll-mentions"
  gem "jemoji"
  gem "jekyll-redirect-from"
  gem "jekyll-relative-links"
end

# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library.
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]
