import formatPrice from './price'

describe('formatPrice', () => {
	it('should format price without cents', () => {
		expect(formatPrice(4200)).toBe('42')
	})

	it('should format price with cents', () => {
		expect(formatPrice(2550)).toBe('25.50')
	})
})
