import type {
    FetchVehiclesFailure,
    FetchVehiclesFailurePayload,
    FetchVehiclesRequest,
    FetchVehiclesSuccess,
    FetchVehiclesSuccessPayload,
    SetVehiclePage,
    SetVehicleSelected,
    VehiclePagePayload,
    VehicleSelectedPayload,
} from './types';
import {FETCH_VEHICLE_TYPES} from './constants';

export const fetchVehicles = (): FetchVehiclesRequest => ({
    type: FETCH_VEHICLE_TYPES.FETCH_VEHICLES_REQUEST,
});

export const fetchVehiclesSuccess = (
    payload: FetchVehiclesSuccessPayload,
): FetchVehiclesSuccess => ({
    type: FETCH_VEHICLE_TYPES.FETCH_VEHICLES_SUCCESS,
    payload,
});

export const fetchVehiclesFailure = (
    payload: FetchVehiclesFailurePayload,
): FetchVehiclesFailure => ({
    type: FETCH_VEHICLE_TYPES.FETCH_VEHICLES_FAILURE,
    payload,
});

export const setVehiclePage = (
    payload: VehiclePagePayload,
): SetVehiclePage => ({
    type: FETCH_VEHICLE_TYPES.SET_VEHICLE_PAGE,
    payload,
});

export const setVehicleSelected = (
    payload: VehicleSelectedPayload,
): SetVehicleSelected => ({
    type: FETCH_VEHICLE_TYPES.SET_VEHICLE_SELECTED,
    payload,
});