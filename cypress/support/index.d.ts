/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Wait for battle cards to load completely
     */
    waitForBattleCards(): Chainable<Element>
    
    /**
     * Check that battle result is displayed
     */
    checkBattleResult(): Chainable<Element>
    
    /**
     * Switch battle type between people and starships
     */
    switchBattleType(type: 'people' | 'starships'): Chainable<Element>
    
    /**
     * Wait for GraphQL API calls to complete
     */
    waitForAPI(): Chainable<Element>
  }
} 