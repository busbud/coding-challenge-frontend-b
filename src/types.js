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
