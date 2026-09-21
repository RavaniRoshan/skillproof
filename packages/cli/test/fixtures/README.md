# SkillProof CLI Tests
# Test directory for CLI functionality

## Fixtures

This directory contains test fixtures for SkillProof CLI testing:

### clean-skill/
A minimal, clean skill directory for testing basic scanning functionality. Contains only a simple README.md with frontmatter and no potentially risky capabilities.

### evil-diff-skill/
A skill with potentially risky capabilities for testing diff detection. Contains various network, exec, and filesystem capabilities that should be flagged as security concerns.

## Test Structure

Tests are written using Vitest and follow the pattern:
- Test each CLI command individually
- Verify exit codes and output
- Test success and error scenarios
- Test diff detection for new/modified capabilities