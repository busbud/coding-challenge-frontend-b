import { formatToCurrency } from './currencyHelpers'

describe('formatToCurrency function', () => {
  it('should return formatted ammount', () => {
    expect(formatToCurrency(6599, 'USD', true)).toBe('$65.99')
  })
})
