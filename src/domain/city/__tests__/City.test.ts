import { citiesFactory } from 'test/factories'
import { CityDomain } from '..'

describe('CityDomain', () => {
  describe('getCityByName', () => {
    it('get Correct City', () => {
      const city = CityDomain.getCityByName('Quebec')
      expect(city).toHaveProperty('geohash')
    })
  })

  describe('getCityById', () => {
    it('get Correct City', () => {
      const city = CityDomain.getCityById('1', citiesFactory)

      expect(city.name).toBe('Quebec')
    })
  })

  describe('getNames', () => {
    it('get Cities Names', () => {
      const citiesArr = CityDomain.getNames(citiesFactory)
      expect(citiesArr).toEqual([citiesFactory[0].name, citiesFactory[1].name])
    })
  })
})
export {}
