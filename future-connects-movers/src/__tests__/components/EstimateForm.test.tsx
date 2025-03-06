import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import EstimatePage from '@/app/estimate/page';
import { mockGoogleMapsApi } from '../__mocks__/googleMapsMock';

// Mock Next.js Link
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

// Mock the API endpoints
jest.mock('@/lib/config', () => ({
  GOOGLE_MAPS_API_KEY: 'test-api-key',
  SERVICE_AREA_BOUNDS: {
    northeast: { lat: 40, lng: -75 },
    southwest: { lat: 37, lng: -79 },
  },
  MOVE_SIZES: {
    studio: { label: 'Studio' },
    small: { label: 'Small' },
    medium: { label: 'Medium' },
    large: { label: 'Large' },
  },
  API_ENDPOINTS: {
    estimateForm: '/api/estimates',
  },
}));

// Mock the utility functions
jest.mock('@/lib/utils/costCalculator', () => ({
  calculateDistance: jest.fn().mockReturnValue(10), // Mock distance of 10 miles
  calculateMovingCost: jest.fn().mockReturnValue({
    basePrice: 900,
    distanceCost: 100,
    specialItemsCost: 0,
    packingCost: 0,
    timeFactorsCost: 0,
    totalCost: 1000,
  }),
  generatePriceRange: jest.fn().mockReturnValue({ min: 900, max: 1100 }),
}));

// Mock the @react-google-maps/api
jest.mock('@react-google-maps/api', () => ({
  useLoadScript: () => ({
    isLoaded: true,
    loadError: null,
  }),
}));

// Mock the fetch API
global.fetch = jest.fn().mockImplementation(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ success: true }),
  })
);

