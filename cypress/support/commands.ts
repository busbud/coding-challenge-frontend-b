/// <reference types="Cypress" />

export {}

declare global {
  namespace Cypress {
    interface Chainable {
      getTestId: typeof getTestId
    }
  }
}

function getTestId(cyName: string) {
  return cy.get(`[data-testid='${cyName}']`)
}

Cypress.Commands.add('getTestId', getTestId)
