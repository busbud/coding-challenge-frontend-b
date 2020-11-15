// NOTE: Linting disabled due to external data requirements
/* eslint-disable @typescript-eslint/naming-convention */

import { TAmenity } from "./Amenity";

export type TDeparture = {
  id: string;
  source_id: number;
  checkout_type: string;
  operator_id: string;
  origin_location_id: number;
  destination_location_id: number;
  class: string;
  class_name: string;
  amenities: TAmenity;
  available_seats: number;
  prices: {
    total: number;
    breakdown: {
      base: number;
    };
    categories: Record<string, string>;
    discounted: false;
  };
  ticket_types: string[];
  departure_timezone: string;
  arrival_timezone: string;
  departure_time: string;
  arrival_time: string;
};
