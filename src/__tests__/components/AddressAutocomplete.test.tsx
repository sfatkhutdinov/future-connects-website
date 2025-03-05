import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import AddressAutocomplete from '@/components/ui/AddressAutocomplete';
import { mockGoogleMapsApi } from '../__mocks__/googleMapsMock';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null,
      push: () => null,
    };
  },
}));

// Mock the config
jest.mock('@/lib/config', () => ({
  GOOGLE_MAPS_API_KEY: 'test-api-key',
  SERVICE_AREA_BOUNDS: {
    northeast: { lat: 40, lng: -75 },
    southwest: { lat: 37, lng: -79 },
  },
}));

// Mock the @react-google-maps/api
jest.mock('@react-google-maps/api', () => ({
  useLoadScript: () => ({
    isLoaded: true,
    loadError: null,
  }),
}));

describe('AddressAutocomplete Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGoogleMapsApi();
  });

  it('renders the component correctly', () => {
    const onChange = jest.fn();
    render(
      <AddressAutocomplete
        id="testAddress"
        label="Test Address"
        onChange={onChange}
      />
    );

    expect(screen.getByLabelText(/Test Address/i)).toBeInTheDocument();
  });

  it('shows suggestions when typing', async () => {
    const onChange = jest.fn();
    render(
      <AddressAutocomplete
        id="testAddress"
        label="Test Address"
        onChange={onChange}
      />
    );

    const input = screen.getByLabelText(/Test Address/i);
    await userEvent.type(input, '123 Test');

    // Wait for suggestions to appear
    await waitFor(() => {
      expect(screen.getByText('123 Test Street, City, ST, USA')).toBeInTheDocument();
    });

    // Check if onChange was called
    expect(onChange).toHaveBeenCalled();
  });

  it('selects an address when clicking a suggestion', async () => {
    const onChange = jest.fn();
    render(
      <AddressAutocomplete
        id="testAddress"
        label="Test Address"
        onChange={onChange}
      />
    );

    const input = screen.getByLabelText(/Test Address/i);
    await userEvent.type(input, '123 Test');

    // Wait for suggestions to appear
    await waitFor(() => {
      expect(screen.getByText('123 Test Street, City, ST, USA')).toBeInTheDocument();
    });

    // Click on the suggestion
    fireEvent.mouseDown(screen.getByText('123 Test Street, City, ST, USA'));

    // Check if onChange was called with the correct address
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith(
        '123 Test Street, Test City, ST 12345, USA', 
        expect.objectContaining({
          place_id: 'place123',
          formatted_address: '123 Test Street, Test City, ST 12345, USA',
          geometry: expect.anything()
        })
      );
    });

    // Check if the input value was updated
    await waitFor(() => {
      expect(input).toHaveValue('123 Test Street, Test City, ST 12345, USA');
    });
  });

  it('handles blur event correctly', async () => {
    const onChange = jest.fn();
    render(
      <AddressAutocomplete
        id="testAddress"
        label="Test Address"
        onChange={onChange}
      />
    );

    const input = screen.getByLabelText(/Test Address/i);
    await userEvent.type(input, '123 Test');

    // Wait for suggestions to appear
    await waitFor(() => {
      expect(screen.getByText('123 Test Street, City, ST, USA')).toBeInTheDocument();
    });

    // Trigger blur event
    fireEvent.blur(input);

    // Wait for suggestions to disappear (due to the 300ms timeout)
    await waitFor(() => {
      expect(screen.queryByText('123 Test Street, City, ST, USA')).not.toBeInTheDocument();
    }, { timeout: 400 });
  });

  it('handles focus event correctly', async () => {
    const onChange = jest.fn();
    render(
      <AddressAutocomplete
        id="testAddress"
        label="Test Address"
        onChange={onChange}
      />
    );

    const input = screen.getByLabelText(/Test Address/i);
    
    // Type in the input to get suggestions
    await userEvent.type(input, '123 Test');
    
    // Wait for suggestions to appear
    await waitFor(() => {
      expect(screen.getByText('123 Test Street, City, ST, USA')).toBeInTheDocument();
    });
    
    // Trigger blur to hide suggestions
    fireEvent.blur(input);
    
    // Wait for suggestions to disappear
    await waitFor(() => {
      expect(screen.queryByText('123 Test Street, City, ST, USA')).not.toBeInTheDocument();
    }, { timeout: 400 });
    
    // Now focus again to show suggestions
    fireEvent.focus(input);
    
    // Wait for suggestions to appear again
    await waitFor(() => {
      expect(screen.getByText('123 Test Street, City, ST, USA')).toBeInTheDocument();
    });
  });
}); 