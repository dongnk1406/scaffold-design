import { describe, it, expect } from 'vitest'

describe('test environment', () => {
  it('runs in jsdom (document is defined)', () => {
    expect(typeof document).toBe('object')
  })
})
