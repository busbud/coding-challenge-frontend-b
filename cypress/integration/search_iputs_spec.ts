describe('Search Inputs', () => {
  it('Select Origin as Montreal', () => {
    cy.visit('/')
    cy.getTestId('INPUT.ORIGIN').click()
    cy.get('button div').contains('Montreal').click()
  })
  it('Select Destination as Quebec', () => {
    cy.getTestId('INPUT.DESTINATION').click()
    cy.get('button div').contains('Quebec').click()
  })
  it('Switch places', () => {
    cy.getTestId('PLACE_SWITCH').click()
    cy.getTestId('INPUT.ORIGIN').should('have.value', 'Quebec')
    cy.getTestId('INPUT.DESTINATION').should('have.value', 'Montreal')
  })
  it('Select Date', () => {
    cy.getTestId('INPUT.DATE').click()
    cy.getTestId('CALENDAR').find('svg[aria-label="FormNext"]').click()
    cy.wait(700)
    cy.getTestId('CALENDAR').contains(10).click()
    const month = new Date().getMonth()
    const year = new Date().getFullYear()
    const actualYear = month > 10 ? year + 1 : year
    const nextMonth = month + 2
    cy.getTestId('INPUT.DATE').should(
      'have.value',
      `${nextMonth}/10/${actualYear}`
    )
  })
})
