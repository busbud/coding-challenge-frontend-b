export interface Departure {
    [k: string]: any;
}

export interface DepartureState {
    destinationCity: any;
    departures: Departure[];
    departingCity: any;
}
