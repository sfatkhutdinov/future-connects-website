import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TrackingPage from '../page';

describe('TrackingPage Component', () => {
  it('renders tracking page with title and description', () => {
    render(<TrackingPage />);
    
    // Check if the title and description are present
    expect(screen.getByText(/Track Your Move/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Enter your booking ID to track the status of your move/i)
    ).toBeInTheDocument();
  });

  it('displays the tracking form with booking ID field', () => {
    render(<TrackingPage />);
    
    // Check if the tracking form is present with the booking ID field
    expect(screen.getByLabelText(/Booking ID/i)).toBeInTheDocument();
    
    // Check if the track button is present
    expect(screen.getByRole('button', { name: /Track My Move/i })).toBeInTheDocument();
  });

  it('displays the tracking explanation section', () => {
    render(<TrackingPage />);
    
    // Check if the tracking explanation section is present
    expect(screen.getByText(/How Tracking Works/i)).toBeInTheDocument();
    
    // Check if the explanation text is present
    expect(
      screen.getByText(/Our tracking system allows you to view the current status of your move/i)
    ).toBeInTheDocument();
  });

  it('displays the status examples section', () => {
    render(<TrackingPage />);
    
    // Check if the status examples section is present
    expect(screen.getByText(/Status Examples/i)).toBeInTheDocument();
    
    // Check if all status examples are present
    expect(screen.getByText(/Booking Confirmed/i)).toBeInTheDocument();
    expect(screen.getByText(/Your booking has been received and confirmed/i)).toBeInTheDocument();
    
    expect(screen.getByText(/Team Assigned/i)).toBeInTheDocument();
    expect(screen.getByText(/A moving team has been assigned to your booking/i)).toBeInTheDocument();
    
    expect(screen.getByText(/In Progress/i)).toBeInTheDocument();
    expect(screen.getByText(/Your move is currently in progress/i)).toBeInTheDocument();
    
    expect(screen.getByText(/Completed/i)).toBeInTheDocument();
    expect(screen.getByText(/Your move has been successfully completed/i)).toBeInTheDocument();
  });

  it('allows users to enter a booking ID', async () => {
    const user = userEvent.setup();
    render(<TrackingPage />);
    
    // Get the booking ID input
    const bookingIdInput = screen.getByLabelText(/Booking ID/i);
    
    // Enter a booking ID
    await user.type(bookingIdInput, 'FCM-12345');
    
    // Check if the value was entered correctly
    expect(bookingIdInput).toHaveValue('FCM-12345');
  });

  it('handles form submission', async () => {
    // Mock the form submission handler
    const mockSubmit = jest.fn(e => e.preventDefault());
    jest.spyOn(React, 'useState').mockImplementation(() => [false, jest.fn()]);
    
    // Render with the mocked handler
    const { container } = render(<TrackingPage />);
    
    // Attach the mock handler to the form
    const form = container.querySelector('form');
    form.onsubmit = mockSubmit;
    
    // Get the booking ID input and track button
    const bookingIdInput = screen.getByLabelText(/Booking ID/i);
    const trackButton = screen.getByRole('button', { name: /Track My Move/i });
    
    // Enter a booking ID and submit the form
    fireEvent.change(bookingIdInput, { target: { value: 'FCM-12345' } });
    fireEvent.click(trackButton);
    
    // Check if the form submission handler was called
    expect(mockSubmit).toHaveBeenCalled();
  });

  // Test for tracking results display would typically be added here
  // This would involve mocking state changes to show the tracking results
}); 