/* Json data */
export interface IJsonDeparture {
  id: string;
  prices: IPrice;
  operator_id: string;
  departure_time: string;
  origin_location_id: string;
  destination_location_id: string;
  city_id: string;
  arrival_time: string;
}

export interface IJsonOperator {
  id: string;
  display_name: string;
  logo_url: string;
  name: string;
}

export interface IJsonLocations {
  id: string;
  name: string;
  address: ReadonlyArray<string>;
}

export interface IJsonTicket {
  origin_city_id: string;
  destination_city_id: string;
  cities: ReadonlyArray<ICity>;
  operators: ReadonlyArray<IJsonOperator>;
  departures: ReadonlyArray<IJsonDeparture>;
  locations: ReadonlyArray<IJsonLocations>;
  complete: boolean;
}

export interface IJsonFetchMoreTicket {
  operators: ReadonlyArray<IJsonOperator>;
  departures: ReadonlyArray<IJsonDeparture>;
  complete: boolean;
}

/* TS data */
export interface ILocation {
  id: string;
  name: string;
}

export interface ICity {
  id: string;
  name?: string;
}

export interface IOperator {
  id: string;
  displayName: string;
  logoUrl: string;
  name: string;
}

export interface IDeparture {
  id: string;
  arrivalTime: Date;
  departureTime: Date;
  operatorId: string;
  arrivalLocationId: string;
  departureLocationId: string;
  cityId: string;
  prices: IPrice;
}

export interface IDepartures {
  departures: ReadonlyArray<IDeparture>;
  operators: ReadonlyMap<string, IOperator>;
  locations: ReadonlyMap<string, ILocation>;
  isComplete: boolean;
}

interface IPrice {
  currency: string;
  total: number;
}

export interface ITrips extends IDepartures {
  originCity: ICity;
  arrivalCity: ICity;
}
