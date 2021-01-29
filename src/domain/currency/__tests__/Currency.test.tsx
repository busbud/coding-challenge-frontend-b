import { CurrencyDomain } from '../'
import { EN, PT, FR, ES } from '../../language/Language'

describe('CurrencyDomain', () => {
  describe('getLocationCurrency', () => {
    it('returns the correct currency for provided location', () => {
      expect(CurrencyDomain.getLocationCurrency(EN)).toBe(CurrencyDomain.USD)
      expect(CurrencyDomain.getLocationCurrency(PT)).toBe(CurrencyDomain.BRL)
      expect(CurrencyDomain.getLocationCurrency(FR)).toBe(CurrencyDomain.CAD)
      expect(CurrencyDomain.getLocationCurrency(ES)).toBe(CurrencyDomain.EUR)
    })
    it('returns undefined in case of a invalid locale', () => {
      //@ts-ignore
      expect(CurrencyDomain.getLocationCurrency('de')).toBeUndefined()
    })
  })

  describe('formatPrice', () => {
    it('expects return correct value', () => {
      expect(
        CurrencyDomain.formatPrice({
          locale: EN,
          value: 10590,
          currency: CurrencyDomain.USD,
        })
      ).toBe('$105.90')
    })
  })
  describe('centsToFloat', () => {
    it('expects return correct value', () => {
      expect(CurrencyDomain.centsToFloat(10590)).toBe(105.9)
    })
  })
})
