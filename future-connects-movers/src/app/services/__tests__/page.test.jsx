import React from 'react';
import { render, screen } from '@testing-library/react';
import ServicesPage from '../page';

describe('ServicesPage Component', () => {
  it('renders services page with title and description', () => {
    render(<ServicesPage />);
    
    // Check if the title and description are present
    expect(screen.getByText(/Our Services/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Future Connects Movers offers a wide range of moving and relocation services/i)
    ).toBeInTheDocument();
  });

  it('displays the Residential Moving section', () => {
    render(<ServicesPage />);
    
    // Check if the Residential Moving section is present
    expect(screen.getByText(/Residential Moving Services/i)).toBeInTheDocument();
    
    // Check if the section content is present
    expect(
      screen.getByText(/We understand that moving your home is a significant life event/i)
    ).toBeInTheDocument();
    
    // Check if the feature list is present
    expect(screen.getByText(/Local moves within the same city or area/i)).toBeInTheDocument();
    expect(screen.getByText(/Long-distance moves across states/i)).toBeInTheDocument();
    expect(screen.getByText(/Careful handling of furniture and fragile items/i)).toBeInTheDocument();
    expect(screen.getByText(/Efficient packing and unpacking services/i)).toBeInTheDocument();
    expect(screen.getByText(/Furniture disassembly and reassembly/i)).toBeInTheDocument();
  });

  it('displays the Commercial Moving section', () => {
    render(<ServicesPage />);
    
    // Check if the Commercial Moving section is present
    expect(screen.getByText(/Commercial Moving Solutions/i)).toBeInTheDocument();
    
    // Check if the section content is present
    expect(
      screen.getByText(/Our commercial moving team specializes in efficient/i)
    ).toBeInTheDocument();
    
    // Check if the feature list is present
    expect(screen.getByText(/Office relocations - small to large scale/i)).toBeInTheDocument();
    expect(screen.getByText(/Minimum disruption to your business operations/i)).toBeInTheDocument();
    expect(screen.getByText(/IT equipment moving with proper care/i)).toBeInTheDocument();
    expect(screen.getByText(/Furniture installation and configuration/i)).toBeInTheDocument();
    expect(screen.getByText(/Weekend and after-hours moving options/i)).toBeInTheDocument();
  });

  it('displays the Packing Services section', () => {
    render(<ServicesPage />);
    
    // Check if the Packing Services section is present
    expect(screen.getByText(/Professional Packing Services/i)).toBeInTheDocument();
    
    // Check if the section content is present
    expect(
      screen.getByText(/Let our expert packers handle the most time-consuming part of moving/i)
    ).toBeInTheDocument();
    
    // Check if the feature list is present
    expect(screen.getByText(/Full-service packing of your entire home or office/i)).toBeInTheDocument();
    expect(screen.getByText(/Partial packing for specific rooms or items/i)).toBeInTheDocument();
    expect(screen.getByText(/High-quality packing materials and boxes/i)).toBeInTheDocument();
    expect(screen.getByText(/Special handling for artwork, antiques, and valuables/i)).toBeInTheDocument();
    expect(screen.getByText(/Unpacking services at your new location/i)).toBeInTheDocument();
  });

  it('displays the Specialty Moving section', () => {
    render(<ServicesPage />);
    
    // Check if the Specialty Moving section is present
    expect(screen.getByText(/Specialty Moving Options/i)).toBeInTheDocument();
    
    // Check if the section content is present
    expect(
      screen.getByText(/We offer specialized moving services for items that require extra care/i)
    ).toBeInTheDocument();
    
    // Check if the feature list is present
    expect(screen.getByText(/Piano moving by trained specialists/i)).toBeInTheDocument();
    expect(screen.getByText(/Fine art and antiques transportation/i)).toBeInTheDocument();
    expect(screen.getByText(/Hot tub and spa relocation/i)).toBeInTheDocument();
    expect(screen.getByText(/Pool table moving and reassembly/i)).toBeInTheDocument();
    expect(screen.getByText(/Safe and secure gun safe moving/i)).toBeInTheDocument();
  });

  it('has the correct section order', () => {
    render(<ServicesPage />);
    
    // Get all headings
    const headings = screen.getAllByRole('heading', { level: 2 });
    
    // Check if the sections are in the correct order
    expect(headings[0]).toHaveTextContent(/Residential Moving Services/i);
    expect(headings[1]).toHaveTextContent(/Commercial Moving Solutions/i);
    expect(headings[2]).toHaveTextContent(/Professional Packing Services/i);
    expect(headings[3]).toHaveTextContent(/Specialty Moving Options/i);
  });

  it('uses distinctive styling for each section', () => {
    const { container } = render(<ServicesPage />);
    
    // Get all sections (excluding the title container)
    const sections = container.querySelectorAll('div.p-6.rounded-lg.mb-8');
    
    // Check if we have 4 sections as expected
    expect(sections.length).toBe(4);
    
    // Check if each section has distinct styling
    const bgColors = [];
    sections.forEach(section => {
      const classes = section.className;
      const bgColorClass = classes.match(/bg-[a-z]+-\d+/g);
      if (bgColorClass) {
        bgColors.push(bgColorClass[0]);
      }
    });
    
    // Check if all sections have background colors and they are all different
    expect(bgColors.length).toBe(4);
    const uniqueBgColors = new Set(bgColors);
    expect(uniqueBgColors.size).toBe(4);
  });
}); 