export type ILocation = {
    id: number;
    arrivalTime: string;
    departureTime: string;
    location: string;
};

export interface IDeparture extends ILocation {
    key: string;
    price: number;
    stops: IStop[];
}

export interface IStop extends ILocation {
    key: string;
}

export type TableColumn = {
    title: string;
    dataIndex: string;
    key: string;
    sorter: (a: number | string, b: number | string) => number;
};

export interface ResponseGenerator {
    config?: never;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any;
    headers?: never;
    request?: never;
    status?: number;
    statusText?: string;
};

export type DepartureRequestParameters = {
    origin: string,
    destination : string,
    date: string,
    passengerCount: number;
    poll?: boolean,
    departureCount?: number;
}


