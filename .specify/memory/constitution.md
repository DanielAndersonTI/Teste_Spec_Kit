# Simple BMI Calculator Constitution

## Core Principles

### I. Vanilla JavaScript (NO FRAMEWORKS)
Every feature is implemented using pure JavaScript (ES6+) without any frameworks or libraries. No jQuery, no Vue, no React. The codebase remains lightweight, fast, and easy to understand.

### II. Clean Code & English Naming
All variable names, functions, comments, and identifiers must be in English. Code must be readable, well-structured, and follow consistent naming conventions (camelCase for functions/variables, descriptive names). Self-documenting code is preferred.

### III. Simplicity First (YAGNI)
Implement only what is needed for a functional BMI calculator. No unnecessary features, no over-engineering. The application should solve one problem well: calculate BMI from height and weight inputs.

### IV. Responsive Design & Accessibility
UI must work seamlessly on desktop and mobile devices. Clean, minimal design with good contrast and readable fonts. User experience is paramount; interaction should be intuitive.

### V. Test-Driven Development (Core Logic)
BMI calculation logic must be covered by unit tests before implementation. Tests validate edge cases (invalid inputs, boundary values, unit conversions).

## Technology Stack

**Frontend:**
- HTML5: Semantic markup, accessibility attributes
- CSS3: Flexbox/Grid for responsive layout, custom properties for theming
- JavaScript (Vanilla ES6+): No frameworks, no build tools required
- File-based architecture (HTML, CSS, JS as separate files)

**Testing:**
- Jest or Vitest for unit tests
- Manual testing for UI/UX validation

**Browser Support:**
- Modern browsers (Chrome, Firefox, Safari, Edge) - ES6+ support required

**No External Dependencies:** The application runs directly in any modern browser without npm, webpack, or build steps.

## Development Workflow

**Feature Development:**
1. Write acceptance criteria (examples of inputs/outputs)
2. Write unit tests first (Red phase)
3. Implement functionality (Green phase)
4. Refactor for clean code (Refactor phase)
5. Manual testing on desktop and mobile
6. Code review for English naming and code quality

**File Structure:**
- `index.html` - Structure and markup
- `styles.css` - Styling and responsive design
- `calculator.js` - Core BMI calculation logic (testable)
- `ui.js` - DOM manipulation and user interaction
- `tests/` - Unit test files
- `README.md` - Usage and feature documentation

**Quality Gates:**
- All code must have only English identifiers
- BMI logic must have 100% test coverage
- Code must pass linting (consistent style)
- Responsive design must work on 320px (mobile) to 1920px (desktop)

## Governance

This constitution defines the non-negotiable standards for the Simple BMI Calculator project. All code must comply with these principles. English naming is mandatory. Vanilla JavaScript requirement cannot be waived. Test coverage for calculation logic is mandatory. Simplicity supersedes feature creep.

**Version**: 1.0.0 | **Ratified**: 2026-03-23 | **Last Amended**: 2026-03-23
