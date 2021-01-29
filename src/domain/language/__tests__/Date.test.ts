import { DateDomain, LanguageDomain } from '../'

describe('DateDomain', () => {
  describe('localeDateMask', () => {
    it('returns portuguese mask', () => {
      expect(DateDomain.localeDateMask(LanguageDomain.PT)).toBe('dd/MM/yyyy')
    })

    describe('when locale is different from PT', () => {
      it('returns the default mask', () => {
        expect(DateDomain.localeDateMask(LanguageDomain.ES)).toBe('MM/dd/yyyy')
      })
    })
  })

  describe('dateFormatted', () => {
    it('expect format properly', () => {
      const newDate = new Date('10/24/2020')
      expect(
        DateDomain.dateFormatted(
          newDate,
          DateDomain.localeDateMask(LanguageDomain.PT)
        )
      ).toBe('24/10/2020')
    })
  })

  describe('dateISO', () => {
    it('expect format properly', () => {
      const newDate = new Date('10/24/2020')
      expect(DateDomain.dateISO(newDate)).toEqual('2020-10-24T00:00:00Z')
    })
  })
})
