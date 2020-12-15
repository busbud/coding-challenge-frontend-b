import { formatTime } from '../common';

describe('should format the date and only keep the time part HH:MM', () => {
  it('should return null on 204 response', () => {
    const date = new Date('2020-12-14T14:30:12.149Z');
    expect(formatTime(date)).toEqual('09:30:12');
  });
});
