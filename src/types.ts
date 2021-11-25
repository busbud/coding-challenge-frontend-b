export interface City {
  name: string;
  geohash: string;
}

export interface Search {
  origin: string;
  destination: string;
  date: string;
  passengers: number;
}

export interface DeparturesResponse {
  departures: {
    departure_time: string;
    departure_timezone: string;
    arrival_time: string;
    arrival_timezone: string;
    prices: {
      total: number;
    };
  }[];
}
