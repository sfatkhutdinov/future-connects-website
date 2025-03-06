import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactPage from '../page';

describe('ContactPage Component', () => {
  it('renders contact page with title and description', () => {
    render(<ContactPage />);
    
    // Check if the title and description are present
    expect(screen.getByText(/Contact Us/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Have questions about our moving services\? Get in touch with us/i)
    ).toBeInTheDocument();
  });

  it('displays the contact form with all fields', () => {
    render(<ContactPage />);
    
    // Check if all form fields are present
    expect(screen.getByLabelText(/Your Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
    
    // Check if the submit button is present
    expect(screen.getByRole('button', { name: /Send Message/i })).toBeInTheDocument();
  });

  it('displays contact information section', () => {
    render(<ContactPage />);
    
    // Check if the contact information section is present
    expect(screen.getByText(/Contact Information/i)).toBeInTheDocument();
    
    // Check if the office address is present
    expect(screen.getByText(/Office Address/i)).toBeInTheDocument();
    expect(screen.getByText(/123 Moving Street/i)).toBeInTheDocument();
    
    // Check if the phone number is present
    expect(screen.getByText(/Phone Number/i)).toBeInTheDocument();
    expect(screen.getByText(/\(555\) 123-4567/i)).toBeInTheDocument();
    
    // Check if the email addresses are present
    expect(screen.getByText(/Email Addresses/i)).toBeInTheDocument();
    expect(screen.getByText(/info@futureconnectsmovers.com/i)).toBeInTheDocument();
    expect(screen.getByText(/support@futureconnectsmovers.com/i)).toBeInTheDocument();
  });

  it('displays FAQ section with questions and answers', () => {
    render(<ContactPage />);
    
    // Check if the FAQ section is present
    expect(screen.getByText(/Frequently Asked Questions/i)).toBeInTheDocument();
    
    // Check if the questions are present
    expect(screen.getByText(/How do I book a move\?/i)).toBeInTheDocument();
    expect(screen.getByText(/Do you provide packing materials\?/i)).toBeInTheDocument();
    expect(screen.getByText(/What areas do you service\?/i)).toBeInTheDocument();
    
    // Check if the answers are present
    expect(
      screen.getByText(/You can book a move by filling out our online booking form/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Yes, we provide a variety of packing materials/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/We service all major cities and surrounding areas/i)
    ).toBeInTheDocument();
  });

  it('displays the location section', () => {
    render(<ContactPage />);
    
    // Check if the location section is present
    expect(screen.getByText(/Our Location/i)).toBeInTheDocument();
    
    // Check if the location description is present
    expect(
      screen.getByText(/Find us on the map/i)
    ).toBeInTheDocument();
    
    // Check if the map placeholder is present (you could check for a specific div or element)
    const mapElement = screen.getByText(/Google Maps will be integrated here/i);
    expect(mapElement).toBeInTheDocument();
  });

  it('allows users to fill out the contact form', async () => {
    const user = userEvent.setup();
    render(<ContactPage />);
    
    // Get form elements
    const nameInput = screen.getByLabelText(/Your Name/i);
    const emailInput = screen.getByLabelText(/Email Address/i);
    const phoneInput = screen.getByLabelText(/Phone Number/i);
    const subjectInput = screen.getByLabelText(/Subject/i);
    const messageInput = screen.getByLabelText(/Message/i);
    const submitButton = screen.getByRole('button', { name: /Send Message/i });
    
    // Fill out the form
    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(phoneInput, '555-123-4567');
    await user.type(subjectInput, 'Moving Inquiry');
    await user.type(messageInput, 'I need help with my upcoming move.');
    
    // Check if the values were entered correctly
    expect(nameInput).toHaveValue('John Doe');
    expect(emailInput).toHaveValue('john@example.com');
    expect(phoneInput).toHaveValue('555-123-4567');
    expect(subjectInput).toHaveValue('Moving Inquiry');
    expect(messageInput).toHaveValue('I need help with my upcoming move.');
    
    // For form submission, we would typically mock the submit handler
    // and check if it was called with the correct data
    // But for this test, we're just checking if the form can be filled out
  });
}); 