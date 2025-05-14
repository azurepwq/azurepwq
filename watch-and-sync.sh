#!/bin/bash

# watch-and-sync.sh
# This script watches for changes to README.md and automatically syncs to index.md

README="README.md"
SYNC_SCRIPT="./sync-readme-to-index.sh"

# Check if the sync script exists and is executable
if [ ! -x "$SYNC_SCRIPT" ]; then
  echo "Making sync script executable"
  chmod +x "$SYNC_SCRIPT"
fi

echo "👀 Watching $README for changes..."
echo "Press Ctrl+C to stop"

# Use fswatch if available, otherwise fall back to a simple polling mechanism
if command -v fswatch &> /dev/null; then
  # fswatch is available (macOS with Homebrew, some Linux)
  fswatch -o "$README" | while read -r; do
    echo "📝 Change detected in $README, syncing..."
    "$SYNC_SCRIPT"
  done
else
  # Simple polling fallback (less efficient)
  LAST_MODIFIED=$(stat -c %Y "$README" 2>/dev/null || stat -f %m "$README" 2>/dev/null)
  
  while true; do
    sleep 2
    CURRENT_MODIFIED=$(stat -c %Y "$README" 2>/dev/null || stat -f %m "$README" 2>/dev/null)
    
    if [ "$CURRENT_MODIFIED" != "$LAST_MODIFIED" ]; then
      echo "📝 Change detected in $README, syncing..."
      "$SYNC_SCRIPT"
      LAST_MODIFIED=$CURRENT_MODIFIED
    fi
  done
fi
