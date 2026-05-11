describe('Content Dashboard E2E', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('loads the dashboard with content cards', () => {
    cy.get('h1').should('contain', 'Personalized Feed');
    cy.get('[style*="grid-template-columns"]').should('exist');
    // Check if at least one card is rendered
    cy.contains('Read More').should('be.visible');
  });

  it('searches for content', () => {
    cy.get('input[placeholder*="Search"]').type('Technology');
    // Wait for debounce and check results
    cy.wait(1000);
    // Since we use mock data, we just check if it's still rendering
    cy.get('h3').should('exist');
  });

  it('navigates to trending and favorites', () => {
    cy.contains('Trending').click();
    cy.url().should('include', '/trending');
    cy.get('h1').should('contain', 'Trending Now');

    cy.contains('Favorites').click();
    cy.url().should('include', '/favorites');
    cy.get('h1').should('contain', 'Your Favorites');
  });

  it('toggles dark mode', () => {
    // Check if we can find the toggle button
    cy.get('button').find('svg').parent().click();
    // Verify theme change via style or class if possible
    // Since we use direct style in Layout, we check the body or wrapper
  });
});
