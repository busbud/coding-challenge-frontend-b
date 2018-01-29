import formatDate from './date'

describe('formatDate', () => {
	it('format correctly', () => {
		const date = new Date(2018, 7, 2)
		expect(formatDate(date)).toBe('2018-08-02')
	})
})
