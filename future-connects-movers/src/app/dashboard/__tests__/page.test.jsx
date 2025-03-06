import React from 'react';
import { render, screen } from '@testing-library/react';
import DashboardPage from '../page';

// Mock the useState hook for controlled testing
jest.mock('react', () => {
  const originalReact = jest.requireActual('react');
  return {
    ...originalReact,
    useState: jest.fn(),
  };
});

describe('DashboardPage Component', () => {
  beforeEach(() => {
    // Mock the useState implementation for all tests
    React.useState.mockImplementation((init) => [init, jest.fn()]);
  });
  
  it('renders dashboard page with welcome message', () => {
    render(<DashboardPage />);
    
    // Check if the title and welcome message are present
    expect(screen.getByText(/Your Moving Dashboard/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Welcome to your personal moving dashboard/i)
    ).toBeInTheDocument();
  });

  it('displays the upcoming moves section when there are moves', () => {
    // Mock the upcoming moves state
    React.useState.mockImplementation(() => [
      [
        {
          id: 'FCM-12345',
          date: '2023-12-15',
          from: '123 Current St, Anytown',
          to: '456 New St, Othertown',
          status: 'Confirmed',
          type: 'Residential'
        },
        {
          id: 'FCM-67890',
          date: '2024-01-10',
          from: '789 Old Office, Business District',
          to: '101 New Office, Commerce Park',
          status: 'Pending',
          type: 'Commercial'
        }
      ],
      jest.fn()
    ]);
    
    render(<DashboardPage />);
    
    // Check if the upcoming moves section is present
    expect(screen.getByText(/Upcoming Moves/i)).toBeInTheDocument();
    
    // Check if the move details are present
    expect(screen.getByText(/FCM-12345/i)).toBeInTheDocument();
    expect(screen.getByText(/2023-12-15/i)).toBeInTheDocument();
    expect(screen.getByText(/123 Current St, Anytown/i)).toBeInTheDocument();
    expect(screen.getByText(/456 New St, Othertown/i)).toBeInTheDocument();
    expect(screen.getByText(/Confirmed/i)).toBeInTheDocument();
    expect(screen.getByText(/Residential/i)).toBeInTheDocument();
    
    expect(screen.getByText(/FCM-67890/i)).toBeInTheDocument();
    expect(screen.getByText(/2024-01-10/i)).toBeInTheDocument();
    expect(screen.getByText(/789 Old Office, Business District/i)).toBeInTheDocument();
    expect(screen.getByText(/101 New Office, Commerce Park/i)).toBeInTheDocument();
    expect(screen.getByText(/Pending/i)).toBeInTheDocument();
    expect(screen.getByText(/Commercial/i)).toBeInTheDocument();
  });

  it('displays a message when there are no upcoming moves', () => {
    // Mock empty upcoming moves state
    React.useState.mockImplementation(() => [[], jest.fn()]);
    
    render(<DashboardPage />);
    
    // Check if the no moves message is present
    expect(screen.getByText(/You don't have any upcoming moves/i)).toBeInTheDocument();
  });

  it('displays the quick actions section', () => {
    render(<DashboardPage />);
    
    // Check if the quick actions section is present
    expect(screen.getByText(/Quick Actions/i)).toBeInTheDocument();
    
    // Check if all action buttons are present
    expect(screen.getByText(/Book a New Move/i)).toBeInTheDocument();
    expect(screen.getByText(/Get an Estimate/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact Support/i)).toBeInTheDocument();
    expect(screen.getByText(/Update Profile/i)).toBeInTheDocument();
  });

  it('displays the move history section', () => {
    // Mock the move history state
    React.useState.mockImplementation((init) => {
      if (Array.isArray(init)) {
        return [
          [
            {
              id: 'FCM-54321',
              date: '2023-10-05',
              from: '111 Previous Home, Oldtown',
              to: '222 Current Home, Newtown',
              status: 'Completed',
              type: 'Residential'
            }
          ],
          jest.fn()
        ];
      }
      return [init, jest.fn()];
    });
    
    render(<DashboardPage />);
    
    // Check if the move history section is present
    expect(screen.getByText(/Move History/i)).toBeInTheDocument();
    
    // Check if the move history details are present
    expect(screen.getByText(/FCM-54321/i)).toBeInTheDocument();
    expect(screen.getByText(/2023-10-05/i)).toBeInTheDocument();
    expect(screen.getByText(/111 Previous Home, Oldtown/i)).toBeInTheDocument();
    expect(screen.getByText(/222 Current Home, Newtown/i)).toBeInTheDocument();
    expect(screen.getByText(/^Completed$/i)).toBeInTheDocument();
  });

  it('has all the expected dashboard sections', () => {
    render(<DashboardPage />);
    
    // Check if all main sections are present
    const sections = [
      /Your Moving Dashboard/i,
      /Upcoming Moves/i,
      /Quick Actions/i,
      /Move History/i
    ];
    
    sections.forEach(section => {
      expect(screen.getByText(section)).toBeInTheDocument();
    });
  });
}); 