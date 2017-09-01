import fetchTickets from './fetchTickets.transformer';
import data from './test/data.json';

describe('Transformer', () => {
	it('should make data pretty', () => {
		const transformed = fetchTickets({ data });
		expect(transformed.tickets[0].price).toBe(7013);
	});
});
