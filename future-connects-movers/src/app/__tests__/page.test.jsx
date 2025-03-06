import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from '../page';

// Mock the next/link component to avoid rendering errors
jest.mock('next/link', () => {
  return ({ children, href }) => {
    return <a href={href}>{children}</a>;
  };
});

describe('HomePage Component', () => {
  it('renders the welcome section correctly', () => {
    render(<HomePage />);
    
    // Check if the welcome section title and paragraph are present
    expect(screen.getByText(/Future Connects Movers/i)).toBeInTheDocument();
    expect(screen.getByText(/Your trusted partner for all your moving needs/i)).toBeInTheDocument();
  });

  it('displays all service sections', () => {
    render(<HomePage />);
    
    // Check if all service sections are present
    expect(screen.getByText(/Residential Moving/i)).toBeInTheDocument();
    expect(screen.getByText(/Commercial Moving/i)).toBeInTheDocument();
    expect(screen.getByText(/Packing Services/i)).toBeInTheDocument();
    
    // Check for service descriptions
    expect(screen.getByText(/We provide comprehensive residential moving services/i)).toBeInTheDocument();
    expect(screen.getByText(/Our commercial moving team specializes/i)).toBeInTheDocument();
    expect(screen.getByText(/Let our expert packers handle/i)).toBeInTheDocument();
  });

  it('displays the "Why Choose Us" section', () => {
    render(<HomePage />);
    
    // Check if the "Why Choose Us" section is present
    expect(screen.getByText(/Why Choose Us/i)).toBeInTheDocument();
    
    // Check if all reasons are present
    expect(screen.getByText(/Experienced Professionals/i)).toBeInTheDocument();
    expect(screen.getByText(/Affordable Rates/i)).toBeInTheDocument();
    expect(screen.getByText(/Reliable Service/i)).toBeInTheDocument();
    expect(screen.getByText(/Customer Satisfaction/i)).toBeInTheDocument();
  });

  it('includes a call-to-action section', () => {
    render(<HomePage />);
    
    // Check if the CTA section is present
    expect(screen.getByText(/Ready to Get Started\?/i)).toBeInTheDocument();
    expect(screen.getByText(/Get a Free Estimate/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact Us/i)).toBeInTheDocument();
  });

  it('contains correct links to other pages', () => {
    render(<HomePage />);
    
    // Check if all important links are present and have correct hrefs
    const estimateLink = screen.getByText(/Get a Free Estimate/i).closest('a');
    expect(estimateLink).toHaveAttribute('href', '/estimate');
    
    const contactLink = screen.getByText(/Contact Us/i).closest('a');
    expect(contactLink).toHaveAttribute('href', '/contact');
    
    const serviceLinks = screen.getAllByText(/Learn More/i).map(link => link.closest('a'));
    expect(serviceLinks[0]).toHaveAttribute('href', '/services');
    expect(serviceLinks[1]).toHaveAttribute('href', '/services');
    expect(serviceLinks[2]).toHaveAttribute('href', '/services');
  });
}); 