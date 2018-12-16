// @flow

import get from 'lodash/fp/get';
import { ApiConfiguration } from '../../configuration';

type buildUrlParams = {|
  adultCount: number,
  childCount: number,
  seniorCount: number,
  originGeohash: string,
  arrivalGeohash: string,
  outboundDate: string,
  polling: ?boolean,
|};

export const buildUrl = (buildParams: buildUrlParams): string => {
  const {
    adultCount,
    childCount,
    seniorCount,
    originGeohash,
    arrivalGeohash,
    outboundDate,
    polling,
  } = buildParams;
  const url = `${
    ApiConfiguration.search
  }/${originGeohash}/${arrivalGeohash}/${outboundDate}:poll?adult=${adultCount}&child=${childCount}&senior=${seniorCount}&lang=en-en&currency=USD`;
  if (polling) {
    return url.replace(':poll', '/poll');
  }

  return url.replace(':poll', '');
};
