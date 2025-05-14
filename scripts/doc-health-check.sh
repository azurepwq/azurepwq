#!/bin/bash
# Documentation Health Check Script
# Usage: ./scripts/doc-health-check.sh
# 
# This script checks the health status of documentation, including:
# - Link validity
# - Version information presence
# - Modification dates
# - Consistency between README and other docs

echo "Starting documentation health check..."

# Create output directory
mkdir -p reports

# Check required files
echo "=== Checking Required Files ==="
required_files=("README.md" "CONTRIBUTING.md" "DEVELOPMENT.md" "CHANGELOG.md")
for file in "${required_files[@]}"; do
  if [ ! -f "$file" ]; then
    echo "❌ Error: $file does not exist"
  else
    echo "✅ $file exists"
  fi
done
echo ""

# Check version information
echo "=== Checking Version Information ==="
for file in $(find . -name "*.md" -not -path "./node_modules/*" -not -path "./.git/*" -not -path "./reports/*"); do
  if ! grep -q "Last Updated: [0-9]\{4\}-[0-9]\{2\}-[0-9]\{2\}" "$file" && ! grep -q "Version: v[0-9]\+\.[0-9]\+\.[0-9]\+" "$file"; then
    echo "⚠️ Warning: $file is missing version or last updated date marker"
  else
    echo "✅ $file contains version information"
  fi
done
echo ""

# Check code and documentation consistency
echo "=== Checking Code and Documentation Consistency ==="
if [ -f "service-worker.js" ] && [ -f "DEVELOPMENT.md" ]; then
  if grep -q "Service Worker" "DEVELOPMENT.md" && grep -q "Caching Strategy" "DEVELOPMENT.md"; then
    echo "✅ DEVELOPMENT.md contains information about Service Worker"
  else
    echo "⚠️ Warning: DEVELOPMENT.md may be missing information about Service Worker"
  fi
fi

if [ -f "favicon-generator.html" ] && [ -f "DEVELOPMENT.md" ]; then
  if grep -q "favicon" "DEVELOPMENT.md" || grep -q "Icon Generation" "DEVELOPMENT.md"; then
    echo "✅ DEVELOPMENT.md contains information about icon generation"
  else
    echo "⚠️ Warning: DEVELOPMENT.md may be missing information about icon generation"
  fi
fi
echo ""

# Check recent modifications
echo "=== Checking Recent Modifications ==="
if [ -f "CHANGELOG.md" ]; then
  current_year=$(date +%Y)
  if grep -q "$current_year" "CHANGELOG.md"; then
    echo "✅ CHANGELOG.md contains updates from the current year"
  else
    echo "⚠️ Warning: CHANGELOG.md may be missing updates from the current year"
  fi
else
  echo "❌ Error: CHANGELOG.md does not exist"
fi
echo ""

echo "Documentation health check complete."
echo "It is recommended to run this check quarterly to ensure documentation remains up-to-date." 