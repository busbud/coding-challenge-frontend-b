import { buildUrl } from '../helpers';

import { ApiConfiguration } from '../../../configuration';

describe('build url', () => {
  it('should return the builed url', () => {
    const adultCount = 1;
    const childCount = 2;
    const seniorCount = 0;
    const arrivalGeohash = 'xyz999';
    const originGeohash = 'foo666';
    const outboundDate = '2017-05_12T00:000';

    const url = buildUrl({
      adultCount,
      childCount,
      seniorCount,
      originGeohash,
      arrivalGeohash,
      outboundDate,
    });

    const expectedUrl = `${
      ApiConfiguration.search
    }/${originGeohash}/${arrivalGeohash}/${outboundDate}?adult=${adultCount}&child=${childCount}&senior=${seniorCount}&lang=en-en&currency=USD`;

    expect(url).toBe(expectedUrl);
  });

  it('should return the builed url when polling', () => {
    const adultCount = 1;
    const childCount = 2;
    const seniorCount = 0;
    const arrivalGeohash = 'xyz999';
    const originGeohash = 'foo666';
    const outboundDate = '2017-05_12T00:000';

    const url = buildUrl({
      adultCount,
      childCount,
      seniorCount,
      originGeohash,
      arrivalGeohash,
      outboundDate,
      polling: true,
    });

    const expectedUrl = `${
      ApiConfiguration.search
    }/${originGeohash}/${arrivalGeohash}/${outboundDate}/poll?adult=${adultCount}&child=${childCount}&senior=${seniorCount}&lang=en-en&currency=USD`;

    expect(url).toBe(expectedUrl);
  });
});
