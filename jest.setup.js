// Import jest-dom for custom matchers
import '@testing-library/jest-dom'

// Polyfills for Node.js environment
import { TextEncoder, TextDecoder } from 'util'
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

// Mock Request/Response for Web API tests
global.Request = class MockRequest {
  constructor(url, options = {}) {
    this.url = url
    this.method = options?.method || 'GET'
    this.headers = new Map(Object.entries(options?.headers || {}))
    this.body = options?.body
    this._bodyText = options?.body || ''
  }

  async text() {
    return this._bodyText
  }

  async json() {
    return JSON.parse(this._bodyText)
  }
}

global.Response = class MockResponse {
  constructor(body, options = {}) {
    this.body = body
    this.status = options?.status || 200
    this.statusText = options?.statusText || 'OK'
    this.headers = new Map(Object.entries(options?.headers || {}))
    this.ok = this.status >= 200 && this.status < 300
  }
  
  async json() {
    return JSON.parse(this.body)
  }
  
  get(name) {
    return this.headers.get(name)
  }
}

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

// Mock fetch globally for tests
global.fetch = jest.fn()

// Mock Next.js cache
jest.mock('next/cache', () => ({
  revalidatePath: jest.fn(),
}))

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  // Uncomment to ignore specific console methods in tests
  // log: jest.fn(),
  // warn: jest.fn(),
  // error: jest.fn(),
} 