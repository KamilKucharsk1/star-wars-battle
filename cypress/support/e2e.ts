// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Global error handling
Cypress.on('uncaught:exception', (err, runnable) => {
  // Ignore certain errors that don't affect functionality
  if (
    err.message.includes('ResizeObserver loop limit exceeded') ||
    err.message.includes('Non-Error promise rejection captured') ||
    err.message.includes('ChunkLoadError') ||
    err.message.includes('NetworkError') ||
    err.message.includes('Loading CSS chunk') ||
    err.message.includes('Loading chunk') ||
    err.message.includes('Script error') ||
    err.stack?.includes('chunk-') ||
    err.stack?.includes('dynamic import')
  ) {
    return false // Prevent Cypress from failing the test
  }
  
  // Let other errors fail the test
  return true
})

// Handle unhandled promise rejections
Cypress.on('fail', (err, runnable) => {
  if (err.message.includes('Promise')) {
    console.warn('Promise rejection caught:', err.message)
  }
  throw err
}) 