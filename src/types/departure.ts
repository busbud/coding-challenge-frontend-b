export default interface IDeparture {
  id: string;
  source_id: number;
  checkout_type: string;
  operator_id: string;
  origin_location_id: number;
  destination_location_id: number;
  class: string;
  class_name: string;
  amenities: {
    display_name: string;
    wifi: boolean;
    toilet: boolean;
    ac: boolean;
    food: boolean;
    refreshment: boolean;
    power_outlets: boolean;
    tv: boolean;
    bus_attendant: boolean;
    leg_room: boolean;
  };
  available_seats: number;
  prices: {
    total: number;
    breakdown: {
      base: number;
    };
    categories: {};
    discounted: number;
  };
  ticket_types: Array<string>;
  departure_timezone: string;
  arrival_timezone: string;
  departure_time: string;
  arrival_time: string;
}
