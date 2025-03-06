import React from 'react';
import { render } from '@testing-library/react';

// Custom render function to include providers if needed
function customRender(ui, options = {}) {
  return render(ui, {
    // Wrap with providers if needed (e.g., ThemeProvider, etc.)
    wrapper: ({ children }) => children,
    ...options,
  });
}

// Re-export everything from React Testing Library
export * from '@testing-library/react';

// Override render with custom render
export { customRender as render }; 