/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
Cypress.Commands.add('dataCy', (selector, ...args) => (
  cy.get(`[data-cy=${selector}]`, ...args)));

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    dataCy(value: string): Chainable<Element>
  }
}
