context('Search', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should list departures', () => {
    cy.dataCy('departure-item').should('have.length', 1);
    cy.dataCy('search-loading').should('be.visible');

    cy.dataCy('price').should('be.visible');
    cy.dataCy('departure-time').should('be.visible');
    cy.dataCy('origin-city-name').should('be.visible');
    cy.dataCy('origin-location-name').should('be.visible');
    cy.dataCy('arrival-time').should('be.visible');
    cy.dataCy('destination-city-name').should('be.visible');
    cy.dataCy('destination-location-name').should('be.visible');

    cy.dataCy('departure-item').should('have.length', 2);
  });
});
