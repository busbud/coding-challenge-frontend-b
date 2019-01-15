export interface Departure {
    [k: string]: any;
}

export interface DepartureState {
    areAllDeparturesLoaded: boolean;
    destinationCity: any;
    departures: Departure[];
    departuresLength: number;
    departingCity: any;
}
