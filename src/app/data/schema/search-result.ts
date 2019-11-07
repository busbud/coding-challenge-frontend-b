import { City } from './city';
import { Departure } from './departure';
import { Operator } from './operator';
import { Location } from './location';

export interface SearchResult {
    origin_city_id: string;
    destination_city_id: string;
    cities: City[];
    locations: Location[];
    operators: Operator[];
    departures: Departure[];
    complete: boolean;
    ttl: number;
    is_valid_route: boolean;
}





















