#!/bin/bash

# sync-readme-to-index.sh
# This script copies the content from README.md to _pages/home.md
# while preserving the front matter in _pages/home.md

# Exit immediately if a command exits with a non-zero status
set -e

# Define the files
README="README.md"
HOME_PAGE="_pages/home.md"
TEMP_FILE=$(mktemp)

echo "Starting sync from $README to $HOME_PAGE..."

# Check if README exists
if [ ! -f "$README" ]; then
  echo "Error: $README does not exist"
  exit 1
fi

echo "Found $README"

# Check if _pages/home.md exists, create it with default front matter if not
if [ ! -f "$HOME_PAGE" ]; then
  echo "Creating new $HOME_PAGE with default front matter"
  cat > "$HOME_PAGE" << EOL
---
layout: default
title: azurepwq
permalink: /
---

EOL
else
  echo "Found existing $HOME_PAGE"
fi

# Extract front matter from _pages/home.md (everything between the first two '---' lines)
echo "Extracting front matter from $HOME_PAGE..."
sed -n '/^---$/,/^---$/p' "$HOME_PAGE" > "$TEMP_FILE"
echo "Front matter extracted successfully."

# Append README.md content after the front matter
echo "Appending content from $README..."
cat "$README" >> "$TEMP_FILE"

# Replace _pages/home.md with the new content
echo "Updating $HOME_PAGE with new content..."
cp "$TEMP_FILE" "$HOME_PAGE"
rm "$TEMP_FILE"

echo "Successfully synced $README to $HOME_PAGE"
echo "Sync completed at $(date)" 