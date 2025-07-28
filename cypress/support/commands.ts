/// <reference types="cypress" />

Cypress.Commands.add('waitForBattleCards', () => {
  // First wait for the page to finish loading
  cy.get('body', { timeout: 15000 }).should('be.visible')
  
  // Wait for any loading spinner to disappear (multiple possible selectors)
  cy.get('body').then($body => {
    if ($body.find('.MuiCircularProgress-root').length > 0) {
      cy.get('.MuiCircularProgress-root', { timeout: 5000 }).should('not.exist')
    }
  })
  
  // Wait for battle cards to appear
  cy.get('[data-testid="battle-card"]', { timeout: 5000 })
    .should('have.length', 2)
    .should('be.visible')
  
  // Ensure cards have content loaded
  cy.get('[data-testid="battle-card"]').each($card => {
    cy.wrap($card).find('h5, h1, h2, h3, h4, h6').should('not.be.empty')
  })
})

Cypress.Commands.add('checkBattleResult', () => {
  // Check that a winner is displayed - wait longer and be more flexible
  cy.get('body', { timeout: 10000 }).should(($body) => {
    const text = $body.text()
    expect(text).to.satisfy((text: string) => {
      return text.includes('wins!') || 
             text.includes('draw!') || 
             text.includes('Left card wins!') || 
             text.includes('Right card wins!') || 
             text.includes("It's a draw!")
    })
  })
})

Cypress.Commands.add('switchBattleType', (type: 'people' | 'starships') => {
  // Click the toggle button for the specified type
  cy.get('button[value="' + type + '"]').click()
  
  // Wait for the switch to complete with longer timeout
  cy.waitForBattleCards()
  
  // Verify the correct battle type is active by checking for expected content
  if (type === 'people') {
    // For people, we expect to see mass-related content
    cy.get('[data-testid="battle-card"]', { timeout: 10000 }).should(($cards) => {
      const text = $cards.text()
      expect(text).to.satisfy((text: string) => {
        return text.includes('kg') || text.includes('mass') || text.includes('Mass')
      })
    })
  } else {
    // For starships, we expect to see crew-related content  
    cy.get('[data-testid="battle-card"]', { timeout: 10000 }).should(($cards) => {
      const text = $cards.text()
      expect(text).to.satisfy((text: string) => {
        return text.includes('crew') || text.includes('Crew') || text.includes('passengers')
      })
    })
  }
})

// Wait for API calls to complete
Cypress.Commands.add('waitForAPI', () => {
  cy.intercept('POST', '/api/graphql').as('graphqlQuery')
  cy.wait('@graphqlQuery', { timeout: 15000 })
})

// Enhanced visit command with better error handling
Cypress.Commands.overwrite('visit', (originalFn, url, options) => {
  return originalFn(url, {
    ...options,
    timeout: 30000,
    onBeforeLoad: (win) => {
      // Suppress common errors that don't affect functionality
      win.addEventListener('error', (e) => {
        if (
          e.message.includes('ResizeObserver loop limit exceeded') ||
          e.message.includes('Non-Error promise rejection captured') ||
          e.message.includes('ChunkLoadError')
        ) {
          e.stopImmediatePropagation()
          return false
        }
      })
      
      if (options?.onBeforeLoad) {
        options.onBeforeLoad(win)
      }
    }
  })
}) 