import { Currency } from "./Currency";
import { Location } from "./Location";

export class XDeparture {
  id: string;
  source_id: number;
  checkout_type: string;
  operator_id: string;
  origin_location_id: number;
  destination_location_id: number;
  class_name: string;
  prices: any;
  ticket_types: string[];
  departure_timezone: string;
  arrival_timezone: string;
  departure_time: string;
  arrival_time: string;

  originLocation!: Location;
  destinationLocation!: Location;

  constructor(
    id: string,
    source_id: number,
    checkout_type: string,
    operator_id: string,
    origin_location_id: number,
    destination_location_id: number,
    class_name: string,
    prices: any,
    ticket_types: string[],
    departure_timezone: string,
    arrival_timezone: string,
    departure_time: string,
    arrival_time: string
  ) {
    this.id = id;
    this.source_id = source_id;
    this.checkout_type = checkout_type;
    this.operator_id = operator_id;
    this.origin_location_id = origin_location_id;
    this.destination_location_id = destination_location_id;
    this.class_name = class_name;
    this.prices = prices;
    this.ticket_types = ticket_types;
    this.departure_timezone = departure_timezone;
    this.arrival_timezone = arrival_timezone;
    this.departure_time = departure_time;
    this.arrival_time = arrival_time;
  }
}
