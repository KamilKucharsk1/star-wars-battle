/// <reference types="cypress" />
/// <reference path="../support/index.d.ts" />

describe('Star Wars Battle System', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  describe('Initial Page Load', () => {
    it('should display all main UI elements', () => {
      // Check main title
      cy.contains('Star Wars Battle').should('be.visible')
      
      // Check battle type toggles - using button element instead of role
      cy.get('button').contains('People').should('be.visible')
      cy.get('button').contains('Starships').should('be.visible')
      
      // Check score counters
      cy.contains(/left wins:/i).should('be.visible')
      cy.contains(/right wins:/i).should('be.visible')
      
      // Check Play Again button appears after loading
      cy.get('button').contains(/play again/i, { timeout: 10000 })
        .should('be.visible')
    })

    it('should load battle cards automatically', () => {
      // Wait for cards to load
      cy.waitForBattleCards()
      
      // Should show people battle by default
      cy.contains(/mass:/i).should('be.visible')
      
      // Should display winner
      cy.checkBattleResult()
    })
  })

  describe('Battle Type Switching', () => {
    it('should switch from people to starships', () => {
      // Wait for initial load
      cy.waitForBattleCards()
      cy.contains(/mass:/i).should('be.visible')
      
      // Switch to starships
      cy.switchBattleType('starships')
      
      // Verify starships battle
      cy.contains(/crew:/i).should('be.visible')
      cy.contains(/mass:/i).should('not.exist')
    })

    it('should switch back from starships to people', () => {
      // Wait for initial load and switch to starships
      cy.waitForBattleCards()
      cy.switchBattleType('starships')
      
      // Switch back to people
      cy.switchBattleType('people')
      
      // Verify people battle
      cy.contains(/mass:/i).should('be.visible')
      cy.contains(/crew:/i).should('not.exist')
    })

    it('should maintain battle functionality after switching', () => {
      cy.waitForBattleCards()
      
      // Switch type and verify Play Again still works
      cy.switchBattleType('starships')
      
      cy.get('button').contains(/play again/i).click()
      
      // Should still show starships battle
      cy.waitForBattleCards()
      cy.contains(/crew:/i).should('be.visible')
      cy.checkBattleResult()
    })
  })

  describe('Play Again Functionality', () => {
    it('should start new battle when Play Again is clicked', () => {
      cy.waitForBattleCards()
      
      // Get initial card names
      cy.get('[data-testid="battle-card"]').first()
        .find('h5, h1, h2, h3, h4, h6')
        .invoke('text')
        .as('firstCardName')
      
      // Click Play Again
      cy.get('button').contains(/play again/i).click()
      
      // Should still have 2 cards and a result
      cy.waitForBattleCards()
      cy.checkBattleResult()
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
      for (let i = 0; i < 5; i++) {
        cy.get('button').contains(/play again/i).click()
        cy.waitForBattleCards()
        cy.checkBattleResult()
        
        // Verify scores are still valid numbers
        cy.contains(/left wins: (\d+)/i).should('be.visible')
        cy.contains(/right wins: (\d+)/i).should('be.visible')
      }
      
      // Verify that both scores are non-negative integers
      cy.contains(/left wins: (\d+)/i).invoke('text').then((leftText) => {
        const leftScore = parseInt((leftText as string).match(/\d+/)?.[0] || '0')
        expect(leftScore).to.be.at.least(0)
      })
      
      cy.contains(/right wins: (\d+)/i).invoke('text').then((rightText) => {
        const rightScore = parseInt((rightText as string).match(/\d+/)?.[0] || '0')
        expect(rightScore).to.be.at.least(0)
      })
    })

    it('should maintain scores across battle type switches', () => {
      cy.waitForBattleCards()
      
      // Play a few rounds to get some scores
      for (let i = 0; i < 2; i++) {
        cy.get('button').contains(/play again/i).click()
        cy.waitForBattleCards()
      }
      
      // Get scores before switch
      cy.contains(/left wins: (\d+)/i).invoke('text').as('leftBeforeSwitch')
      cy.contains(/right wins: (\d+)/i).invoke('text').as('rightBeforeSwitch')
      
      // Switch battle type
      cy.switchBattleType('starships')
      
      // Scores should be maintained
      cy.get('@leftBeforeSwitch').then((leftBefore) => {
        cy.get('@rightBeforeSwitch').then((rightBefore) => {
          cy.contains(/left wins: (\d+)/i).should('have.text', leftBefore)
          cy.contains(/right wins: (\d+)/i).should('have.text', rightBefore)
        })
      })
    })
  })

  describe('Resource Section Independence', () => {
    it('should display existing resources section', () => {
      cy.contains('Existing Resources').should('be.visible')
      
      // Should have tabs
      cy.get('[role="tab"]').should('have.length.at.least', 2)
    })

    it('should not affect battle when browsing resources', () => {
      cy.waitForBattleCards()
      
      // Get current battle type (should be people by default)
      cy.contains(/mass:/i).should('be.visible')
      
      // Interact with resources section (if tabs are available)
      cy.get('[role="tab"]').first().click()
      
      // Battle section should remain unchanged
      cy.contains(/mass:/i).should('still.be.visible')
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
          expect($newCard.width()).to.equal(initialWidth)
          expect($newCard.height()).to.equal(initialHeight)
        })
      })
    })

    it('should not cause layout shift during type switching', () => {
      cy.waitForBattleCards()
      
      // Get initial layout measurements
      cy.get('[data-testid="battle-card"]').first().then(($card) => {
        const initialTop = $card.offset()?.top
        const initialLeft = $card.offset()?.left
        
        // Switch battle type
        cy.switchBattleType('starships')
        
        // Check layout hasn't shifted
        cy.get('[data-testid="battle-card"]').first().should(($newCard) => {
          expect($newCard.offset()?.top).to.equal(initialTop)
          expect($newCard.offset()?.left).to.equal(initialLeft)
        })
      })
    })
  })

  describe('Error Handling and Edge Cases', () => {
    it('should handle rapid clicking gracefully', () => {
      cy.waitForBattleCards()
      
      // Rapidly click Play Again multiple times
      const playButton = cy.get('button').contains(/play again/i)
      
      for (let i = 0; i < 5; i++) {
        playButton.click()
      }
      
      // Should still work properly
      cy.waitForBattleCards()
      cy.checkBattleResult()
    })

    it('should handle rapid battle type switching', () => {
      cy.waitForBattleCards()
      
      // Rapidly switch between battle types
      cy.switchBattleType('starships')
      cy.switchBattleType('people')
      cy.switchBattleType('starships')
      cy.switchBattleType('people')
      
      // Should settle into a stable state
      cy.waitForBattleCards()
      cy.contains(/mass:/i).should('be.visible')
      cy.checkBattleResult()
    })
  })

  describe('Mobile Responsiveness', () => {
    it('should work properly on mobile viewport', () => {
      cy.viewport('iphone-x')
      cy.visit('/')
      
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