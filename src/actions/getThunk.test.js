import getThunk from './getThunk';
import types from './types';

describe('getThunk', () => {
	it('should give me plain action', () => {
		const result = getThunk(types.generalError)('hi');
		expect(result.type).toBe(types.generalError);
		expect(result.payload).toBe('hi');
	});

	it('should give me saga', () => {
		// noinspection Eslint
		const side = jest.fn();
		getThunk(types.generalError, () => side)('hi')(() => {});
		expect(side).toHaveBeenCalled();
	});
});
