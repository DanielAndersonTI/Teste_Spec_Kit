# BMI Calculator

A simple and accessible BMI (Body Mass Index) calculator built with vanilla JavaScript. This application allows users to calculate their BMI based on weight and height, providing classification according to WHO standards and healthy weight range recommendations.

## Features

- **Accurate BMI Calculation**: Implements the standard BMI formula (weight in kg / height in m²)
- **WHO Classification**: Provides 6 BMI categories with color-coded indicators and emojis
- **Input Validation**: Validates weight (0-500 kg) and height (0.5-2.5 m) with user-friendly error messages
- **Healthy Weight Range**: Calculates and displays the ideal weight range for the user's height
- **Responsive Design**: Mobile-first design that works on all screen sizes (320px to 1920px)
- **Accessibility**: WCAG AA compliant with ARIA labels, keyboard navigation, and screen reader support
- **Comprehensive Testing**: 95%+ test coverage with Jest unit tests

## How to Use

1. Open `index.html` in your web browser
2. Enter your weight in kilograms
3. Enter your height in meters
4. Click "Calcular IMC" or press Enter
5. View your BMI result, classification, and healthy weight range
6. Use "Limpar" to reset the form

## Project Structure

```
bmi-calculator/
├── index.html              # Main HTML file
├── package.json            # Node.js dependencies and scripts
├── jest.config.js          # Jest testing configuration
├── TASKS.md                # Project roadmap and task tracking
├── TECHNICAL_PLAN.md       # Technical specifications
├── specs/
│   └── BMI_CALCULATOR.md   # Business requirements
├── src/
│   ├── calculator.js       # Core BMI calculation logic
│   ├── ui.js               # User interface event handlers
│   └── styles.css          # CSS styles
├── tests/
│   ├── calculator.test.js  # Unit tests for calculator functions
│   └── setup.test.js       # Test setup and mocks
└── docs/
    ├── ARCHITECTURE.md     # System architecture documentation
    ├── TESTING.md          # Testing guidelines
    └── DEPLOYMENT.md       # Deployment instructions
```

## Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Testing**: Jest framework with 95%+ coverage
- **Build Tools**: Node.js and npm for dependency management
- **Deployment**: GitHub Pages for hosting

## Testing

Run the test suite with the following commands:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## Deployment

The application can be deployed to GitHub Pages:

1. Push your code to a GitHub repository
2. Go to repository Settings → Pages
3. Select "Deploy from a branch" and choose `main` branch
4. Access your app at `https://[username].github.io/[repository-name]`

Alternatively, use the local development server:

```bash
npm run serve
```

Then open `http://localhost:8000` in your browser.

## References

- [World Health Organization (WHO) BMI Classification](https://www.who.int/europe/news-room/fact-sheets/item/a-healthy-lifestyle---who-recommendations)
- [BMI Calculator Formula](https://www.cdc.gov/healthyweight/assessing/bmi/adult_bmi/index.html)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Author**: Daniel Anderson de Souza  
**Version**: 1.0.0