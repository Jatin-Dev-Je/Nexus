describe('Search Functionality', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should perform search', () => {
    cy.get('[data-testid="search-input"]').type('technology')
    cy.get('[data-testid="search-results"]').should('be.visible')
  })

  it('should filter search results', () => {
    cy.get('[data-testid="search-input"]').type('news')
    cy.get('[data-testid="filter-news"]').click()
    cy.get('[data-testid="content-card"]').should('contain', 'News')
  })

  it('should handle empty search results', () => {
    cy.get('[data-testid="search-input"]').type('xyz123nonexistent')
    cy.contains('No results found').should('be.visible')
  })
})
