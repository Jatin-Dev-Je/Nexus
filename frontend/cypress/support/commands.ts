// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Custom command to select by data-testid
Cypress.Commands.add('getByTestId', (selector: string) => {
  return cy.get(`[data-testid="${selector}"]`)
})

// Custom command to login (if authentication is added later)
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.session(
    [email, password],
    () => {
      cy.visit('/login')
      cy.get('[data-testid="email-input"]').type(email)
      cy.get('[data-testid="password-input"]').type(password)
      cy.get('[data-testid="login-button"]').click()
      cy.url().should('include', '/dashboard')
    },
    {
      validate: () => {
        cy.getCookie('auth-token').should('exist')
      },
    }
  )
})

// Custom command to check if element is in viewport
Cypress.Commands.add('isInViewport', { prevSubject: true }, (subject) => {
  const bottom = Cypress.$(cy.state('window')).height()
  const rect = subject[0].getBoundingClientRect()

  expect(rect.top).to.be.lessThan(bottom)
  expect(rect.bottom).to.be.greaterThan(0)
  
  return subject
})

// Custom command to wait for content to load
Cypress.Commands.add('waitForContent', () => {
  cy.get('[data-testid="loading-spinner"]').should('not.exist')
  cy.get('[data-testid="content-card"]').should('be.visible')
})

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-testid attribute.
       */
      getByTestId(value: string): Chainable<JQuery<HTMLElement>>
      
      /**
       * Custom command to login a user
       */
      login(email: string, password: string): Chainable<void>
      
      /**
       * Custom command to check if element is in viewport
       */
      isInViewport(): Chainable<JQuery<HTMLElement>>
      
      /**
       * Custom command to wait for content to load
       */
      waitForContent(): Chainable<void>
    }
  }
}
