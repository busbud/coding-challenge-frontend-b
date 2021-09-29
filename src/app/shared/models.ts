export type TripSearch = {
    origin: string;
    destination: string;
    outboundDate: string;
    adult: number;
    child: number;
    senior: number;
    currency: string;
    lang: string;
}

export type Departure = {
    arrivalTime: string;
    departureTime: string;
    originId: number;
    destinationId: number;
    duration: number;
    operatorId: string;
    price: number;
    currency: string;
    id: string;
}

export type Travel = {
    origin: string;
    destination: string;
    locations: { id: number, name: string }[];
    operators: { id: string, name: string, logoUrl: string }[];
    departures: Departure[];
    complete: boolean;
    error?: boolean;
    errorMessage?: string;
}

export type Option = {
    label: string;
    value: any;
}

export type TranslationData = {
    id: string;
    params: { [key: string]: any }
}