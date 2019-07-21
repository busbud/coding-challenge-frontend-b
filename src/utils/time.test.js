import { getDepartureDuration } from './time'
describe("getDepartureDuration", () => {
    it("Should return zero for the same dates", () => {
        expect(getDepartureDuration({
            "departure_timezone": "America/New_York",
            "arrival_timezone": "America/New_York",
            "departure_time": "2019-08-02T10:05:00",
            "arrival_time": "2019-08-02T10:05:00",
        })).toEqual({
            days: 0,
            hours: 0,
            minutes: 0
        })
    })

    it("Should return correct diff within same TZ", () => {
        expect(getDepartureDuration({
            "departure_timezone": "America/New_York",
            "arrival_timezone": "America/New_York",
            "departure_time": "2019-08-02T10:05:00",
            "arrival_time": "2019-08-03T11:15:00",
        })).toEqual({
            days: 1,
            hours: 1,
            minutes: 10
        })
    })

    it("Should return correct diff within same TZ", () => {
        expect(getDepartureDuration({
            "departure_timezone": "America/Montreal",
            "arrival_timezone": "America/Halifax",
            "departure_time": "2019-07-25T21:30:00",
            "arrival_time": "2019-07-26T21:55:00",
        })).toEqual({
            days: 0,
            hours: 23,
            minutes: 25
        })
    })
})
