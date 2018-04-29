import { displayISOTime } from './displayData';

describe('displayISOTime', () => {
  it('formats ISO8601 dateTime as human-readable string', () => {
    expect(displayISOTime('2018-08-02T11:55:55'))
      .toEqual('Thursday, August 2nd 2018, 11:55');
  });
});
