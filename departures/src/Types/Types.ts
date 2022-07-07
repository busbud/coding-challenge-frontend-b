export interface TLocation {
    id: number,
    city: string,
    state: string,
    geoHash: string
}

export interface TDeparture {
    id: string,
    departureTime: string,
    arrivalTime: string,
    locationName_Origin: string,
    locationName_Destination: string,
    price: number,
    currency: string
}

export interface TMessage {
    details: string;
    type: string
}

export interface TQueryParams {
    adult: number,
    child: number,
    senior: number,
    lang: string,
    currency: string,
}

export interface DepartureCardProps {
    departure: TDeparture
}

export interface PassengerProps {
    title: string,
    visible: boolean,
    target: any,
    refPassengers: any
}

export interface LocationProps {
    title: string,
    visible: boolean,
    listItems: Array<TLocation>,
    onChange: (item: TLocation) => void,
    target: any,
    refLocation: any
}
