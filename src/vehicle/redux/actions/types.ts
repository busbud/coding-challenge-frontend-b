import type { IVehicle } from "../../../types";
import { FETCH_VEHICLE_TYPES } from "./constants";

export interface VehiclesState {
  loading: boolean;
  vehicles: IVehicle[];
  error: string | null;
  pageIndex: number;
}

export interface VehicleSelectedState {
  selectedVehicleId: number;
}

export interface FetchVehiclesSuccessPayload {
  vehicles: IVehicle[];
}

export interface FetchVehiclesFailurePayload {
  error: string;
}

export interface VehiclePagePayload {
  pageIndex: number;
}
export interface VehicleSelectedPayload {
  id: number;
  selected: boolean;
}

export interface FetchVehiclesRequest {
  type: typeof FETCH_VEHICLE_TYPES.FETCH_VEHICLES_REQUEST;
}

export type FetchVehiclesSuccess = {
  type: typeof FETCH_VEHICLE_TYPES.FETCH_VEHICLES_SUCCESS;
  payload: FetchVehiclesSuccessPayload;
};

export type FetchVehiclesFailure = {
  type: typeof FETCH_VEHICLE_TYPES.FETCH_VEHICLES_FAILURE;
  payload: FetchVehiclesFailurePayload;
};

export type SetVehiclePage = {
  type: typeof FETCH_VEHICLE_TYPES.SET_VEHICLE_PAGE;
  payload: VehiclePagePayload;
};

export type SetVehicleSelected = {
  type: typeof FETCH_VEHICLE_TYPES.SET_VEHICLE_SELECTED;
  payload: VehicleSelectedPayload;
};

export type VehiclesActions =
  | FetchVehiclesRequest
  | FetchVehiclesSuccess
  | FetchVehiclesFailure
  | SetVehicleSelected
  | SetVehiclePage;
