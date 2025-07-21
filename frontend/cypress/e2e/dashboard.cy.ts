describe('Dashboard Navigation', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display the main dashboard', () => {
    cy.contains('Your Personalized Feed')
    cy.contains('Content Hub')
  })

  it('should navigate between sections', () => {
    // Test Feed section (default)
    cy.contains('Your Personalized Feed').should('be.visible')

    // Test Trending section
    cy.get('[data-testid="nav-trending"]').click()
    cy.contains('Trending Now').should('be.visible')

    // Test Favorites section
    cy.get('[data-testid="nav-favorites"]').click()
    cy.contains('Your Favorites').should('be.visible')

    // Test Settings section
    cy.get('[data-testid="nav-settings"]').click()
    cy.contains('Settings').should('be.visible')
  })

  it('should toggle dark mode', () => {
    cy.get('html').should('not.have.class', 'dark')
    cy.get('[data-testid="dark-mode-toggle"]').click()
    cy.get('html').should('have.class', 'dark')
  })

  it('should toggle sidebar on mobile', () => {
    cy.viewport('iphone-6')
    cy.get('[data-testid="sidebar-toggle"]').click()
    cy.get('[data-testid="sidebar"]').should('be.visible')
  })
})
