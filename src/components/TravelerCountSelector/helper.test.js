import { computeTravellerCount } from './helpers';

describe('computeTravellerCount', () => {
  it('should increase the travellerCount', () => {
    const sign = '+';

    const currentValue = 5;
    expect(computeTravellerCount(sign, currentValue)).toBe(6);
  });

  it('should decrease the travellerCount', () => {
    const sign = '-';

    const currentValue = 5;
    expect(computeTravellerCount(sign, currentValue)).toBe(4);
  });

  it('should NOT decrease the travellerCount if the current count is 0', () => {
    const sign = '-';

    const currentValue = 0;
    expect(computeTravellerCount(sign, currentValue)).toBe(0);
  });

  it('should increase the travellerCount  even if the current count is 0 and if the sign is +', () => {
    const sign = '+';
    const currentValue = 0;
    expect(computeTravellerCount(sign, currentValue)).toBe(1);
  });
});
