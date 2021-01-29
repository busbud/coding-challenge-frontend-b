export {}

describe('Departures List', () => {
  it('List 5 Departures', () => {
    cy.intercept('GET', 'https://napi.busbud.com/x-departures/**/*', {
      fixture: 'search_response.json',
    })
    cy.visit('/')
    cy.getTestId('SEARCH.BUTTON').click()
    cy.getTestId('DEPARTURE_LIST_ITEM').should('have.length', 5)
  })
})
