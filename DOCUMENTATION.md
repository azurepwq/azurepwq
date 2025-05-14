# Documentation Maintenance Guide
<!-- Version: v1.0.0 -->
<!-- Last Updated: 2025-05-14 -->

This guide provides standards and processes for maintaining project documentation, helping to ensure consistency, accuracy, and timeliness.

## Document Structure

The project documentation is structured as follows:

- **README.md** - Personal introduction and contact information (for visitors)
- **CONTRIBUTING.md** - Contribution process and guidelines (for contributors)
- **DEVELOPMENT.md** - Technical details and development guide (for developers)
- **CHANGELOG.md** - Version history and change records
- **DOCUMENTATION.md** - This document, providing documentation maintenance guidelines

## Maintenance Process

### Version Control

All documentation should include version information and last updated date in the following format:

```markdown
<!-- Version: v1.0.0 -->
<!-- Last Updated: YYYY-MM-DD -->
```

### Quarterly Review

A documentation review should be conducted quarterly (March, June, September, December) to ensure documentation stays in sync with code:

1. Use the `scripts/doc-health-check.sh` script for automated checks
2. Use the `.github/doc-templates/quarterly-review.md` template to record review results
3. Update documentation based on the review results

### Adding New Feature Documentation

When adding new features, use the following process to create documentation:

1. Use the `.github/doc-templates/new-feature.md` template
2. Fill in all necessary information, including feature description, technical implementation, and usage instructions
3. Add references to the new feature in relevant documents (e.g., DEVELOPMENT.md)
4. Record the new feature in CHANGELOG.md

### Documenting Bug Fixes

When fixing important bugs, use the following process to document them:

1. Use the `.github/doc-templates/bug-fix.md` template
2. Thoroughly document the issue description, solution, and testing methods
3. Record the fix in CHANGELOG.md

## Documentation Style Guide

### Formatting Rules

- Use Markdown format
- Use hierarchical structure for headings (# ## ### ####)
- Use triple backticks with language identifiers for code blocks (```javascript)
- Use Markdown format for links `[link text](URL)`

### Content Guidelines

- Use clear and concise language
- Provide specific examples and code samples
- Include sufficient context information
- Avoid technical jargon; if necessary, provide explanations

## Automation Tools

The project includes the following automated tools to help maintain documentation:

### GitHub Actions

- `.github/workflows/document-check.yml` - Checks document links, version information, and CHANGELOG updates

### Scripts

- `scripts/doc-health-check.sh` - Performs documentation health checks

## Templates

The project provides the following documentation templates:

- `.github/doc-templates/new-feature.md` - New feature documentation template
- `.github/doc-templates/bug-fix.md` - Bug fix documentation template
- `.github/doc-templates/quarterly-review.md` - Quarterly review document template

## Issues and Improvements

If you find errors or areas for improvement in the documentation, please create an Issue or submit a PR using the `.github/ISSUE_TEMPLATE/documentation.md` template. 