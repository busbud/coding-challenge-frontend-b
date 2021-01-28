/// <reference types="Cypress" />

export {}

declare global {
  namespace Cypress {
    interface Chainable {
      getTestId: typeof getTestId
    }
  }
}

Cypress.Commands.add('getTestId', (cyName: string) => {
  return cy.get(`[data-testid='${cyName}']`)
})
