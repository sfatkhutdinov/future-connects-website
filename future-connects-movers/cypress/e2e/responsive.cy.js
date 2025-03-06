/// <reference types="cypress" />

describe('Future Connects Movers Responsive Design', () => {
  beforeEach(() => {
    // Reset viewport size to desktop default
    cy.viewport(1280, 800);
  });

  it('should have a responsive layout for desktop', () => {
    // Visit the home page
    cy.visit('/');
    
    // Sidebar should be expanded by default on desktop
    cy.get('nav').should('have.class', 'w-64');
    
    // Main content should be positioned correctly
    cy.get('main').should('have.class', 'ml-64');
  });

  it('should have a responsive layout for tablet', () => {
    // Set viewport to tablet size
    cy.viewport(768, 1024);
    
    // Visit the home page
    cy.visit('/');
    
    // Sidebar might be collapsed by default on tablet
    // Let's check if it has either the collapsed class or expanded class
    cy.get('nav').should('have.class', 'w-64').or('have.class', 'w-20');
    
    // Toggle sidebar if expanded
    cy.get('nav.w-64').then(($nav) => {
      if ($nav.length > 0) {
        cy.get('button[aria-label="Toggle Sidebar"]').click();
        cy.get('nav').should('have.class', 'w-20');
      }
    });
    
    // Main content should adjust based on sidebar state
    cy.get('main').should('have.class', 'ml-20');
  });

  it('should have a responsive layout for mobile', () => {
    // Set viewport to mobile size
    cy.viewport(375, 667);
    
    // Visit the home page
    cy.visit('/');
    
    // Sidebar should be collapsed by default on mobile
    cy.get('nav').should('have.class', 'w-20');
    
    // Main content should be positioned with minimal margin
    cy.get('main').should('have.class', 'ml-20');
    
    // Text should be readable and not overflowing
    cy.contains('Future Connects Movers').should('be.visible');
    cy.contains('Your trusted partner for all your moving needs').should('be.visible');
  });

  it('should have responsive forms on mobile', () => {
    // Set viewport to mobile size
    cy.viewport(375, 667);
    
    // Visit the contact page
    cy.visit('/contact');
    
    // Form inputs should be full width on mobile
    cy.get('input[name="name"]').should('have.css', 'width').and('match', /300px|100%/);
    
    // Form should stack vertically on mobile
    cy.get('form').should('have.css', 'flex-direction', 'column');
  });

  it('should have responsive services section on mobile', () => {
    // Set viewport to mobile size
    cy.viewport(375, 667);
    
    // Visit the services page
    cy.visit('/services');
    
    // Services cards should stack vertically on mobile
    cy.get('div.p-6.rounded-lg.mb-8').each(($section) => {
      // Each service section should take full width
      cy.wrap($section).should('have.css', 'width').and('match', /300px|100%/);
    });
  });

  it('should have a responsive about page on mobile', () => {
    // Set viewport to mobile size
    cy.viewport(375, 667);
    
    // Visit the about page
    cy.visit('/about');
    
    // Team members should stack vertically on mobile
    cy.get('div.mt-6 > div').each(($teamMember) => {
      // Each team member card should take full or near-full width
      cy.wrap($teamMember).should('have.css', 'width').and('match', /300px|100%/);
    });
  });

  it('should toggle sidebar correctly at different screen sizes', () => {
    // Desktop
    cy.viewport(1280, 800);
    cy.visit('/');
    
    // Toggle sidebar on desktop
    cy.get('button[aria-label="Toggle Sidebar"]').click();
    cy.get('nav').should('have.class', 'w-20');
    cy.get('main').should('have.class', 'ml-20');
    
    // Toggle sidebar back on desktop
    cy.get('button[aria-label="Toggle Sidebar"]').click();
    cy.get('nav').should('have.class', 'w-64');
    cy.get('main').should('have.class', 'ml-64');
    
    // Tablet
    cy.viewport(768, 1024);
    
    // Toggle sidebar on tablet
    cy.get('button[aria-label="Toggle Sidebar"]').click();
    cy.get('nav').should('have.class', 'w-20');
    cy.get('main').should('have.class', 'ml-20');
    
    // Mobile
    cy.viewport(375, 667);
    
    // Sidebar should already be collapsed on mobile
    cy.get('nav').should('have.class', 'w-20');
    
    // Toggle sidebar on mobile
    cy.get('button[aria-label="Toggle Sidebar"]').click();
    cy.get('nav').should('have.class', 'w-64');
    cy.get('main').should('have.class', 'ml-64');
  });
}); 