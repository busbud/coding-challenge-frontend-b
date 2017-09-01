import urlEncodeData from './urlEncodeData';

describe('urlEncodeData', () => {
	it('should encode object', () => {
		const result = urlEncodeData({
			prop: 1,
			deep: {
				email: 'email@email',
			},
		});

		expect(result).toBe('prop=1&deep=%5Bobject%20Object%5D');
	});
});
