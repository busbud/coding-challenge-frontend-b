export {}

describe('Departures List', () => {
  before(() => {
    cy.intercept('GET', 'https://napi.busbud.com/x-departures/*', {
      fixture: 'search_response.json',
    })
    cy.visit('/')
  })
  it('List 5 Departures', () => {
    cy.getTestId('SEARCH.BUTTON').click()
    cy.getTestId('DEPARTURE_LIST_ITEM').should('have.length', 5)
  })
})
