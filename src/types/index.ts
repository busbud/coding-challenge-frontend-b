export type ILocation = {
    id: number;
    arrivalTime: string;
    departureTime: string;
    location: string;
}

export interface IDeparture extends ILocation {
    key: string;
    price: number;
    stops: IStop[];
}

export interface IStop extends ILocation {
    key: string;
}