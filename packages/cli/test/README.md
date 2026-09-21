# SkillProof CLI Tests
# Test directory for CLI functionality

This directory contains test fixtures and test files for the SkillProof CLI.

## Fixtures

### clean-skill
A minimal, clean skill directory for testing basic scanning functionality.
Contains only a simple README.md with frontmatter and no potentially risky capabilities.

### evil-diff-skill
A skill with potentially risky capabilities for testing diff detection.
Contains various network, exec, and filesystem capabilities that should be flagged as security concerns.

## Test Structure

Tests are written using Node's built-in test system and follow the pattern:
- Test each CLI command individually
- Verify exit codes and output
- Test success and error scenarios
- Test diff detection for new/modified capabilities

## Testing

Run tests using:
```bash
npm test
```

Or run TypeScript tests:
```bash
vitest
```

The tests verify that the scanner correctly identifies capabilities, that the diff processor detects changes, and that the ledger can store and retrieve attestations.