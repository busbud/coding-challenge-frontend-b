describe('My first test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('destination is set to Montreal', () => {
    cy.contains('#destination-input', 'Montreal');
  });

  it('origin is set to New York', () => {
    cy.contains('#origin-input', 'New York');
  });

  it('passenger # is set to 1 adult', () => {
    cy.contains('#passenger-input', '1 Adult');
  });

  it('departure date is set to 2018-08-02', () => {
    cy.get('#date-input').should('have.attr', 'value', '2020-08-02');
  });

  it('departure date changes based on user interaction', () => {
    cy.get('#date-input')
      .type('2020-09-02')
      .trigger('change');

    cy.get('#date-input').should('have.attr', 'value', '2020-09-02');
  });

  it('renders Card components when search button is clicked', () => {
    cy.contains('button', 'Search').click();
    cy.get('.card');
  });
});
