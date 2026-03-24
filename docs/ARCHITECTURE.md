# Architecture Documentation

## System Overview

The BMI Calculator is a single-page web application built with vanilla JavaScript, following a modular architecture that separates concerns into distinct layers: presentation, business logic, and data validation.

## Separation of Responsibilities

### Presentation Layer (`index.html`, `src/ui.js`, `src/styles.css`)

- **HTML (`index.html`)**: Provides the semantic structure and accessibility features
- **UI Logic (`src/ui.js`)**: Handles user interactions, DOM manipulation, and event listeners
- **Styling (`src/styles.css`)**: Manages visual presentation and responsive design

### Business Logic Layer (`src/calculator.js`)

- **Calculation Functions**: Pure functions for BMI computation and classification
- **Validation**: Input validation with detailed error reporting
- **Data Processing**: Healthy weight range calculations

### Testing Layer (`tests/`)

- **Unit Tests**: Comprehensive test coverage for all business logic functions
- **Test Configuration**: Jest setup with coverage reporting

## Data Flow

```
User Input → UI Event Handler → Input Validation → BMI Calculation → Classification → Result Display
     ↓              ↓              ↓              ↓              ↓              ↓
  Form Data → validateInput() → calculateBMI() → classifyBMI() → displayResult()
```

### Detailed Flow:

1. **User Interaction**: User enters weight and height, clicks calculate button
2. **Event Handling**: `handleCalculate()` in `ui.js` captures the event
3. **Input Validation**: `calculator.validateInput()` checks data validity
4. **Error Handling**: If invalid, display error message with `role="alert"`
5. **BMI Calculation**: `calculator.calculateBMI()` computes the BMI value
6. **Classification**: `calculator.classifyBMI()` determines category and styling
7. **Range Calculation**: `calculator.getHealthyWeightRange()` computes healthy weight
8. **Result Display**: `displayResult()` updates the UI with `aria-live="polite"`

## Component Architecture

### Calculator Module (`src/calculator.js`)

```javascript
const calculator = {
  calculateBMI(weight, height),      // Pure calculation function
  classifyBMI(bmi),                  // Classification with WHO standards
  validateInput(weight, height),     // Input validation
  getHealthyWeightRange(height)      // Healthy weight computation
};
```

### UI Module (`src/ui.js`)

```javascript
// Event handlers
handleCalculate()  // Main calculation workflow
showError()        // Error message display
clearError()       // Error message removal
displayResult()    // Result card update
clearForm()        // Form reset
```

## Design Patterns

- **Module Pattern**: ES6 modules for encapsulation
- **Observer Pattern**: Event listeners for user interactions
- **Factory Pattern**: BMI classification returns structured objects
- **Strategy Pattern**: Different validation strategies for inputs

## Adding New Features

### Adding a New BMI Category

1. Update `classifyBMI()` in `calculator.js` with new ranges
2. Add corresponding tests in `calculator.test.js`
3. Update UI styling if needed in `styles.css`

### Adding New Input Fields

1. Add HTML input in `index.html` with proper labels and ARIA attributes
2. Update `validateInput()` to handle new field
3. Modify `handleCalculate()` to process new input
4. Add tests for new validation logic

### Adding New Calculation Types

1. Create new pure function in `calculator.js`
2. Export from module
3. Import and use in `ui.js`
4. Add comprehensive unit tests

## Performance Considerations

- **Pure Functions**: All calculation logic is side-effect free
- **Minimal DOM Manipulation**: Updates only necessary elements
- **Efficient Event Handling**: Single event listeners with delegation
- **Lightweight Bundle**: No external dependencies except for testing

## Accessibility Architecture

- **Semantic HTML**: Proper form structure with labels
- **ARIA Attributes**: Screen reader support with live regions
- **Keyboard Navigation**: Full keyboard accessibility
- **Color Independence**: Information conveyed through multiple channels
- **Error Announcements**: Dynamic error messages with alert role

## Testing Strategy

- **Unit Tests**: 100% coverage of calculator functions
- **Integration Tests**: UI interaction testing
- **Accessibility Tests**: Manual verification with screen readers
- **Cross-browser Testing**: Chrome, Firefox, Safari, Edge support