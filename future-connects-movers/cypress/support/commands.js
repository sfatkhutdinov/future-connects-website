// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Command to fill out the estimate form with default values
Cypress.Commands.add('fillEstimateForm', (options = {}) => {
  const defaultOptions = {
    moveType: 'residential',
    moveSize: 'studio',
    distance: '0-50',
    hasElevator: true,
    needsPacking: true,
    needsStorage: false,
    needsSpecialItems: false
  };
  
  const formOptions = { ...defaultOptions, ...options };
  
  cy.get('select[name="moveType"]').select(formOptions.moveType);
  cy.get('select[name="moveSize"]').select(formOptions.moveSize);
  cy.get('select[name="distance"]').select(formOptions.distance);
  
  if (formOptions.hasElevator) {
    cy.get('input[name="hasElevator"]').check();
  } else {
    cy.get('input[name="hasElevator"]').uncheck();
  }
  
  if (formOptions.needsPacking) {
    cy.get('input[name="needsPacking"]').check();
  } else {
    cy.get('input[name="needsPacking"]').uncheck();
  }
  
  if (formOptions.needsStorage) {
    cy.get('input[name="needsStorage"]').check();
  } else {
    cy.get('input[name="needsStorage"]').uncheck();
  }
  
  if (formOptions.needsSpecialItems) {
    cy.get('input[name="needsSpecialItems"]').check();
  } else {
    cy.get('input[name="needsSpecialItems"]').uncheck();
  }
});

// Command to fill out the contact form with default values
Cypress.Commands.add('fillContactForm', (options = {}) => {
  const defaultOptions = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '555-123-4567',
    subject: 'General Inquiry',
    message: 'I would like to know more about your services.'
  };
  
  const formOptions = { ...defaultOptions, ...options };
  
  cy.get('input[name="name"]').type(formOptions.name);
  cy.get('input[name="email"]').type(formOptions.email);
  cy.get('input[name="phone"]').type(formOptions.phone);
  cy.get('input[name="subject"]').type(formOptions.subject);
  cy.get('textarea[name="message"]').type(formOptions.message);
});

// Command to fill out the booking form with default values
Cypress.Commands.add('fillBookingForm', (options = {}) => {
  const defaultOptions = {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    phone: '555-987-6543',
    moveType: 'residential',
    moveFrom: '123 Current St, Anytown, CA 12345',
    moveTo: '456 New St, Othertown, CA 67890',
    moveDate: '2023-12-15',
    moveTime: 'morning',
    propertySize: '2bedroom',
    packingServices: true,
    unpackingServices: true,
    storageServices: false,
    specialItemsHandling: false,
    additionalInfo: 'I have a piano that needs special care.'
  };
  
  const formOptions = { ...defaultOptions, ...options };
  
  // Fill out personal information
  cy.get('input[name="firstName"]').type(formOptions.firstName);
  cy.get('input[name="lastName"]').type(formOptions.lastName);
  cy.get('input[name="email"]').type(formOptions.email);
  cy.get('input[name="phone"]').type(formOptions.phone);
  
  // Fill out move details
  cy.get('select[name="moveType"]').select(formOptions.moveType);
  cy.get('input[name="moveFrom"]').type(formOptions.moveFrom);
  cy.get('input[name="moveTo"]').type(formOptions.moveTo);
  cy.get('input[name="moveDate"]').type(formOptions.moveDate);
  cy.get('select[name="moveTime"]').select(formOptions.moveTime);
  cy.get('select[name="propertySize"]').select(formOptions.propertySize);
  
  // Select additional services
  if (formOptions.packingServices) {
    cy.get('input[name="packingServices"]').check();
  } else {
    cy.get('input[name="packingServices"]').uncheck();
  }
  
  if (formOptions.unpackingServices) {
    cy.get('input[name="unpackingServices"]').check();
  } else {
    cy.get('input[name="unpackingServices"]').uncheck();
  }
  
  if (formOptions.storageServices) {
    cy.get('input[name="storageServices"]').check();
  } else {
    cy.get('input[name="storageServices"]').uncheck();
  }
  
  if (formOptions.specialItemsHandling) {
    cy.get('input[name="specialItemsHandling"]').check();
  } else {
    cy.get('input[name="specialItemsHandling"]').uncheck();
  }
  
  cy.get('textarea[name="additionalInfo"]').type(formOptions.additionalInfo);
}); 