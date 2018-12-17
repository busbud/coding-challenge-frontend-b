// @flow

import get from 'lodash/fp/get';
import { ApiConfiguration } from '../../configuration';
import type { TravelInformations, ProposedTrip } from '../../types';

type BuildUrlParams = {|
  adultCount: number,
  childCount: number,
  seniorCount: number,
  originGeohash: string,
  arrivalGeohash: string,
  outboundDate: string,
  polling: ?boolean,
|};

export const buildUrl = (buildParams: BuildUrlParams): string => {
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

export const mapSearchResultToTravelInformations = (searchResult: any): TravelInformations => {
  const cities = get('cities', searchResult);
  const locations = get('locations', searchResult);
  const operators = get('operators', searchResult);

  const mapperdOperator = operators.map(operator => ({
    id: operator.id,
    logo_url: operator.logo_url,
    display_name: operator.display_name,
  }));

  const mappedCities = cities.map(city => ({
    id: city.id,
    name: city.name,
    full_name: city.full_name,
  }));

  const mappedLocations = locations.map(location => ({
    id: location.id,
    name: location.name,
    city_id: location.city_id,
    address: location.address,
  }));

  return {
    operators: mapperdOperator,
    cities: mappedCities,
    locations: mappedLocations,
  };
};

export const mapPartiaApiResultToProposedTrip = (oartialApiResult: any): ProposedTrip => ({});
