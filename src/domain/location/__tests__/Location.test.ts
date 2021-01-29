import { LocationDomain } from '../'
import { locationsFactory } from 'test/factories'

describe('LocationDomain', () => {
  describe('getLocationByName', () => {
    it('returns the correct', () => {
      expect(
        LocationDomain.getLocationByName(locationsFactory, 'Quebec Station')
      ).toBe(locationsFactory[0])
    })
  })
  describe('getLocationById', () => {
    it('returns the correct', () => {
      expect(LocationDomain.getLocationById(locationsFactory, 2)).toBe(
        locationsFactory[1]
      )
    })
  })
  describe('getNames', () => {
    it('returns the correct', () => {
      expect(LocationDomain.getNames(locationsFactory)).toEqual([
        locationsFactory[0].name,
        locationsFactory[1].name,
      ])
    })
  })
})
