import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Sidebar from '../Sidebar';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn().mockReturnValue('/'),
}));

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href }) => {
    return <a href={href}>{children}</a>;
  };
});

describe('Sidebar Component', () => {
  it('renders correctly', () => {
    render(<Sidebar />);
    
    // Check if logo text is present
    expect(screen.getByText(/Future Connects/i)).toBeInTheDocument();
    
    // Check if all navigation links are present
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Services/i)).toBeInTheDocument();
    expect(screen.getByText(/Estimate/i)).toBeInTheDocument();
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/About/i)).toBeInTheDocument();
    expect(screen.getByText(/Booking/i)).toBeInTheDocument();
    expect(screen.getByText(/Tracking/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact/i)).toBeInTheDocument();
  });

  it('toggles sidebar expansion when toggle button is clicked', () => {
    render(<Sidebar />);
    
    // Find the toggle button
    const toggleButton = screen.getByRole('button', { name: /toggle/i });
    
    // Initially, the sidebar should be expanded (has w-64 class)
    const sidebar = screen.getByRole('complementary');
    expect(sidebar.className).toContain('w-64');
    
    // Click the toggle button
    fireEvent.click(toggleButton);
    
    // After clicking, the sidebar should be collapsed (has w-20 class)
    expect(sidebar.className).toContain('w-20');
    
    // Click again to expand
    fireEvent.click(toggleButton);
    
    // The sidebar should be expanded again
    expect(sidebar.className).toContain('w-64');
  });

  it('shows active state for current pathname', async () => {
    // Mock the usePathname hook to return '/about'
    require('next/navigation').usePathname.mockReturnValue('/about');
    
    render(<Sidebar />);
    
    // Find the about link
    const aboutLink = screen.getByText(/About/i).closest('a');
    
    // It should have the active class
    expect(aboutLink.className).toContain('sidebar-link-active');
    
    // Other links should not have the active class
    const homeLink = screen.getByText(/Home/i).closest('a');
    expect(homeLink.className).not.toContain('sidebar-link-active');
  });
}); 