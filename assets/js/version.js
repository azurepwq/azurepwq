/**
 * Asset version tracking for client-side cache busting
 * Generated: {{ site.time | date: '%Y-%m-%d %H:%M' }}
 * Version: {{ site.asset_version }}
 */
window.SITE_VERSION = '{{ site.asset_version }}';
window.SITE_UPDATED = '{{ site.time | date: "%Y-%m-%d %H:%M" }}';

// Cache busting function for dynamically loaded resources
function getVersionedUrl(path) {
  return path + '?v=' + window.SITE_VERSION + '.' + 
    window.SITE_UPDATED.replace(/[^0-9]/g, '');
} 