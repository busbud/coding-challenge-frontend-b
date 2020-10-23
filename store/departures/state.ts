type TripStop = {
  name: string;
};

type Amenities = {
  ac: boolean;
  average_seat: boolean;
  bus_attendant: boolean;
  carpool: boolean;
  display_name: string;
  food: boolean;
  full_recline_seat: boolean;
  hot_meal: boolean;
  leg_room: boolean;
  power_outlets: boolean;
  refreshment: boolean;
  small_seat: boolean;
  toilet: boolean;
  tv: boolean;
  wifi: boolean;
  xl_seat: boolean;
};

export type Departure = {
  amenities: Amenities;
  arrival_time: string;
  arrival_timezone: string;
  available_seats: number;
  busbud_departure_id: string;
  cache_source: string;
  class: string;
  class_name: string;
  complete: boolean;
  data_source: string;
  departure_time: string;
  departure_timezone: string;
  departure_type: string;
  destination_location_id: number;
  duration: number;
  fetched_at: string;
  has_search_details: boolean;
  has_transfers: boolean;
  id: string;
  num_transfers: number;
  operator_id: string;
  origin_location_id: number;
  passenger_questions: [];
  prices: {
    currency: string;
    total: number;
  };
  search_request_id: string;
  sellable: boolean;
  trip_stops: TripStop[];
};

export type DepartureState = {
  departures: Departure[];
};

export default {
  departures: [],
} as DepartureState;
