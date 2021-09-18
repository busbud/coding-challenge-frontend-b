export interface Departure {
  arrivalLocationName: string;
  arrivalEpoch: number;
  departureLocationName: string;
  departureEpoch: number;
  price: { currency: string; amount: number };
}
