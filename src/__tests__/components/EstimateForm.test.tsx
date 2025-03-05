import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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
    fireEvent.mouseDown(screen.getByText('123 Test Street, City, ST, USA'));
    
    // Check if the input value was updated correctly
    await waitFor(() => {
      expect(fromInput).toHaveValue('123 Test Street, Test City, ST 12345, USA');
    });
    
    // Type in the 'to' address
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
}); 