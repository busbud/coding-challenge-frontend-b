/* eslint-disable @typescript-eslint/naming-convention */
export interface IBaseData {
  departures: Array<{
    amenities: Record<string, string | boolean>;
    arrival_time: string;
    arrival_timezone: string;
    available_seats: number;
    busbud_departure_id: string;
    cache_source: string;
    class: string;
    class_name: string;
    complete: boolean;
    departure_time: string;
    departure_timezone: string;
    departure_type: string;
    destination_location_id: number;
    duration: number;
    id: string;
    links: {
      deeplink: string;
    };
    operator_id: string;
    origin_location_id: number;
    prices: {
      currency: string;
      total: number;
      breakdown: {
        base: number;
        discount: number;
        fees: number;
        taxes: number;
      };
    };
    terms: Record<string, string>;
    trip_stops: Array<{
      name: string;
    }>;
    vehicle_type: string;
  }>;
  operators: Array<{
    default_vehicle_type: string;
    display_name: string;
    display_url: string;
    id: string;
    logo_url: string;
    name: string;
    url: string;
  }>;
}

export interface ITicket {
  departureTime: number;
  departureStation: string;
  arrivalTime: number;
  arrivalStation: string;
  duration: number;
  logo: string;
  price: number;
  priceBreakdown: {
    base: number;
    discount: number;
    fees: number;
    taxes: number;
  };
  id: string;
  link: string;
  currency: string;
  availableSeats: number;
}

export const processBusBudData = (baseData: IBaseData): Array<ITicket> =>
  baseData.departures.map((departure) => ({
    availableSeats: departure.available_seats,
    departureTime: new Date(departure.departure_time).getTime(),
    departureStation: departure.trip_stops[0].name,
    arrivalTime: new Date(departure.arrival_time).getTime(),
    arrivalStation: departure.trip_stops[departure.trip_stops.length - 1].name,
    duration: departure.duration,
    price: departure.prices.total,
    priceBreakdown: {
      base: departure.prices.breakdown.base,
      discount: departure.prices.breakdown.discount,
      fees: departure.prices.breakdown.fees,
      taxes: departure.prices.breakdown.taxes,
    },
    currency: departure.prices.currency,
    logo:
      baseData.operators.find(
        (operator) => operator.id === departure.operator_id,
      )?.logo_url || '',
    id: departure.id,
    link: departure.links.deeplink,
  }));
