/// <reference types="cypress" />

describe('Future Connects Movers Navigation', () => {
  beforeEach(() => {
    // Visit the home page before each test
    cy.visit('/');
  });

  it('should display the sidebar', () => {
    // Check if the sidebar is visible
    cy.get('aside').should('be.visible');
    cy.get('aside').contains('Future Connects').should('be.visible');
  });

  it('should navigate to all pages from the sidebar', () => {
    // Check navigation to Home page
    cy.get('aside').contains('Home').click();
    cy.url().should('include', '/');
    cy.contains('Welcome to Future Connects Movers').should('be.visible');
    cy.contains('Your trusted partner for residential and commercial moving services').should('be.visible');

    // Check navigation to Services page
    cy.get('aside').contains('Services').click();
    cy.url().should('include', '/services');
    cy.contains('Our Services').should('be.visible');
    cy.contains('Residential Moving Services').should('be.visible');
    cy.contains('Commercial Moving Solutions').should('be.visible');

    // Check navigation to Estimate page
    cy.get('aside').contains('Get Estimate').click();
    cy.url().should('include', '/estimate');
    cy.contains('Get a Moving Estimate').should('be.visible');
    cy.contains('Fill out the form below').should('be.visible');

    // Check navigation to Dashboard page
    cy.get('aside').contains('Dashboard').click();
    cy.url().should('include', '/dashboard');
    cy.contains('Your Moving Dashboard').should('be.visible');
    cy.contains('Welcome to your personal moving dashboard').should('be.visible');

    // Check navigation to About page
    cy.get('aside').contains('About Us').click();
    cy.url().should('include', '/about');
    cy.contains('About Future Connects Movers').should('be.visible');
    cy.contains('Our Story').should('be.visible');

    // Check navigation to Booking page
    cy.get('aside').contains('Book Now').click();
    cy.url().should('include', '/booking');
    cy.contains('Book Your Move').should('be.visible');
    cy.contains('To schedule your move').should('be.visible');

    // Check navigation to Tracking page
    cy.get('aside').contains('Track Move').click();
    cy.url().should('include', '/tracking');
    cy.contains('Track Your Move').should('be.visible');
    cy.contains('Enter your booking ID').should('be.visible');

    // Check navigation to Contact page
    cy.get('aside').contains('Contact Us').click();
    cy.url().should('include', '/contact');
    cy.contains('Contact Us').should('be.visible');
    cy.contains('Have questions about our moving services?').should('be.visible');
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

  it('should show correct active link based on current route', () => {
    // Check if Home link is active on home page
    cy.get('aside').contains('Home').parent().should('have.class', 'sidebar-link-active');
    
    // Navigate to Services and check if Services link is active
    cy.get('aside').contains('Services').click();
    cy.get('aside').contains('Services').parent().should('have.class', 'sidebar-link-active');
    cy.get('aside').contains('Home').parent().should('not.have.class', 'sidebar-link-active');
    
    // Navigate to About and check if About link is active
    cy.get('aside').contains('About Us').click();
    cy.get('aside').contains('About Us').parent().should('have.class', 'sidebar-link-active');
    cy.get('aside').contains('Services').parent().should('not.have.class', 'sidebar-link-active');
  });

  it('should navigate through CTA links on the home page', () => {
    // Check navigation from home page to Estimate page via CTA
    cy.contains('Get a Free Estimate').click();
    cy.url().should('include', '/estimate');
    cy.contains('Get a Moving Estimate').should('be.visible');
    
    // Navigate back to home page
    cy.get('aside').contains('Home').click();
    
    // Check navigation from home page to Contact page via CTA
    cy.contains('Contact Us').click();
    cy.url().should('include', '/contact');
    cy.contains('Contact Us').should('be.visible');
  });
}); 