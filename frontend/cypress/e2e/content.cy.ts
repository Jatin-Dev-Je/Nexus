describe('Content Interaction', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should add content to favorites', () => {
    cy.get('[data-testid="content-card"]').first().within(() => {
      cy.get('[data-testid="favorite-button"]').click()
    })
    
    // Navigate to favorites
    cy.get('[data-testid="nav-favorites"]').click()
    cy.get('[data-testid="content-card"]').should('have.length.at.least', 1)
  })

  it('should remove content from favorites', () => {
    // First add to favorites
    cy.get('[data-testid="content-card"]').first().within(() => {
      cy.get('[data-testid="favorite-button"]').click()
    })
    
    // Navigate to favorites and remove
    cy.get('[data-testid="nav-favorites"]').click()
    cy.get('[data-testid="content-card"]').first().within(() => {
      cy.get('[data-testid="favorite-button"]').click()
    })
    
    cy.contains('No favorites yet').should('be.visible')
  })

  it('should open content in new tab', () => {
    cy.window().then((win) => {
      cy.stub(win, 'open').as('windowOpen')
    })
    
    cy.get('[data-testid="content-card"]').first().within(() => {
      cy.get('[data-testid="action-button"]').click()
    })
    
    cy.get('@windowOpen').should('have.been.called')
  })
})
