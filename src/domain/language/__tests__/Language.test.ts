import { LanguageDomain } from '../'

describe('LanguageDomain', () => {
  describe('getLangById', () => {
    it('returns the correct Lang ID', () => {
      expect(LanguageDomain.getLangId(LanguageDomain.EN)).toBe('english')
      expect(LanguageDomain.getLangId(LanguageDomain.PT)).toBe('portuguese')
      expect(LanguageDomain.getLangId(LanguageDomain.ES)).toBe('spanish')
      expect(LanguageDomain.getLangId(LanguageDomain.FR)).toBe('french')
    })
  })
})
