#!/bin/bash

# watch-and-sync.sh
# This script watches for changes to README.md and syncs them to _pages/home.md

README="README.md"
HOME_PAGE="_pages/home.md"

# Check if watchman is installed
if ! command -v watchman &> /dev/null; then
    echo "Error: watchman is not installed. Please install it to use this script."
    echo "On macOS: brew install watchman"
    echo "On Linux: https://facebook.github.io/watchman/docs/install.html"
    exit 1
fi

# Use watchman to monitor README.md for changes
echo "Setting up watchman to monitor $README for changes..."
watchman watch-del-all
watchman watch $(pwd)

# Define a trigger to run the sync script when README.md changes
watchman -j <<-EOT
["trigger", "$(pwd)", {
  "name": "sync-readme",
  "expression": ["name", "$README", "wholename"],
  "command": ["./scripts/sync-readme-to-index.sh"]
}]
EOT

echo "Watching $README for changes. Changes will be synced to $HOME_PAGE."
echo "Press Ctrl+C to stop watching."

# Keep the script running until interrupted
while true; do
    sleep 1
done
