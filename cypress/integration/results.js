describe('Results display tests', () => {
  it('has results div and is visible', () => {
    cy
      .visit('/')
      .get('.container > div:first')
      .should('have.class', 'results')
      .and('be.visible');
  });

  it('has at least one result card', () => {
    cy
      .visit('/')
      .get('.results > .result-card:first')
      .should('be.visible');
  });

  it('has departure, arrival, price and operator info for each result card', () => {
    cy
      .visit('/')
      .get('.results')
      .children()
      .each(($el) => {
        if ($el.hasClass('result-card')) {
          cy
            .wrap($el)
            .within(() => {
              cy.get('p.departure-time').should('be.visible');
              cy.get('p.departure-location-name').should('be.visible');
              cy.get('p.arrival-time').should('be.visible');
              cy.get('p.arrival-location-name').should('be.visible');
              cy.get('.price').should('be.visible');
              cy.get('.operator').should('be.visible');
            });
        }
      });
  });
});
