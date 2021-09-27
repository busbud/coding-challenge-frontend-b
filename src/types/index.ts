import {RateType, State, VehicleType} from './enums';

export type ICoordinate = {
    latitude: number;
    longitude: number;
};

export type IRate = {
    interior: RateType;
    exterior: RateType;
};

export type IVehicle = {
    id: number;
    type: VehicleType;
    coordinate: ICoordinate;
    state: State;
    name: string;
    rate?: IRate;
    engine?: string;
    fuel?: number;
    address?: string;
};
