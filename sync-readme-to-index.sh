#!/bin/bash

# sync-readme-to-index.sh
# This script copies the content from README.md to index.md
# while preserving the front matter in index.md

# Define the files
README="README.md"
INDEX="index.md"
TEMP_FILE=$(mktemp)

# Check if README exists
if [ ! -f "$README" ]; then
  echo "Error: $README does not exist"
  exit 1
fi

# Check if index.md exists, create it with default front matter if not
if [ ! -f "$INDEX" ]; then
  echo "Creating new $INDEX with default front matter"
  cat > "$INDEX" << EOL
---
layout: default
title: Azure PWQ
---

EOL
fi

# Extract front matter from index.md (everything between the first two '---' lines)
sed -n '/^---$/,/^---$/p' "$INDEX" > "$TEMP_FILE"

# Append README.md content after the front matter
cat "$README" >> "$TEMP_FILE"

# Replace index.md with the new content
cp "$TEMP_FILE" "$INDEX"
rm "$TEMP_FILE"

echo "Successfully synced $README to $INDEX" 