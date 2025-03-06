/// <reference types="cypress" />

describe('Basic Navigation Tests', () => {
  beforeEach(() => {
    // Visit the home page before each test
    cy.visit('/');
  });

  it('should display the sidebar', () => {
    // Check if the sidebar is visible
    cy.get('aside').should('be.visible');
    cy.get('aside').contains('Future Connects').should('be.visible');
  });

  it('should toggle sidebar expansion when clicking the toggle button', () => {
    // Check if sidebar is expanded by default
    cy.get('aside').should('have.class', 'w-64');
    
    // Click the toggle button
    cy.get('button').first().click();
    
    // Check if sidebar is collapsed
    cy.get('aside').should('have.class', 'w-20');
    
    // Click the toggle button again
    cy.get('button').first().click();
    
    // Check if sidebar is expanded again
    cy.get('aside').should('have.class', 'w-64');
  });

  it('should navigate to different pages', () => {
    // Click on Home link and verify URL
    cy.get('aside').contains('Home').click();
    cy.url().should('include', '/');
    
    // Click on Services link and verify URL
    cy.get('aside').contains('Services').click();
    cy.url().should('include', '/services');
    
    // Click on About Us link and verify URL
    cy.get('aside').contains('About Us').click();
    cy.url().should('include', '/about');
  });
}); 