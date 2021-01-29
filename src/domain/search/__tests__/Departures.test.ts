import { DeparturesDomain } from '../'
import {
  searchDepartures,
  responseToListFactory,
  departuresFactory,
} from 'test/factories'
import { calculateTravelTime } from '../Departures'

describe('DeparturesDomain', () => {
  describe('responseToList', () => {
    it('formats response to Departures List', () => {
      expect(DeparturesDomain.responseToList(searchDepartures())).toStrictEqual(
        responseToListFactory
      )
    })
  })
  describe('calculateTravelTime', () => {
    it('calculates the travel duration', () => {
      expect(
        calculateTravelTime(
          departuresFactory[0].departure_time,
          departuresFactory[0].arrival_time
        )
      ).toBe('3 hours')
    })
  })
})
