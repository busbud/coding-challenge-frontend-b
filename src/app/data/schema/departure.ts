import { DeparturePrices } from './departure-prices';
import { Normal } from './normal';

export interface Departure {
    id: string;
    source_id: number;
    checkout_type: string;
    operator_id: string;
    origin_location_id: number;
    destination_location_id: number;
    class: string;
    class_name: string;
    amenities: Normal;
    available_seats: number;
    prices: DeparturePrices;
    ticket_types: string[];
    departure_timezone: string;
    arrival_timezone: string;
    departure_time: string;
    arrival_time: string;
}