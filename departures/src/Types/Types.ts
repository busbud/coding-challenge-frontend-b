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
    refPassengers: any,
    queryParams: TQueryParams
}

export interface LocationProps {
    title: string,
    visible: boolean,
    listItems: Array<TLocation>,
    onChange: (item: TLocation) => void,
    target: any,
    refLocation: any
}

export interface SelectionMenuProps {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setMessage: React.Dispatch<React.SetStateAction<TMessage | null>>,
    setDepartures: React.Dispatch<React.SetStateAction<TDeparture[]>>
}

export interface PassengerCardProps {
    title: string,
    type: string,
    value: number,
    hasSeparator: boolean
}

export interface PassengerCardButtonProps {
    icon: any,
    type: string,
    action: string,
    active: boolean
}