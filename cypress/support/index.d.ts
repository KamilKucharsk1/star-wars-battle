/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to wait for battle cards to load
       * @example cy.waitForBattleCards()
       */
      waitForBattleCards(): Chainable<void>
      
      /**
       * Custom command to check battle result
       * @example cy.checkBattleResult()
       */
      checkBattleResult(): Chainable<void>
      
      /**
       * Custom command to switch battle type
       * @example cy.switchBattleType('starships')
       */
      switchBattleType(type: 'people' | 'starships'): Chainable<void>
    }
  }
}

export {} 