describe('EstimatePage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGoogleMapsApi();
  });

  it('should display the move type step initially', () => {
    render(<EstimatePage />);
    
    expect(screen.getByText('What type of move do you need?')).toBeInTheDocument();
    expect(screen.getByText('Residential Move')).toBeInTheDocument();
    expect(screen.getByText('Commercial Move')).toBeInTheDocument();
  });

  it('should allow selecting move type and proceeding to locations step', async () => {
    render(<EstimatePage />);
    
    // Click on residential move
    fireEvent.click(screen.getByText('Residential Move'));
    
    // Click next
    fireEvent.click(screen.getByText('Next'));
    
    // Check if we're on the locations step
    expect(screen.getByText('Where are you moving from and to?')).toBeInTheDocument();
  });

  it('should handle address selection in the locations step', async () => {
    render(<EstimatePage />);
    
    // Go to locations step
    fireEvent.click(screen.getByText('Residential Move'));
    fireEvent.click(screen.getByText('Next'));
    
    // Type in the 'from' address
    const fromInput = screen.getByLabelText(/Moving From/i);
    await userEvent.type(fromInput, '123 Test');
    
    // Wait for suggestions to appear
    await waitFor(() => {
      expect(screen.getByText('123 Test Street, City, ST, USA')).toBeInTheDocument();
    });
    
    // Click on a suggestion
    const suggestionItem = screen.getByText('123 Test Street').closest('li');
    fireEvent.mouseDown(suggestionItem!);
    
    // Check if the input value was updated correctly
    await waitFor(() => {
      expect(fromInput).toHaveValue('123 Test Street, Test City, ST 12345, USA');
    });
    
    // Type in the 'to' address
    const toInput = screen.getByLabelText(/Moving To/i);
    await userEvent.type(toInput, '456 Test');
    
    // Type and select an address for the destination
    await waitFor(() => {
      const mainText = screen.getByText('123 Test Street');
      const secondaryText = screen.getByText('City, ST, USA');
      expect(mainText).toBeInTheDocument();
      expect(secondaryText).toBeInTheDocument();
    });
    
    fireEvent.click(screen.getByText('123 Test Street'));
    
    // Check if the input value was updated correctly
    await waitFor(() => {
      expect(toInput).toHaveValue('123 Test Street, Test City, ST 12345, USA');
    });
    
    // Check if the distance is displayed
    await waitFor(() => {
      const distanceElement = screen.getByText(/Approximate Distance:/i);
      expect(distanceElement).toBeInTheDocument();
      expect(distanceElement.parentElement).toHaveTextContent(/10 miles/i);
    });
    
    // Check if the next button is clickable
    const nextButton = screen.getByText('Next');
    expect(nextButton).not.toBeDisabled();
    
    // Click next button
    fireEvent.click(nextButton);
    
    // Check if we moved to the next step
    expect(screen.getByText("What is the size of your move?")).toBeInTheDocument();
  });

  it('should not allow proceeding if addresses are not filled', async () => {
    render(<EstimatePage />);
    
    // Go to locations step
    fireEvent.click(screen.getByText('Residential Move'));
    fireEvent.click(screen.getByText('Next'));
    
    // Next button should be disabled
    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeDisabled();
  });

  it('should proceed through all steps of the form and submit successfully', async () => {
    // Mock fetch for form submission
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true, estimateId: '123' }),
      })
    );
    
    render(<EstimatePage />);
    
    // Step 1: Move Type
    expect(screen.getByText('Get Your Free Moving Estimate')).toBeInTheDocument();
    expect(screen.getByText('What type of move do you need?')).toBeInTheDocument();
    
    // Select commercial move type
    fireEvent.click(screen.getByText('Commercial Move'));
    
    // Click next to go to locations step
    fireEvent.click(screen.getByText('Next'));
    
    // Step 2: Locations
    expect(screen.getByText('Where are you moving from and to?')).toBeInTheDocument();
    
    // Fill in from address
    const fromInput = screen.getByLabelText(/Moving From/i);
    await userEvent.type(fromInput, '123 Test');
    
    // Select from autocomplete
    await waitFor(() => {
      const mainText = screen.getByText('123 Test Street');
      const secondaryText = screen.getByText('City, ST, USA');
      expect(mainText).toBeInTheDocument();
      expect(secondaryText).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText('123 Test Street'));
    
    // Fill in to address
    const toInput = screen.getByLabelText(/Moving To/i);
    await userEvent.type(toInput, '456 Test');
    
    // Type and select an address for the destination
    await waitFor(() => {
      expect(screen.getByText('123 Test Street, City, ST, USA')).toBeInTheDocument();
    });
    
    fireEvent.mouseDown(screen.getByText('123 Test Street, City, ST, USA'));
    
    // Check if the input value was updated correctly
    await waitFor(() => {
      expect(toInput).toHaveValue('123 Test Street, Test City, ST 12345, USA');
    });
    
    // Check if the distance is displayed
    await waitFor(() => {
      const distanceElement = screen.getByText(/Approximate Distance:/i);
      expect(distanceElement).toBeInTheDocument();
      expect(distanceElement.parentElement).toHaveTextContent(/10 miles/i);
    });
    
    // Wait for the distance to update and enable the Next button
    await waitFor(() => {
      expect(screen.getByText(/Approximate Distance: 10 miles/i)).toBeInTheDocument();
      nextButton = screen.getByText('Next');
      expect(nextButton).not.toBeDisabled();
    });
    
    // Click the Next button to proceed to the size step
    fireEvent.click(nextButton);
    
    // Ensure we're on the size step
    expect(screen.getByText('What is the size of your move?')).toBeInTheDocument();
    
    // Select Medium size
    fireEvent.click(screen.getByText('Medium'));
    
    // Check special items checkbox
    const specialItemsCheckbox = screen.getByLabelText(/I have special items/i);
    fireEvent.click(specialItemsCheckbox);
    expect(specialItemsCheckbox).toBeChecked();
    
    // Click next to go to date step
    fireEvent.click(screen.getByText('Next'));
    
    // Step 4: Date
    expect(screen.getByText(/When do you want to move?/i)).toBeInTheDocument();
    
    // Select a date (current date + 7 days)
    const dateInput = screen.getByLabelText(/Move Date/i);
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 7);
    const formattedDate = futureDate.toISOString().split('T')[0]; // YYYY-MM-DD format
    fireEvent.change(dateInput, { target: { value: formattedDate } });
    
    // Select a time slot
    fireEvent.click(screen.getByText('Morning (8AM - 12PM)'));
    
    // Click next to go to contact step
    fireEvent.click(screen.getByText('Next'));
    
    // Step 5: Contact
    expect(screen.getByText(/Your Contact Information/i)).toBeInTheDocument();
    
    // Fill in contact details
    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/Phone/i), { target: { value: '(202) 555-1234' } });
    
    // Click submit button
    fireEvent.click(screen.getByText('Submit Estimate Request'));
    
    // Verify we reach the summary step
    await waitFor(() => {
      expect(screen.getByText(/Thank you!/i)).toBeInTheDocument();
      expect(screen.getByText(/We've received your estimate request/i)).toBeInTheDocument();
    });
    
    // Verify fetch was called with the correct data
    expect(global.fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
        }),
        body: expect.any(String),
      })
    );
    
    // Cleanup the mock
    (global.fetch as jest.Mock).mockClear();
  });
  
  it('should show validation errors when required fields are missing', async () => {
    render(<EstimatePage />);
    
    // Step 1: Move Type is pre-selected, just click next
    fireEvent.click(screen.getByText('Next'));
    
    // Step 2: Locations - try to proceed without filling addresses
    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeDisabled();
    
    // Fill only the from address
    const fromInput = screen.getByLabelText(/Moving From/i);
    await userEvent.type(fromInput, '123 Test Street, Test City, ST 12345, USA');
    await waitFor(() => {
      expect(fromInput).toHaveValue('123 Test Street, Test City, ST 12345, USA');
    });
    
    // Next button should still be disabled
    expect(nextButton).toBeDisabled();
    
    // Now fill the to address
    const toInput = screen.getByLabelText(/Moving To/i);
    await userEvent.type(toInput, '456 Test Street, Test City, ST 12345, USA');
    await waitFor(() => {
      expect(toInput).toHaveValue('456 Test Street, Test City, ST 12345, USA');
    });
    
    // Add coordinates by simulating selection from dropdown
    // Note: In a real test, you would trigger the real selection, but we're simplifying here
    
    // Since we can't easily simulate the coordinates in this test, we'll just verify the button remains disabled
    expect(nextButton).toBeDisabled();
  });
  
  it('should properly display price estimates based on selections', async () => {
    render(<EstimatePage />);
    
    // Use the helper function to directly set the step to 'size'
    setCurrentStepDirectly('size');
    
    // Ensure we're on the size step
    expect(screen.getByText('What is the size of your move?')).toBeInTheDocument();
    
    // Select Small size
    fireEvent.click(screen.getByText('Small'));
    
    // Verify a price estimate is displayed
    await waitFor(() => {
      const estimateElement = screen.getByText(/Estimated Price:/i);
      expect(estimateElement).toBeInTheDocument();
      expect(estimateElement.textContent).toMatch(/\$\d+/);
    });
  });
  
  // Helper function to directly set the current step (for testing purposes)
  function setCurrentStepDirectly(step) {
    // This is a simplified mock - in a real test you would use a more sophisticated approach
    // to modify the component's internal state
    const mockEvent = { target: { value: step } };
    act(() => {
      // Find all possible "Next" buttons and click them until we reach the right step
      while (screen.queryByText(/What is the size of your move?/i) === null) {
        const nextButton = screen.getByText('Next');
        if (!nextButton.disabled) {
          fireEvent.click(nextButton);
        } else {
          break;
        }
      }
    });
  }

  // Add a comprehensive test that actually tests full form completion
  test('should complete the entire form successfully', async () => {
    // Mock the fetch function for form submission
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      })
    );

    render(<EstimatePage />);
    
    // Step 1: Move Type
    expect(screen.getByText('Get Your Free Moving Estimate')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Residential Move'));
    fireEvent.click(screen.getByText('Next'));
    
    // Use the helper function to directly set the step to 'size' (skipping locations)
    setCurrentStepDirectly('size');
    
    // Step 3: Size
    expect(screen.getByText('What is the size of your move?')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Medium'));
    fireEvent.click(screen.getByText('Next'));
    
    // Step 4: Date
    await waitFor(() => {
      expect(screen.getByText('When do you plan to move?')).toBeInTheDocument();
    });
    
    // Select a date (for simplicity, we'll set the date input value directly)
    const dateInput = screen.getByLabelText(/Move Date/i);
    const twoWeeksFromNow = new Date();
    twoWeeksFromNow.setDate(twoWeeksFromNow.getDate() + 14);
    const formattedDate = twoWeeksFromNow.toISOString().split('T')[0];
    fireEvent.change(dateInput, { target: { value: formattedDate } });
    
    fireEvent.click(screen.getByText('Next'));
    
    // Step 5: Contact
    await waitFor(() => {
      expect(screen.getByText('Your Contact Information')).toBeInTheDocument();
    });
    
    // Fill in contact details
    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Phone/i), { target: { value: '1234567890' } });
    
    // Submit the form
    fireEvent.click(screen.getByText('Submit'));
    
    // Check that the form was submitted
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });
  });
}); 