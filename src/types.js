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

export type SearchInfos = {|
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
