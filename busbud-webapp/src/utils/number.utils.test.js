import { formatCurrency } from './number.utils';

describe('formatCurrency util method', () => {
    it('should format the number with currency', () => {
        const res = formatCurrency(2490.45, 'CAD');
        expect(res).toEqual('CA$2,490.45');
    });

    it('should format the number with 2 decimals if not specified', () => {
        const res = formatCurrency(2490, 'CAD');
        expect(res).toEqual('CA$2,490.00');
    });
});
