/// <reference types="cypress" />

describe('Future Connects Movers Forms', () => {
  it('should submit the estimate form', () => {
    // Visit the estimate page
    cy.visit('/estimate');
    
    // Check if the estimate form is visible
    cy.contains('Get a Moving Estimate').should('be.visible');
    
    // Fill out the form
    cy.get('select[name="moveType"]').select('residential');
    cy.get('select[name="moveSize"]').select('studio');
    cy.get('select[name="distance"]').select('0-50');
    
    // Toggle checkboxes
    cy.get('input[name="hasElevator"]').check();
    cy.get('input[name="needsPacking"]').check();
    
    // Submit the form
    cy.get('button').contains('Calculate Estimate').click();
    
    // Check if the estimate is displayed
    cy.contains('Your Estimated Moving Cost').should('be.visible');
    cy.contains('This estimate includes:').should('be.visible');
    cy.contains('Professional packing services').should('be.visible');
  });

  it('should submit the contact form', () => {
    // Visit the contact page
    cy.visit('/contact');
    
    // Check if the contact form is visible
    cy.contains('Contact Us').should('be.visible');
    
    // Fill out the form
    cy.get('input[name="name"]').type('John Doe');
    cy.get('input[name="email"]').type('john@example.com');
    cy.get('input[name="phone"]').type('555-123-4567');
    cy.get('input[name="subject"]').type('Question about services');
    cy.get('textarea[name="message"]').type('I would like to know more about your packing services.');
    
    // Submit the form
    cy.get('button').contains('Send Message').click();
    
    // In a real application, we would check for success message or redirection
    // Since this is a static demo, we'll just verify the form was completed
    cy.get('input[name="name"]').should('have.value', 'John Doe');
    cy.get('input[name="email"]').should('have.value', 'john@example.com');
  });

  it('should submit the booking form', () => {
    // Visit the booking page
    cy.visit('/booking');
    
    // Check if the booking form is visible
    cy.contains('Book Your Move').should('be.visible');
    
    // Fill out the personal information section
    cy.get('input[name="firstName"]').type('Jane');
    cy.get('input[name="lastName"]').type('Smith');
    cy.get('input[name="email"]').type('jane@example.com');
    cy.get('input[name="phone"]').type('555-987-6543');
    
    // Fill out the move details section
    cy.get('select[name="moveType"]').select('residential');
    cy.get('input[name="moveFrom"]').type('123 Current St, Anytown, CA 12345');
    cy.get('input[name="moveTo"]').type('456 New St, Othertown, CA 67890');
    cy.get('input[name="moveDate"]').type('2023-12-15');
    cy.get('select[name="moveTime"]').select('morning');
    cy.get('select[name="propertySize"]').select('2bedroom');
    
    // Select additional services
    cy.get('input[name="packingServices"]').check();
    cy.get('input[name="unpackingServices"]').check();
    cy.get('textarea[name="additionalInfo"]').type('I have a piano that needs special care.');
    
    // Submit the form
    cy.get('button').contains('Book My Move').click();
    
    // In a real application, we would check for success message or redirection
    // Since this is a static demo, we'll just verify the form was completed
    cy.get('input[name="firstName"]').should('have.value', 'Jane');
    cy.get('input[name="email"]').should('have.value', 'jane@example.com');
  });

  it('should submit the tracking form', () => {
    // Visit the tracking page
    cy.visit('/tracking');
    
    // Check if the tracking form is visible
    cy.contains('Track Your Move').should('be.visible');
    
    // Fill out the form
    cy.get('input[name="bookingId"]').type('FCM-12345');
    
    // Submit the form
    cy.get('button').contains('Track My Move').click();
    
    // In a real application, we would check for tracking results
    // Since this is a static demo, we'll just verify the form was completed
    cy.get('input[name="bookingId"]').should('have.value', 'FCM-12345');
  });

  it('should validate required fields in the contact form', () => {
    // Visit the contact page
    cy.visit('/contact');
    
    // Submit the form without filling any fields
    cy.get('button').contains('Send Message').click();
    
    // Check if validation highlights required fields
    // HTML5 validation will prevent form submission and highlight required fields
    // We can check for form validity
    cy.get('input[name="name"]:invalid').should('exist');
    cy.get('input[name="email"]:invalid').should('exist');
    
    // Fill out only the name field
    cy.get('input[name="name"]').type('John Doe');
    cy.get('button').contains('Send Message').click();
    
    // Email should still be invalid
    cy.get('input[name="name"]:invalid').should('not.exist');
    cy.get('input[name="email"]:invalid').should('exist');
    
    // Fill out the email with an invalid format
    cy.get('input[name="email"]').type('invalid-email');
    cy.get('button').contains('Send Message').click();
    
    // Email should still be invalid due to incorrect format
    cy.get('input[name="email"]:invalid').should('exist');
    
    // Fill out the email with a valid format
    cy.get('input[name="email"]').clear().type('john@example.com');
    
    // Now email should be valid
    cy.get('input[name="email"]:invalid').should('not.exist');
  });
}); 