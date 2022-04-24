import { formatLocalTime } from './date.utils';

describe('formatLocalTime', () => {
    it('should format the time to local format', () => {
        const result = formatLocalTime('2022-07-01T11:25:00');
        expect(result).toEqual('11:25 AM');
    });
});
