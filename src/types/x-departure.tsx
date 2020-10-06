import { Amenity } from "./index";

type DeparturePrice = {
  total: number;
  breakdown: {
    base: number;
  };
  categories: {};
  discounted: boolean;
  currency: string;
};

export type XDeparture = {
  id: string;
  source_id: number;
  checkout_type: string;
  operator_id: string;
  origin_location_id: number;
  destination_location_id: number;
  class: string;
  class_name: string;
  amenities: Amenity;
  available_seats: number;
  prices: DeparturePrice;
  ticket_types: string[]; // enum ? 'print'
  departure_timezone: string;
  arrival_timezone: string;
  departure_time: string;
  arrival_time: string;
};
