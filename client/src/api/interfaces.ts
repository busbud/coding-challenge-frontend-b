export interface SearchCriteriaQuery {
    adult?: number;
    child?: number;
    senior?: number;
    lang?: string;
    currency?: string;
    index?: number;
}

export interface SearchCriteria extends SearchCriteriaQuery {
    origin: string;
    destination: string;
    outbound_date: string;
}

export interface Schedules {
    origin_city_id?: string,
    destination_city_id?: string,
    cities?: City [],
    locations?: Location [],
    operators?: Operator[],
    departures?: Departure[],
    complete?: boolean,
    ttl?: number,
    is_valid_route?: boolean
}

interface City {
    id: string,
    name: string,
}

interface Location {
    id: string,
    city_id: string,
    name: string,
    address: string [],
    type: string,
}

interface Operator {
    id: string,
    source_id: number,
    profile_id: number,
    name: string
}

interface Departure {
    id: string,
    source_id: number,
    checkout_type: string,
    operator_id: string,
}