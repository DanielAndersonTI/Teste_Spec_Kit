# Testing Documentation

## Overview

This project uses Jest as the testing framework to ensure code quality and reliability. The test suite achieves 95%+ code coverage with comprehensive unit tests for all business logic functions.

## Running Tests

### Basic Test Execution

```bash
# Run all tests once
npm test

# Run tests in watch mode (re-runs on file changes)
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Test Output

Successful test run shows:
```
PASS  tests/calculator.test.js
✓ calculateBMI returns correct value for normal inputs (4ms)
✓ calculateBMI handles edge cases
✓ classifyBMI returns correct classification
...

Test Suites: 1 passed, 1 total
Tests: 15 passed, 15 total
Snapshots: 0 total
Time: 0.5s
```

## Test Structure

### Test Files

- `tests/calculator.test.js`: Unit tests for core calculation functions
- `tests/setup.test.js`: Test environment setup and global mocks

### Test Organization

Tests are organized by function with descriptive names:

```javascript
describe('calculateBMI()', () => {
  test('returns correct value for normal inputs', () => {
    // Test implementation
  });

  test('handles invalid inputs', () => {
    // Test implementation
  });
});
```

## Writing New Tests

### Test File Template

```javascript
const calculator = require('../src/calculator');

describe('Function Name', () => {
  test('should description', () => {
    // Arrange
    const input = value;

    // Act
    const result = calculator.functionName(input);

    // Assert
    expect(result).toBe(expectedValue);
  });
});
```

### Test Categories

1. **Happy Path Tests**: Normal input scenarios
2. **Edge Case Tests**: Boundary values and special cases
3. **Error Handling Tests**: Invalid inputs and error conditions
4. **Integration Tests**: Function interactions

### Example Test Cases

```javascript
// Happy path
test('calculateBMI returns 22.9 for 70kg and 1.75m', () => {
  expect(calculator.calculateBMI(70, 1.75)).toBe(22.9);
});

// Edge case
test('calculateBMI handles floating point precision', () => {
  expect(calculator.calculateBMI(70.5, 1.752)).toBe(22.8);
});

// Error handling
test('calculateBMI returns null for invalid weight', () => {
  expect(calculator.calculateBMI(-5, 1.75)).toBeNull();
});
```

## Coverage Report

### Generating Coverage

```bash
npm run test:coverage
```

### Coverage Output

The coverage report shows:
- **Statements**: Executed code lines
- **Branches**: Conditional logic coverage
- **Functions**: Function call coverage
- **Lines**: Individual line coverage

### Target Coverage

- **Overall**: ≥ 95%
- **Functions**: 100%
- **Statements**: ≥ 95%
- **Branches**: ≥ 90%

### Coverage Configuration

Jest configuration in `jest.config.js`:

```javascript
module.exports = {
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/*.test.js'
  ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 100,
      lines: 95,
      statements: 95
    }
  }
};
```

## Test-Driven Development (TDD)

### TDD Workflow

1. **Write Test First**: Create failing test for new feature
2. **Run Test**: Confirm it fails
3. **Implement Feature**: Write minimal code to pass test
4. **Run Test**: Verify it passes
5. **Refactor**: Improve code while keeping tests passing
6. **Repeat**: Add more tests for edge cases

### Example TDD Session

```javascript
// 1. Write failing test
test('calculateBMI rounds to 1 decimal place', () => {
  expect(calculator.calculateBMI(70, 1.75)).toBe(22.9);
});

// 2. Implement minimal solution
function calculateBMI(weight, height) {
  return Math.round((weight / (height * height)) * 10) / 10;
}

// 3. Test passes
// 4. Add more tests for edge cases
```

## Mocking and Stubs

### DOM Mocking

For UI tests, mock DOM elements:

```javascript
// Mock DOM elements
document.body.innerHTML = `
  <input id="weightInput" value="70">
  <input id="heightInput" value="1.75">
  <div id="resultCard"></div>
`;

// Test UI function
test('displayResult updates DOM correctly', () => {
  displayResult(22.9, { category: 'Normal' }, { min: 56.4, max: 75.7 });

  expect(document.getElementById('resultCard').textContent)
    .toContain('22.9');
});
```

## Continuous Integration

### GitHub Actions Setup

Create `.github/workflows/test.yml`:

```yaml
name: Test
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run test:coverage
```

### Pre-commit Hooks

Use Husky for pre-commit testing:

```bash
npm install --save-dev husky
npx husky install
npx husky add .husky/pre-commit "npm test"
```

## Debugging Tests

### Common Issues

1. **Test Timeout**: Increase timeout for async operations
2. **Import Errors**: Check file paths and module exports
3. **Coverage Gaps**: Add tests for uncovered lines
4. **Flaky Tests**: Use proper setup/teardown

### Debugging Tools

- **Jest Watch Mode**: `npm run test:watch`
- **Verbose Output**: `npm test -- --verbose`
- **Debug Specific Test**: `npm test -- testName`
- **Coverage Details**: Open `coverage/lcov-report/index.html`

## Best Practices

- **Descriptive Names**: Use clear test and describe names
- **Single Responsibility**: Each test should verify one behavior
- **Arrange-Act-Assert**: Follow AAA pattern
- **DRY Principle**: Extract common setup into beforeEach
- **Fast Tests**: Keep tests under 100ms each
- **Independent Tests**: No test should depend on others

## Performance Testing

### Load Testing

```javascript
test('calculateBMI performance', () => {
  const start = Date.now();
  for (let i = 0; i < 10000; i++) {
    calculator.calculateBMI(70, 1.75);
  }
  const end = Date.now();
  expect(end - start).toBeLessThan(100); // Under 100ms
});
```

## Accessibility Testing

### Manual Testing Checklist

- [ ] Keyboard navigation works
- [ ] Screen reader announces results
- [ ] Color contrast meets WCAG AA
- [ ] Form validation messages are announced
- [ ] Focus management is correct

### Automated Accessibility Testing

```javascript
// Example with axe-core
const axe = require('axe-core');

test('page is accessible', async () => {
  const results = await axe.run(document.body);
  expect(results.violations).toHaveLength(0);
});
```