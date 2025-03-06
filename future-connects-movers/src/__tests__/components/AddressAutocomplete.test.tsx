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
      const mainText = screen.getByText('123 Test Street');
      const secondaryText = screen.getByText('City, ST, USA');
      expect(mainText).toBeInTheDocument();
      expect(secondaryText).toBeInTheDocument();
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
    fireEvent.change(input, { target: { value: '123 Test' } });

    // Wait for suggestions to appear
    await waitFor(() => {
      const mainText = screen.getByText('123 Test Street');
      const secondaryText = screen.getByText('City, ST, USA');
      expect(mainText).toBeInTheDocument();
      expect(secondaryText).toBeInTheDocument();
    });

    // Use onMouseDown instead of click because the component uses onMouseDown
    const suggestionItem = screen.getByText('123 Test Street').closest('li');
    fireEvent.mouseDown(suggestionItem!);

    // Wait for the API call to complete and check onChange was called with correct address
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith(
        '123 Test Street, Test City, ST 12345, USA',
        expect.objectContaining({
          formatted_address: '123 Test Street, Test City, ST 12345, USA',
          place_id: 'place123',
          geometry: expect.anything()
        })
      );
    });

    // Check if the input value was updated
    expect(input).toHaveValue('123 Test Street, Test City, ST 12345, USA');
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
    fireEvent.change(input, { target: { value: '123 Test' } });

    // Wait for suggestions to appear
    await waitFor(() => {
      const mainText = screen.getByText('123 Test Street');
      const secondaryText = screen.getByText('City, ST, USA');
      expect(mainText).toBeInTheDocument();
      expect(secondaryText).toBeInTheDocument();
    });

    // Trigger blur without selecting an item
    fireEvent.blur(input);

    // Suggestions should disappear after a delay
    await waitFor(() => {
      const suggestionsList = document.querySelector('.suggestions-container ul');
      expect(suggestionsList).not.toBeInTheDocument();
    });
  });

  it('handles focus event correctly', async () => {
    const onChange = jest.fn();
    render(
      <AddressAutocomplete
        id="testAddress"
        label="Test Address"
        onChange={onChange}
        defaultValue="123 Test Street, Test City, ST 12345, USA"
      />
    );
    
    const input = screen.getByLabelText(/Test Address/i);
    expect(input).toHaveValue('123 Test Street, Test City, ST 12345, USA');
    
    // Blur first to clear any existing suggestions
    fireEvent.blur(input);
    
    // Change input value and then focus
    fireEvent.change(input, { target: { value: '123 Test' } });
    fireEvent.focus(input);
    
    // Wait for suggestions to appear  
    await waitFor(() => {
      const mainText = screen.getByText('123 Test Street');
      const secondaryText = screen.getByText('City, ST, USA');
      expect(mainText).toBeInTheDocument();
      expect(secondaryText).toBeInTheDocument();
    });
    
    // Suggestions should be visible when focused
    const suggestionsList = document.querySelector('.suggestions-container ul');
    expect(suggestionsList).toBeInTheDocument();
  });

  // Add this test case to verify dropdown positioning and styling
  it('should render suggestions dropdown with correct styling and position', async () => {
    const handleChange = jest.fn();
    
    render(
      <AddressAutocomplete
        label="Test Address"
        id="testAddress"
        onChange={handleChange}
      />
    );

    const input = screen.getByLabelText(/Test Address/i);
    fireEvent.change(input, { target: { value: '123 Test' } });
    
    // Wait for suggestions to appear
    await waitFor(() => {
      const mainText = screen.getByText('123 Test Street');
      const secondaryText = screen.getByText('City, ST, USA');
      expect(mainText).toBeInTheDocument();
      expect(secondaryText).toBeInTheDocument();
    });
    
    // Check for the suggestions container and list
    const suggestionsContainer = document.querySelector('.suggestions-container');
    expect(suggestionsContainer).toBeInTheDocument();
    
    const suggestionsList = document.querySelector('.suggestions-container ul');
    expect(suggestionsList).toBeInTheDocument();
    
    // Verify that the suggestionsList has the appropriate styles via className
    expect(suggestionsList).toHaveClass('absolute');
    expect(suggestionsList).toHaveClass('bg-white');
    
    // Check that the z-index is applied through inline styles
    const ulElement = suggestionsList as HTMLElement;
    expect(ulElement.style.zIndex).toBe('9999');
    
    // Check for proper content rendering
    const listItems = screen.getAllByRole('listitem');
    expect(listItems.length).toBeGreaterThan(0);
    
    // Check suggestion item content
    const mainTextElement = screen.getByText('123 Test Street');
    const secondaryTextElement = screen.getByText('City, ST, USA');
    expect(mainTextElement).toBeInTheDocument();
    expect(secondaryTextElement).toBeInTheDocument();
  });
}); 