export interface SearchCriteriaQuery {
    adult?: number;
    child?: number;
    senior?: number;
    lang?: string;
    currency?: string;
    index?: number;
}

export interface SearchCriteria extends SearchCriteriaQuery {
    origin?: string;
    destination?: string;
    outbound_date?: string;
}

export interface Schedules {
    origin_city_id?: string;
    destination_city_id?: string;
    cities?: City[];
    locations?: Location[];
    operators?: Operator[];
    departures?: Departure[];
    complete?: boolean;
    ttl?: number;
    is_valid_route?: boolean;
}

interface City {
    id: string;
    name: string;
}

interface Location {
    id?: number;
    city_id?: string;
    name?: string;
    address?: string[];
    type?: string;
}

interface Operator {
    id: string;
    source_id: number;
    profile_id: number;
    name: string;
}

export interface Departure {
    id?: string;
    departure_time?: string;
    arrival_time?: string;
    source_id?: number;
    checkout_type?: string;
    operator_id?: string;
    prices?: {
        total: number;
        currency: string;
    };
    origin_location_id?: number;
    destination_location_id?: number;
}
