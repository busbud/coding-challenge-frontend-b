export {}
describe('Change Language', () => {
  it('Loads page in English', () => {
    cy.visit('/')
    cy.contains('English')
  })
  it('Click and Change the language to portuguese', () => {
    cy.getTestId('MENU.SELECT').click()
    cy.get('div a[href="/pt"]').click()
    cy.location('pathname').should('match', /\/pt$/)
    cy.contains('Português')
  })
})
