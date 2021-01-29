import { SearchDomain } from '../'
import { searchDomainClassFactory } from 'test/factories'

describe('SearchDomain', () => {
  describe('hasMaxPassengers', () => {
    describe(`when reach the maximum of ${SearchDomain.MAX_PASSENGERS}`, () => {
      it('returns true', () => {
        expect(SearchDomain.hasMaxPassengers(5)).toEqual(true)
      })
    })
    describe(`when has less than ${SearchDomain.MAX_PASSENGERS}`, () => {
      it('returns false', () => {
        expect(SearchDomain.hasMaxPassengers(2)).toEqual(false)
      })
    })
  })

  describe('class Search', () => {
    const testSearch = SearchDomain.Search.start(searchDomainClassFactory)

    describe('urlParams', () => {
      const date = new Date(searchDomainClassFactory.outboundDate)
        .toISOString()
        .split('T')[0]
      const valid = `${searchDomainClassFactory.origin.geohash}/${searchDomainClassFactory.destination.geohash}/${date}`

      expect(testSearch.urlParams()).toEqual(valid)
    })

    describe('queryParams', () => {
      const valid = {
        adult: searchDomainClassFactory.adult,
        child: searchDomainClassFactory.child,
        senior: searchDomainClassFactory.senior,
        senior_ages: searchDomainClassFactory.senior_ages
          .map((age) => parseInt(age))
          .join(','),
        child_ages: searchDomainClassFactory.child_ages.join(','),
        lang: searchDomainClassFactory.lang,
        currency: searchDomainClassFactory.currency,
      }

      expect(testSearch.queryParams()).toEqual(valid)
    })
  })
})
