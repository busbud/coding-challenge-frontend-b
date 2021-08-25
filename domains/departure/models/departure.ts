import { CityResponse } from './city';
import { Location, LocationResponse } from './location';
import { Operator, OperatorResponse } from './operator';

type AmenityClassResponse = {
  display_name: string
  wifi: boolean
  toilet: boolean
  ac: boolean
  refreshment: boolean
  food: boolean
  power_outlets: boolean
  tv: boolean
  bus_attendant: boolean
  leg_room: boolean
}

export type DepartureResponse = {
  id: string
  source_id: number
  checkout_type: string
  operator_id: string
  origin_location_id: number
  destination_location_id: number
  class: string
  class_name: string
  amenities: AmenityClassResponse
  available_seats: number
  prices: {
    total: number
    breakdown: {
      base: number
    },
    categories: object
    discounted: boolean
    currency: string
  },
  links: {
    deeplink: string
  },
  ticket_types: string[]
  departure_timezone: string
  arrival_timezone: string
  departure_time: string
  arrival_time: string
}

export type DepartureItem = {
  id: string,
  departureTime: string,
  arrivalTime: string,
  price: string,
  originLocation: Location,
  destinationLocation: Location,
  operator: Operator,
}

export class Departure {
  static fromApi(
    rawDeparture: DepartureResponse,
    rawCities: CityResponse[],
    rawLocations: LocationResponse[],
    rawOperators: OperatorResponse[],
  ) {
    const rawOriginLocation = rawLocations
      .find((location) => location.id === rawDeparture.origin_location_id);

    if (rawOriginLocation === undefined) {
      throw Error(`Could not find a origin location ${rawDeparture.origin_location_id} in departure ${rawDeparture.id}`);
    }

    const rawDestinationLocation = rawLocations
      .find((location) => location.id === rawDeparture.destination_location_id);

    if (rawDestinationLocation === undefined) {
      throw Error(`Could not find a destination location ${rawDeparture.destination_location_id} in departure ${rawDeparture.id}`);
    }

    const rawOperator = rawOperators
      .find((operator) => operator.id === rawDeparture.operator_id);

    if (rawOperator === undefined) {
      throw Error(`Could not find a operator ${rawDeparture.operator_id} in departure ${rawDeparture.id}`);
    }

    return new Departure(
      rawDeparture.id,
      rawDeparture.departure_time,
      rawDeparture.arrival_time,
      rawDeparture.prices.breakdown.base,
      rawDeparture.prices.currency,
      Location.fromApi(rawOriginLocation, rawCities),
      Location.fromApi(rawDestinationLocation, rawCities),
      Operator.fromApi(rawOperator),
    );
  }

  constructor(
    public id: string,
    public departureTime: string,
    public arrivalTime: string,
    public price: number,
    public priceCurrency: string,
    public originLocation: Location,
    public destinationLocation: Location,
    public operator: Operator,
  ) {
    this.id = id;
    this.departureTime = departureTime;
    this.arrivalTime = arrivalTime;
    this.price = price;
    this.priceCurrency = priceCurrency;
    this.originLocation = originLocation;
    this.destinationLocation = destinationLocation;
    this.operator = operator;
  }

  getDepartureItem(locale: string): DepartureItem {
    return {
      id: this.id,
      departureTime: Intl.DateTimeFormat(locale, {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      }).format(new Date(this.departureTime)),
      arrivalTime: Intl.DateTimeFormat(locale, {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      }).format(new Date(this.arrivalTime)),
      price: Intl.NumberFormat(locale, {
        style: 'currency',
        currency: this.priceCurrency,
      }).format(this.price / 100),
      originLocation: this.originLocation,
      destinationLocation: this.destinationLocation,
      operator: this.operator,
    };
  }
}
