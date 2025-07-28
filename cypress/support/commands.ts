/// <reference types="cypress" />

Cypress.Commands.add('waitForBattleCards', () => {
  // Wait for loading to disappear and cards to appear
  cy.get('.MuiCircularProgress-root', { timeout: 10000 }).should('not.exist')
  cy.get('[data-testid="battle-card"]', { timeout: 10000 }).should('have.length', 2)
})

Cypress.Commands.add('checkBattleResult', () => {
  // Check that a winner is displayed
  cy.contains(/wins!|draw!/i, { timeout: 5000 }).should('be.visible')
})

Cypress.Commands.add('switchBattleType', (type: 'people' | 'starships') => {
  // Use button element instead of role selector
  cy.get('button').contains(type === 'people' ? 'People' : 'Starships').click()
  
  // Wait for the switch to complete
  if (type === 'people') {
    cy.contains(/mass:/i, { timeout: 5000 }).should('be.visible')
  } else {
    cy.contains(/crew:/i, { timeout: 5000 }).should('be.visible')
  }
})

// Enhanced visit command with error suppression
Cypress.Commands.overwrite('visit', (originalFn, url, options) => {
  return originalFn(url, {
    ...options,
    onBeforeLoad: (win) => {
      // Suppress ResizeObserver errors
      win.addEventListener('error', (e) => {
        if (e.message.includes('ResizeObserver loop limit exceeded')) {
          e.stopImmediatePropagation()
        }
      })
      
      if (options?.onBeforeLoad) {
        options.onBeforeLoad(win)
      }
    }
  })
}) 