// @flow
export type ProposedTrip = {|
  arrivalTime: string,
  departureTime: string,
  totalPrice: string,
  departureLocation: string,
  travellersCount: number,
  operator: {
    name: string,
    logoUrl: string,
  },
|};

export type LocationSuggestion = {|
  label: string,
  value: string,
  geohash: string,
|};

export type SearchFormParameters = {|
  travellers: {|
    child: number,
    adult: number,
    senior: number,
  |},
  locations: {
    arrival: ?LocationSuggestion,
    departure: ?LocationSuggestion,
  },
  departureDate: ?string,
|};

export type SearchInformations = {|
  adultCount: number,
  childCount: number,
  seniorCount: number,
  originGeohash: string,
  arrivalGeohash: string,
  outboundDate: string,
|};

// @flow

type City = {
  id: string,
  name: string,
  full_name: string,
};

type Location = {
  id: number,
  city_id: string,
  name: string,
  address: Array<string>,
};

type Operator = {
  id: string,
  logo_url: string,
  display_name: string,
};

type Departure = {
  id: string,
  origin_location_id: string,
  destination_location_id: string,
  operator_id: string,
  prices: {
    total: string,
  },
  departure_time: string,
  arrivalTime: string,
};

export type TravelInformations = {|
  cities: Array<City>,
  locations: Array<Location>,
  operators: Array<Operator>,
|};

export type PartialTravelInformations = {|
  operators: Array<Operator>,
  departures: Array<Departure>,
  complete: boolean,
  ttl: number,
|};
