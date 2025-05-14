# Contributing to azurepwq.github.io
<!-- Version: v1.0.0 -->
<!-- Last Updated: 2025-05-14 -->

Thank you for your interest in contributing to my personal website! This document provides guidelines for contributing to this project.

## Getting Started

For detailed technical information including environment setup, please refer to our [Development Guide](DEVELOPMENT.md).

## Contribution Process

1. **Fork and clone** the repository
2. **Set up** your development environment (see [Development Guide](DEVELOPMENT.md))
3. **Create a branch** for your feature or fix
4. **Make your changes** following the guidelines below
5. **Submit a pull request** with a clear description of the changes

## Contribution Guidelines

### Content Contributions

- Update content in README.md (the main content source)
- Follow the existing style and formatting
- Keep external links properly formatted with descriptive text

### Code Contributions

- Maintain consistent code style with the existing codebase
- Add appropriate comments for complex logic
- Ensure responsive design works on all device sizes
- Test changes in multiple browsers before submitting

### Commit Message Format

Use the following prefixes for commit messages:

- `Add:` for new features or content
- `Fix:` for bug fixes
- `Update:` for non-breaking changes
- `Refactor:` for code refactoring without functionality changes
- `Docs:` for documentation updates
- `Style:` for formatting, missing semi-colons, etc.
- `Test:` for adding or updating tests

Examples:
```
Add: contact information to README
Fix: mobile display issues in navbar
Docs: update setup instructions in DEVELOPMENT.md
```

#### Commit Tools

We provide helpful tools to assist with creating properly formatted commits:

1. **Interactive Commit Helper**:
   ```
   npm run commit
   ```
   This tool guides you through the commit process with interactive prompts.

2. **Standard Git Commit**:
   ```
   git commit -m "Type: Your message"
   ```
   You can also use standard git commands directly.

Both methods will validate your commit message format against our standards.

#### Automatic Versioning

This project uses automatic versioning based on conventional commits:

1. **Automatic Release**:
   ```
   npm run release
   ```
   This will automatically increment the version based on commit types (Add = minor, Fix = patch).

2. **Specific Version Bumps**:
   ```
   npm run release:patch  # 1.1.0 -> 1.1.1
   npm run release:minor  # 1.1.0 -> 1.2.0
   npm run release:major  # 1.1.0 -> 2.0.0
   ```

Running these commands will:
- Update the version in package.json
- Update CHANGELOG.md with all commits since the last version
- Create a new git tag for the version
- Create a new commit with the version changes

## Testing Before Submission

Before submitting changes:

1. Test on multiple browsers (Chrome, Firefox, Safari)
2. Test on mobile devices or using responsive design mode
3. Verify Service Worker updates content correctly (if applicable)
4. Check for console errors

## Questions?

If you have any questions or need help, please open an issue or contact me via email.

Thank you for contributing! 