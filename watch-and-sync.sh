#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Starting watch script for README.md changes...${NC}"
echo -e "${BLUE}Jekyll server should be running in a separate terminal.${NC}"
echo -e "${BLUE}Press Ctrl+C to stop watching.${NC}"

# Initial sync
echo -e "${GREEN}Initial sync of README.md to index.md...${NC}"
./sync-readme-to-index.sh

# Watch for changes in README.md
while true; do
  # Use fswatch if available, otherwise fall back to basic while loop
  if command -v fswatch >/dev/null 2>&1; then
    fswatch -o README.md | while read f; do
      echo -e "${GREEN}README.md changed, syncing to index.md...${NC}"
      ./sync-readme-to-index.sh
      echo -e "${GREEN}Done! Jekyll should automatically rebuild.${NC}"
    done
    break
  else
    # Fall back to simple polling if fswatch is not available
    LAST_MODIFIED=$(stat -f "%m" README.md)
    sleep 2
    NEW_MODIFIED=$(stat -f "%m" README.md)
    
    if [ "$LAST_MODIFIED" != "$NEW_MODIFIED" ]; then
      echo -e "${GREEN}README.md changed, syncing to index.md...${NC}"
      ./sync-readme-to-index.sh
      echo -e "${GREEN}Done! Jekyll should automatically rebuild.${NC}"
    fi
  fi
done 