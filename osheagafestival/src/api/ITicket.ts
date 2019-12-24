/* Json data */
interface IJsonDeparture {
  id: string;
  prices: IPrice;
  operator_id: string;
  departure_time: string;
  arrival_time: string;
}

interface IJsonOperator {
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
  search_request_ids: ReadonlyArray<string>;
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

export interface ITicketSearchResults {
  originCity: ICity;
  destinationCity: ICity;
  departures: ReadonlyArray<IDeparture>;
  searchRequestIds: ReadonlyArray<string>;
  complete: boolean;
}
