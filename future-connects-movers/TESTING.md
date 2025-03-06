# Future Connects Movers - Testing Guide

This document provides a comprehensive guide to the testing setup for the Future Connects Movers application.

## Testing Stack

We've implemented a robust testing strategy that includes:

1. **Unit Tests** - Testing individual components in isolation (Jest + React Testing Library)
2. **Integration Tests** - Testing interactions between components (Jest + React Testing Library)
3. **End-to-End Tests** - Testing complete user flows (Cypress)

## Running Tests

### Jest Tests (Unit and Integration)

To run all Jest tests:

```bash
npm test
```

To run tests in watch mode (for development):

```bash
npm run test:watch
```

To run tests with coverage report:

```bash
npm run test:coverage
```

### Cypress Tests (End-to-End)

To open the Cypress test runner:

```bash
npm run cypress:open
```

To run Cypress tests headlessly (for CI):

```bash
npm run cypress:run
```

To run both the application and E2E tests:

```bash
npm run test:e2e
```

## Test Files Structure

### Jest Tests

Unit and integration tests are organized alongside the components they test:

```
src/
  components/
    layout/
      __tests__/
        Sidebar.test.jsx    # Tests for the Sidebar component
  app/
    __tests__/
      page.test.jsx         # Tests for the HomePage component
    about/
      __tests__/
        page.test.jsx       # Tests for the AboutPage component
    booking/
      __tests__/
        page.test.jsx       # Tests for the BookingPage component
    contact/
      __tests__/
        page.test.jsx       # Tests for the ContactPage component
    dashboard/
      __tests__/
        page.test.jsx       # Tests for the DashboardPage component
    estimate/
      __tests__/
        page.test.jsx       # Tests for the EstimatePage component
    services/
      __tests__/
        page.test.jsx       # Tests for the ServicesPage component
    tracking/
      __tests__/
        page.test.jsx       # Tests for the TrackingPage component
```

### Cypress Tests

End-to-end tests are organized by feature:

```
cypress/
  e2e/
    navigation.cy.js        # Tests for site navigation
    forms.cy.js             # Tests for form functionality
    responsive.cy.js        # Tests for responsive design
  support/
    commands.js             # Custom Cypress commands
    e2e.js                  # E2E test configuration
```

## Testing Approach

### Unit and Integration Tests

We use React Testing Library with Jest to test our components. Our approach follows these principles:

1. **Component Rendering** - Test if components render correctly with expected content
2. **User Interactions** - Test component behavior in response to user actions
3. **State Changes** - Test that components update properly when state changes
4. **Props Handling** - Test that components properly respond to different props

### End-to-End Tests

We use Cypress to test complete user flows. Our E2E tests cover:

1. **Navigation** - Testing navigation between pages
2. **Form Submissions** - Testing form filling and submission
3. **Responsive Design** - Testing the application at various screen sizes
4. **User Flows** - Testing complete user journeys like booking a move

## Test Utilities

We've created several utilities to help with testing:

1. **Custom Render Function** - A wrapper around RTL's render function that includes providers
2. **Cypress Commands** - Custom commands to simplify common operations in Cypress tests

## Mocking

For tests that require external dependencies, we use Jest's mocking capabilities:

1. **API Calls** - Mock API responses for predictable testing
2. **Next.js Features** - Mock Next.js router, Link component, etc.
3. **React Hooks** - Mock React hooks like useState for controlled testing

## Code Coverage

Run the coverage report to see test coverage:

```bash
npm run test:coverage
```

Our goal is to maintain high test coverage across the application, focusing on critical user flows and business logic.

## Continuous Integration

Tests are automatically run in our CI pipeline to ensure code quality. Any pull request must pass all tests before it can be merged.

## Adding New Tests

When adding new features, follow these guidelines for adding tests:

1. **Unit Tests** - Add tests for new components in the appropriate `__tests__` directory
2. **Integration Tests** - Add tests for component interactions
3. **E2E Tests** - If adding a new user flow, add Cypress tests to cover it

## Troubleshooting

If you encounter issues with the tests:

1. **Jest Tests** - Check for console errors, mocking issues, or DOM-related problems
2. **Cypress Tests** - Check selector accuracy, timing issues, or network request problems

## Best Practices

- Write tests that focus on user behavior, not implementation details
- Use data-testid attributes for elements that are hard to select
- Keep tests simple, focused, and meaningful
- Run tests regularly during development

By following this testing guide, we maintain a robust test suite that ensures the Future Connects Movers application works correctly for all users. 