import formatTime from './time'

describe('formatTime', () => {
	it('should prepend zeroes when needed', () => {
		expect(formatTime('2018-01-19T15:01:00')).toBe('15:01')
		expect(formatTime('2018-01-19T01:15:00')).toBe('01:15')
		expect(formatTime('2018-01-19T01:01:00')).toBe('01:01')
		expect(formatTime('2018-01-19T15:15:00')).toBe('15:15')
	})
})
