/* Json data */
export interface IJsonDeparture {
  id: string;
  prices: IPrice;
  operator_id: string;
  departure_time: string;
  arrival_time: string;
}

export interface IJsonOperator {
  id: string;
  display_name: string;
  logo_url: string;
  name: string;
}

export interface IJsonTicket {
  origin_city_id: string;
  destination_city_id: string;
  cities: ReadonlyArray<ICity>;
  operators: ReadonlyArray<IJsonOperator>;
  departures: ReadonlyArray<IJsonDeparture>;
  complete: boolean;
}

export interface IJsonFetchMoreTicket {
  operators: ReadonlyArray<IJsonOperator>;
  departures: ReadonlyArray<IJsonDeparture>;
  complete: boolean;
}

/* TS data */
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
  operator?: IOperator;
  prices: IPrice;
}

interface IPrice {
  currency: string;
  total: number;
}

export interface IDeparturesResults {
  departures: ReadonlyArray<IDeparture>;
  complete: boolean;
}

export interface ITicketSearchResults extends IDeparturesResults {
  originCity: ICity;
  destinationCity: ICity;
}
