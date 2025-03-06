import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookingPage from '../page';

describe('BookingPage Component', () => {
  it('renders booking page with title and description', () => {
    render(<BookingPage />);
    
    // Check if the title and description are present
    expect(screen.getByText(/Book Your Move/i)).toBeInTheDocument();
    expect(
      screen.getByText(/To schedule your move, please complete the form below/i)
    ).toBeInTheDocument();
  });

  it('displays the personal information section with all fields', () => {
    render(<BookingPage />);
    
    // Check if the personal information section is present
    expect(screen.getByText(/Personal Information/i)).toBeInTheDocument();
    
    // Check if all personal information fields are present
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
  });

  it('displays the move details section with all fields', () => {
    render(<BookingPage />);
    
    // Check if the move details section is present
    expect(screen.getByText(/Move Details/i)).toBeInTheDocument();
    
    // Check if all move details fields are present
    expect(screen.getByLabelText(/Type of Move/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Moving From/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Moving To/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Preferred Move Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Preferred Start Time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Property Size/i)).toBeInTheDocument();
  });

  it('displays the additional services section with all checkboxes', () => {
    render(<BookingPage />);
    
    // Check if the additional services section is present
    expect(screen.getByText(/Additional Services/i)).toBeInTheDocument();
    
    // Check if all additional services checkboxes are present
    expect(screen.getByLabelText(/Packing Services/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Unpacking Services/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Storage Services/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Special Items Handling/i)).toBeInTheDocument();
    
    // Check if the additional information field is present
    expect(screen.getByLabelText(/Additional Information/i)).toBeInTheDocument();
  });

  it('displays the submit button with correct text', () => {
    render(<BookingPage />);
    
    // Check if the submit button is present with the correct text
    expect(screen.getByRole('button', { name: /Book My Move/i })).toBeInTheDocument();
    
    // Check if the note about confirmation is present
    expect(
      screen.getByText(/A team member will contact you within 24 hours to confirm your booking details/i)
    ).toBeInTheDocument();
  });

  it('allows users to fill out the booking form', async () => {
    const user = userEvent.setup();
    render(<BookingPage />);
    
    // Get form elements in the personal information section
    const firstNameInput = screen.getByLabelText(/First Name/i);
    const lastNameInput = screen.getByLabelText(/Last Name/i);
    const emailInput = screen.getByLabelText(/Email Address/i);
    const phoneInput = screen.getByLabelText(/Phone Number/i);
    
    // Get form elements in the move details section
    const moveTypeSelect = screen.getByLabelText(/Type of Move/i);
    const movingFromInput = screen.getByLabelText(/Moving From/i);
    const movingToInput = screen.getByLabelText(/Moving To/i);
    const moveDateInput = screen.getByLabelText(/Preferred Move Date/i);
    const startTimeSelect = screen.getByLabelText(/Preferred Start Time/i);
    const propertySizeSelect = screen.getByLabelText(/Property Size/i);
    
    // Get checkboxes in the additional services section
    const packingServicesCheckbox = screen.getByLabelText(/Packing Services/i);
    const additionalInfoInput = screen.getByLabelText(/Additional Information/i);
    
    // Fill out the personal information section
    await user.type(firstNameInput, 'Jane');
    await user.type(lastNameInput, 'Smith');
    await user.type(emailInput, 'jane@example.com');
    await user.type(phoneInput, '555-987-6543');
    
    // Fill out the move details section
    await user.selectOptions(moveTypeSelect, ['residential']);
    await user.type(movingFromInput, '123 Current St, Anytown, CA 12345');
    await user.type(movingToInput, '456 New St, Othertown, CA 67890');
    await user.type(moveDateInput, '2023-12-15');
    await user.selectOptions(startTimeSelect, ['morning']);
    await user.selectOptions(propertySizeSelect, ['2bedroom']);
    
    // Select additional services
    await user.click(packingServicesCheckbox);
    await user.type(additionalInfoInput, 'I have a piano that needs special care.');
    
    // Check if the values were entered correctly
    expect(firstNameInput).toHaveValue('Jane');
    expect(lastNameInput).toHaveValue('Smith');
    expect(emailInput).toHaveValue('jane@example.com');
    expect(phoneInput).toHaveValue('555-987-6543');
    
    expect(moveTypeSelect).toHaveValue('residential');
    expect(movingFromInput).toHaveValue('123 Current St, Anytown, CA 12345');
    expect(movingToInput).toHaveValue('456 New St, Othertown, CA 67890');
    expect(moveDateInput).toHaveValue('2023-12-15');
    expect(startTimeSelect).toHaveValue('morning');
    expect(propertySizeSelect).toHaveValue('2bedroom');
    
    expect(packingServicesCheckbox).toBeChecked();
    expect(additionalInfoInput).toHaveValue('I have a piano that needs special care.');
    
    // For form submission, we would typically mock the submit handler
    // and check if it was called with the correct data
    // But for this test, we're just checking if the form can be filled out
  });
}); 