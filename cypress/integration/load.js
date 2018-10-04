describe('Loading tests', () => {
  it('can load Busbud Osheaga Challenge root', () => {
    cy.visit('/').get('div:first').should('have.id', 'root');
  });

  it('has the right header', () => {
    cy.visit('/').get('h1').contains('Busbud X Osheaga');
  });
});
