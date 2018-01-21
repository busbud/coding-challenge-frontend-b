import getDayDiff from './dayDiff'

describe('dayDiff', () => {
	it('should prompt 0 if day is the same', () => {
		expect(getDayDiff('2018-01-19T15:00:00', '2018-01-19T23:00:00')).toBe(0)
	})
	it('should work with sunday', () => {
		expect(getDayDiff('2018-01-21T15:00:00', '2018-01-22T15:00:00')).toBe(1)
	})
})
