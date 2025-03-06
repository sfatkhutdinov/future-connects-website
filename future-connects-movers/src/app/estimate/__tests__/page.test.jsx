import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EstimatePage from '../page';

// Mock the useState hook for controlled testing
jest.mock('react', () => {
  const originalReact = jest.requireActual('react');
  return {
    ...originalReact,
    useState: jest.fn(initialValue => [initialValue, jest.fn()]),
  };
});

describe('EstimatePage Component', () => {
  beforeEach(() => {
    // Reset the useState mock before each test
    React.useState.mockClear();
  });

  it('renders the estimate page correctly', () => {
    // Use fixed values for useState to easily test the component
    React.useState.mockImplementation((init) => {
      if (typeof init === 'object' && init.moveType) {
        // This is for formData
        return [{
          moveType: 'residential',
          moveSize: 'studio',
          distance: '0-50',
          hasElevator: false,
          needsPacking: false,
          needsStorage: false,
          needsSpecialItems: false
        }, jest.fn()];
      }
      // This is for showEstimate
      return [false, jest.fn()];
    });

    render(<EstimatePage />);
    
    // Check if title and description are present
    expect(screen.getByText(/Get a Moving Estimate/i)).toBeInTheDocument();
    expect(screen.getByText(/Fill out the form below to receive an instant estimate/i)).toBeInTheDocument();
    
    // Check if form fields are present
    expect(screen.getByLabelText(/Type of Move/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Size of Home/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Moving Distance/i)).toBeInTheDocument();
    
    // Check for the submit button
    expect(screen.getByRole('button', { name: /Calculate Estimate/i })).toBeInTheDocument();
  });

  it('shows estimate when form is submitted', async () => {
    // Mock the state values to control the test
    let showEstimateValue = false;
    const setShowEstimate = jest.fn((value) => {
      showEstimateValue = value;
    });

    React.useState.mockImplementation((init) => {
      if (typeof init === 'object' && init.moveType) {
        // This is for formData
        return [{
          moveType: 'residential',
          moveSize: 'studio',
          distance: '0-50',
          hasElevator: false,
          needsPacking: false,
          needsStorage: false,
          needsSpecialItems: false
        }, jest.fn()];
      }
      // This is for showEstimate
      return [showEstimateValue, setShowEstimate];
    });

    render(<EstimatePage />);
    
    // Get the form and submit button
    const form = screen.getByRole('form');
    const submitButton = screen.getByRole('button', { name: /Calculate Estimate/i });
    
    // Submit the form
    fireEvent.submit(form);
    
    // Check if setShowEstimate was called with true
    expect(setShowEstimate).toHaveBeenCalledWith(true);
  });

  it('calculates estimate correctly based on form data', () => {
    // Mock useState to provide controlled form data
    const formData = {
      moveType: 'residential',
      moveSize: 'studio',
      distance: '0-50',
      hasElevator: false,
      needsPacking: true, // Adding packing service
      needsStorage: false,
      needsSpecialItems: false
    };

    React.useState.mockImplementation((init) => {
      if (typeof init === 'object' && init.moveType) {
        // This is for formData
        return [formData, jest.fn()];
      }
      // This is for showEstimate - set to true to show the estimate
      return [true, jest.fn()];
    });

    render(<EstimatePage />);
    
    // For a studio apartment with packing services, the base price should be 400 + 300 = 700
    // The estimate range should be 630-770 (±10%)
    expect(screen.getByText(/\$630 - \$770/i)).toBeInTheDocument();
    
    // Check if the estimate includes packing services
    expect(screen.getByText(/Professional packing services/i)).toBeInTheDocument();
  });

  it('updates form data when inputs change', async () => {
    const user = userEvent.setup();
    let formData = {
      moveType: 'residential',
      moveSize: 'studio',
      distance: '0-50',
      hasElevator: false,
      needsPacking: false,
      needsStorage: false,
      needsSpecialItems: false
    };
    const setFormData = jest.fn((updater) => {
      if (typeof updater === 'function') {
        formData = updater(formData);
      } else {
        formData = updater;
      }
    });

    React.useState.mockImplementation((init) => {
      if (typeof init === 'object' && init.moveType) {
        // This is for formData
        return [formData, setFormData];
      }
      // This is for showEstimate
      return [false, jest.fn()];
    });

    render(<EstimatePage />);
    
    // Change the move type to commercial
    const moveTypeSelect = screen.getByLabelText(/Type of Move/i);
    await user.selectOptions(moveTypeSelect, ['commercial']);
    
    // Check if setFormData was called
    expect(setFormData).toHaveBeenCalled();
  });
}); 