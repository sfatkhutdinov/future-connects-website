import React from 'react';
import { render, screen } from '@testing-library/react';
import AboutPage from '../page';

describe('AboutPage Component', () => {
  it('renders about page with title', () => {
    render(<AboutPage />);
    
    // Check if the title is present
    expect(screen.getByText(/About Future Connects Movers/i)).toBeInTheDocument();
  });

  it('displays the Our Story section', () => {
    render(<AboutPage />);
    
    // Check if the Our Story section is present
    expect(screen.getByText(/Our Story/i)).toBeInTheDocument();
    
    // Check if the story content is present
    expect(
      screen.getByText(/Future Connects Movers was founded in 2010/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Over the years, we have grown from a small local operation/i)
    ).toBeInTheDocument();
  });

  it('displays the Our Mission section', () => {
    render(<AboutPage />);
    
    // Check if the Our Mission section is present
    expect(screen.getByText(/Our Mission/i)).toBeInTheDocument();
    
    // Check if the mission content is present
    expect(
      screen.getByText(/Our mission is to provide exceptional moving services/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/We strive to make the moving process as stress-free as possible/i)
    ).toBeInTheDocument();
  });

  it('displays the Our Team section with team members', () => {
    render(<AboutPage />);
    
    // Check if the Our Team section is present
    expect(screen.getByText(/Our Team/i)).toBeInTheDocument();
    
    // Check if all team members are present
    expect(screen.getByText(/John Smith/i)).toBeInTheDocument();
    expect(screen.getByText(/Founder & CEO/i)).toBeInTheDocument();
    expect(
      screen.getByText(/With over 20 years of experience in the moving industry/i)
    ).toBeInTheDocument();
    
    expect(screen.getByText(/Sarah Johnson/i)).toBeInTheDocument();
    expect(screen.getByText(/Operations Manager/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Sarah ensures that all moves are executed with precision/i)
    ).toBeInTheDocument();
    
    expect(screen.getByText(/Mike Rodriguez/i)).toBeInTheDocument();
    expect(screen.getByText(/Lead Moving Specialist/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Mike leads our team of professional movers/i)
    ).toBeInTheDocument();
  });

  it('displays the Our Values section with core values', () => {
    render(<AboutPage />);
    
    // Check if the Our Values section is present
    expect(screen.getByText(/Our Values/i)).toBeInTheDocument();
    
    // Check if all core values are present
    expect(screen.getByText(/Integrity/i)).toBeInTheDocument();
    expect(
      screen.getByText(/We operate with honesty and transparency in all our dealings/i)
    ).toBeInTheDocument();
    
    expect(screen.getByText(/Excellence/i)).toBeInTheDocument();
    expect(
      screen.getByText(/We are committed to delivering high-quality service/i)
    ).toBeInTheDocument();
    
    expect(screen.getByText(/Care/i)).toBeInTheDocument();
    expect(
      screen.getByText(/We handle your belongings with the utmost care/i)
    ).toBeInTheDocument();
    
    expect(screen.getByText(/Innovation/i)).toBeInTheDocument();
    expect(
      screen.getByText(/We continuously improve our processes and services/i)
    ).toBeInTheDocument();
  });

  it('displays the Community Involvement section', () => {
    render(<AboutPage />);
    
    // Check if the Community Involvement section is present
    expect(screen.getByText(/Community Involvement/i)).toBeInTheDocument();
    
    // Check if the community involvement content is present
    expect(
      screen.getByText(/At Future Connects Movers, we believe in giving back to the community/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/We actively participate in local events and support charitable causes/i)
    ).toBeInTheDocument();
  });

  it('has the correct section order', () => {
    render(<AboutPage />);
    
    // Get all headings
    const headings = screen.getAllByRole('heading');
    
    // Filter to get only the section headings (excluding the main title)
    const sectionHeadings = headings.filter(heading => 
      heading.textContent !== 'About Future Connects Movers'
    );
    
    // Check if the sections are in the correct order
    expect(sectionHeadings[0]).toHaveTextContent(/Our Story/i);
    expect(sectionHeadings[1]).toHaveTextContent(/Our Mission/i);
    expect(sectionHeadings[2]).toHaveTextContent(/Our Team/i);
    expect(sectionHeadings[3]).toHaveTextContent(/Our Values/i);
    expect(sectionHeadings[4]).toHaveTextContent(/Community Involvement/i);
  });
}); 