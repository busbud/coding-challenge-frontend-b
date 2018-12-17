// @flow

import {
  buildUrl,
  mapSearchResultToTravelInformations,
  mapApiResultToProposedTrip,
} from '../helpers';
import type { ProposedTrip, TravelInformations } from '../../../types';

import { apiResult, travelInformations, proposedTrips } from '../fixtures';

import { ApiConfiguration } from '../../../configuration';

describe('build url', () => {
  it('should return the builed url', () => {
    const adultCount = 1;
    const childCount = 2;
    const seniorCount = 0;
    const arrivalGeohash = 'xyz999';
    const originGeohash = 'foo"geoH@5h"';
    const outboundDate = '2017-05_12T00:000';

    const url: string = buildUrl({
      adultCount,
      childCount,
      seniorCount,
      originGeohash,
      arrivalGeohash,
      outboundDate,
      polling: false,
    });

    const expectedUrl: string = `${
      ApiConfiguration.search
    }/${originGeohash}/${arrivalGeohash}/${outboundDate}?adult=${adultCount}&child=${childCount}&senior=${seniorCount}&lang=en-en&currency=USD`;

    expect(url).toBe(expectedUrl);
  });

  it('should return the builed url when polling', () => {
    const adultCount = 1;
    const childCount = 2;
    const seniorCount = 0;
    const arrivalGeohash = 'xyz999';
    const originGeohash = 'foo"geoH@5h"';
    const outboundDate = '2017-05_12T00:000';

    const url: string = buildUrl({
      adultCount,
      childCount,
      seniorCount,
      originGeohash,
      arrivalGeohash,
      outboundDate,
      polling: true,
    });

    const expectedUrl: string = `${
      ApiConfiguration.search
    }/${originGeohash}/${arrivalGeohash}/${outboundDate}/poll?adult=${adultCount}&child=${childCount}&senior=${seniorCount}&lang=en-en&currency=USD`;

    expect(url).toBe(expectedUrl);
  });
});

describe('format server input', () => {
  it('should mapSearchResultToTravelInformations', () => {
    const result: TravelInformations = mapSearchResultToTravelInformations(apiResult);
    expect(result).toEqual(travelInformations);
  });

  it('should mapApiResultToPropsedTrips', () => {
    const result: Array<ProposedTrip> = mapApiResultToProposedTrip(apiResult);

    expect(result).toEqual(proposedTrips);
  });
});
