import { AnyAction } from 'redux';
import {
    AllEffect,
    CallEffect,
    PutEffect,
    all,
    call,
    put,
    takeLatest,
} from 'redux-saga/effects';
import freeNowService from 'src/api/freeNowService';
import shareNowService from 'src/api/shareNowService';
import { IVehicle } from 'src/types';
import { State, VehicleType } from 'src/types/enums';

import { FETCH_VEHICLE_TYPES } from '../actions/constants';
import { fetchVehiclesFailure, fetchVehiclesSuccess } from '../actions/vehicle';

export interface ResponseGenerator {
    config?: never;
    data?: any;
    headers?: never;
    request?: never;
    status?: number;
    statusText?: string;
}

const createVehicles = (
    freeNowVehicles: any[],
    shareNowVehicles: any[],
): IVehicle[] => {
    const vehicles: IVehicle[] = [];
    freeNowVehicles.forEach((vehicle: any) => {
        vehicles.push({
            name: vehicle.type,
            id: vehicle.id,
            coordinate: vehicle.coordinate,
            state: vehicle.state,
            type: VehicleType.FREENOW,
        });
    });

    shareNowVehicles.forEach((vehicle: any) => {
        vehicles.push({
            name: vehicle.name,
            id: vehicle.id,
            coordinate: {
                longitude: vehicle.coordinates[0],
                latitude: vehicle.coordinates[1],
            },
            rate: {
                interior: vehicle.interior,
                exterior: vehicle.exterior,
            },
            fuel: vehicle.fuel,
            engine: vehicle.engineType,
            state: State.UNKNOWN,
            type: VehicleType.SHARENOW,
            address: vehicle.address,
        });
    });

    return vehicles.sort((a, b) => a.id - b.id);
};

function* fetchVehiclesSaga(): Generator<
    AllEffect<AnyAction> | PutEffect<AnyAction>,
    void,
    [ResponseGenerator, ResponseGenerator]
> {
    try {
        const [freeNowVehicles, shareNowVehicles] = yield all([
            call(freeNowService.getTaxis),
            call(shareNowService.getVehicles),
        ]);

        console.log(shareNowVehicles);
        console.log(freeNowVehicles);

        yield put(
            fetchVehiclesSuccess({
                vehicles: createVehicles(
                    freeNowVehicles?.data?.poiList,
                    shareNowVehicles?.data?.placemarks,
                ),
            }),
        );
    } catch (e) {
        yield put(
            fetchVehiclesFailure({
                error: e.message,
            }),
        );
    }
}

function* vehiclesSaga(): Generator<AllEffect<AnyAction>> {
    yield all([
        takeLatest(
            FETCH_VEHICLE_TYPES.FETCH_VEHICLES_REQUEST,
            fetchVehiclesSaga,
        ),
    ]);
}

export default vehiclesSaga;
