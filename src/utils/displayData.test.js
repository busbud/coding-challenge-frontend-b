import { displayISOTime, displayPrice, displayAddressAry } from './displayData';

describe('displayISOTime', () => {
  it('formats ISO8601 dateTime as human-readable string', () => {
    expect(displayISOTime('2018-08-02T11:55:55'))
      .toEqual('Thursday, August 2nd 2018, 11:55');
  });

  it('assumes midnight if it receives no time', () => {
    expect(displayISOTime('2018-08-02'))
      .toEqual('Thursday, August 2nd 2018, 00:00');
  });
});

describe('displayPrice', () => {
  it('converts a number in cents to USD', () => {
    expect(displayPrice(900))
      .toEqual('$9.00 USD');
  });

  it('returns <$1 USD for any number < 100', () => {
    expect(displayPrice(90))
      .toEqual('<$1 USD');
  });
});

describe('displayAddressAry', () => {
  it('joins an array of strings with a comma and a line-break', () => {
    expect(displayAddressAry(['town house', 'the city', 'Canada']))
      .toEqual('town house,\nthe city,\nCanada');
  });
});
