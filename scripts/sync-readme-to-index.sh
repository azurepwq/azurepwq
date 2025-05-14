#!/bin/bash

# sync-readme-to-index.sh
# This script copies the content from README.md to index.md
# while preserving the front matter in index.md

# Exit immediately if a command exits with a non-zero status
set -e

# Define the files
README="README.md"
INDEX="index.md"
TEMP_FILE=$(mktemp)

echo "Starting sync from $README to $INDEX..."

# Check if README exists
if [ ! -f "$README" ]; then
  echo "Error: $README does not exist"
  exit 1
fi

echo "Found $README"

# Check if index.md exists, create it with default front matter if not
if [ ! -f "$INDEX" ]; then
  echo "Creating new $INDEX with default front matter"
  cat > "$INDEX" << EOL
---
layout: default
title: azurepwq
---

EOL
else
  echo "Found existing $INDEX"
fi

# Extract front matter from index.md (everything between the first two '---' lines)
echo "Extracting front matter from $INDEX..."
sed -n '/^---$/,/^---$/p' "$INDEX" > "$TEMP_FILE"
echo "Front matter extracted successfully."

# Append README.md content after the front matter
echo "Appending content from $README..."
cat "$README" >> "$TEMP_FILE"

# Replace index.md with the new content
echo "Updating $INDEX with new content..."
cp "$TEMP_FILE" "$INDEX"
rm "$TEMP_FILE"

echo "Successfully synced $README to $INDEX"
echo "Sync completed at $(date)" 