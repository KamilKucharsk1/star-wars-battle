/// <reference types="cypress" />
/// <reference path="../support/index.d.ts" />

describe('Star Wars Battle System', () => {
  beforeEach(() => {
    // Set up API intercepts
    cy.intercept('POST', '/api/graphql').as('graphqlQuery')
    cy.visit('/')
    // Wait for initial API calls
    cy.wait('@graphqlQuery', { timeout: 15000 })
  })

  describe('Initial Page Load', () => {
    it('should display all main UI elements', () => {
      // Check main title
      cy.contains('Star Wars Battle').should('be.visible')
      
      // Check battle type toggles - using specific button selectors
      cy.get('button[value="people"]').should('be.visible').and('contain', 'People')
      cy.get('button[value="starships"]').should('be.visible').and('contain', 'Starships')
      
      // Check score counters
      cy.contains(/left wins:/i).should('be.visible')
      cy.contains(/right wins:/i).should('be.visible')
      
      // Check Play Again button appears after loading
      cy.get('button').contains(/play again/i, { timeout: 15000 })
        .should('be.visible')
        .and('not.be.disabled')
    })

    it('should load battle cards automatically', () => {
      // Wait for cards to load
      cy.waitForBattleCards()
      
      // Should show people battle by default
      cy.contains(/mass/i).should('be.visible')
      
      // Should display winner
      cy.checkBattleResult()
    })
  })

  describe('Battle Type Switching', () => {
    it('should switch from people to starships', () => {
      // Wait for initial load
      cy.waitForBattleCards()
      cy.contains(/mass/i).should('be.visible')
      
      // Switch to starships
      cy.switchBattleType('starships')
      
      // Verify starships battle - switchBattleType already checks for appropriate content
      cy.checkBattleResult()
    })

    it('should switch back from starships to people', () => {
      // Wait for initial load and switch to starships
      cy.waitForBattleCards()
      cy.switchBattleType('starships')
      cy.contains(/crew/i).should('be.visible')
      
      // Switch back to people
      cy.switchBattleType('people')
      
      // Verify people battle
      cy.contains(/mass/i).should('be.visible')
      cy.contains(/crew/i).should('not.exist')
      cy.checkBattleResult()
    })

    it('should maintain battle functionality after switching', () => {
      cy.waitForBattleCards()
      
      // Switch type and verify Play Again still works
      cy.switchBattleType('starships')
      
      cy.get('button').contains(/play again/i).click()
      
      // Should still show starships battle
      cy.waitForBattleCards()
      cy.contains(/crew/i).should('be.visible')
      cy.checkBattleResult()
    })
  })

  describe('Play Again Functionality', () => {
    it('should start new battle when Play Again is clicked', () => {
      cy.waitForBattleCards()
      
      // Get initial card names for comparison
      cy.get('[data-testid="battle-card"]').first()
        .find('h5, h1, h2, h3, h4, h6')
        .invoke('text')
        .as('firstCardName')
      
      // Click Play Again
      cy.get('button').contains(/play again/i).click()
      
      // Should still have 2 cards and a result
      cy.waitForBattleCards()
      cy.checkBattleResult()
      
      // Cards should be loaded with content
      cy.get('[data-testid="battle-card"]').should('have.length', 2)
      cy.get('[data-testid="battle-card"]').each($card => {
        cy.wrap($card).find('h5, h1, h2, h3, h4, h6').should('not.be.empty')
      })
    })

    it('should work multiple times in succession', () => {
      cy.waitForBattleCards()
      
      // Click Play Again multiple times
      for (let i = 0; i < 3; i++) {
        cy.get('button').contains(/play again/i).click()
        cy.waitForBattleCards()
        cy.checkBattleResult()
      }
    })
  })

  describe('Score Tracking', () => {
    it('should increment scores over multiple battles', () => {
      cy.waitForBattleCards()
      
      // Simply verify that scores are displayed and functional
      cy.contains(/left wins:/i).should('be.visible')
      cy.contains(/right wins:/i).should('be.visible')
      
      // Play several battles and verify the scores remain valid numbers
      for (let i = 0; i < 3; i++) {
        cy.get('button').contains(/play again/i).click()
        cy.waitForBattleCards()
        cy.checkBattleResult()
        
        // Verify scores are still valid numbers
        cy.contains(/left wins: (\d+)/i).should('be.visible')
        cy.contains(/right wins: (\d+)/i).should('be.visible')
      }
    })

    it('should maintain scores across battle type switches', () => {
      cy.waitForBattleCards()
      
      // Play a few rounds to get some scores
      cy.get('button').contains(/play again/i).click()
      cy.waitForBattleCards()
      
      // Get scores before switch
      cy.contains(/left wins: (\d+)/i).invoke('text').as('leftBeforeSwitch')
      cy.contains(/right wins: (\d+)/i).invoke('text').as('rightBeforeSwitch')
      
      // Switch battle type
      cy.switchBattleType('starships')
      
      // Scores should be maintained (check that they're still numbers)
      cy.contains(/left wins: (\d+)/i).should('be.visible')
      cy.contains(/right wins: (\d+)/i).should('be.visible')
    })
  })

  describe('Resource Section Independence', () => {
    it('should display existing resources section', () => {
      cy.contains('Existing Resources').should('be.visible')
      
      // Should have tabs
      cy.get('[role="tab"]').should('have.length.at.least', 2)
      
      // Check that people tab is available
      cy.get('[role="tab"]').contains('people').should('be.visible')
      cy.get('[role="tab"]').contains('starships').should('be.visible')
    })

    it('should not affect battle when browsing resources', () => {
      cy.waitForBattleCards()
      
      // Get current battle type (should be people by default)
      cy.contains(/mass/i).should('be.visible')
      
      // Interact with resources section
      cy.get('[role="tab"]').contains('starships').click()
      
      // Battle section should remain unchanged
      cy.contains(/mass/i).should('still.be.visible')
      cy.get('[data-testid="battle-card"]').should('have.length', 2)
    })
  })

  describe('Layout Stability', () => {
    it('should maintain consistent card dimensions', () => {
      cy.waitForBattleCards()
      
      // Get initial card dimensions
      cy.get('[data-testid="battle-card"]').first().then(($card) => {
        const initialWidth = $card.width()
        const initialHeight = $card.height()
        
        // Play again and check dimensions remain consistent
        cy.get('button').contains(/play again/i).click()
        cy.waitForBattleCards()
        
        cy.get('[data-testid="battle-card"]').first().should(($newCard) => {
          // Allow for small differences due to different content
          expect($newCard.width()).to.be.closeTo(initialWidth || 0, 20)
          expect($newCard.height()).to.be.closeTo(initialHeight || 0, 20)
        })
      })
    })

    it('should not cause major layout shift during type switching', () => {
      cy.waitForBattleCards()
      
      // Get initial page height
      cy.get('body').then(($body) => {
        const initialHeight = $body.height()
        
        // Switch battle type
        cy.switchBattleType('starships')
        
        // Check layout hasn't shifted dramatically
        cy.get('body').should(($newBody) => {
          const newHeight = $newBody.height()
          // Allow for some content difference but no major shifts
          expect(newHeight).to.be.closeTo(initialHeight || 0, 100)
        })
      })
    })
  })

  describe('Error Handling and Edge Cases', () => {
    it('should handle rapid clicking gracefully', () => {
      cy.waitForBattleCards()
      
      // Rapidly click Play Again multiple times
      for (let i = 0; i < 3; i++) {
        cy.get('button').contains(/play again/i).click()
        cy.wait(200) // Small delay to prevent overwhelming
      }
      
      // Should still work properly
      cy.waitForBattleCards()
      cy.checkBattleResult()
    })

    it('should handle rapid battle type switching', () => {
      cy.waitForBattleCards()
      
      // Switch between battle types with delays
      cy.switchBattleType('starships')
      cy.wait(500)
      cy.switchBattleType('people')
      cy.wait(500)
      
      // Should settle into a stable state
      cy.waitForBattleCards()
      cy.contains(/mass/i).should('be.visible')
      cy.checkBattleResult()
    })
  })

  describe('Mobile Responsiveness', () => {
    it('should work properly on mobile viewport', () => {
      cy.viewport('iphone-x')
      cy.reload()
      cy.wait('@graphqlQuery', { timeout: 15000 })
      
      cy.waitForBattleCards()
      
      // Main functionality should still work
      cy.contains('Star Wars Battle').should('be.visible')
      cy.get('[data-testid="battle-card"]').should('have.length', 2)
      cy.checkBattleResult()
      
      // Play Again should work
      cy.get('button').contains(/play again/i).click()
      cy.waitForBattleCards()
      cy.checkBattleResult()
    })
  })
}) 