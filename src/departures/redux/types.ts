import type { IDeparture } from "../../types";
import { FETCH_DEPARTURE_TYPES } from "./actions/types";

export interface DeparturesState {
  loading: boolean;
  departures: IDeparture[];
  error: string | null;
}

export interface FetchDeparturesSuccessPayload {
  departures: IDeparture[];
}

export interface FetchExtraDeparturesSuccessPayload {
  departures: IDeparture[];
}

export interface FetchDeparturesRequestPayload {
  origin: string;
  destination: string;
  date: string;
  passengerCount: number;
}

export interface FetchDeparturesFailurePayload {
  error: string;
}

export interface FetchDeparturesRequest {
  type: typeof FETCH_DEPARTURE_TYPES.FETCH_DEPARTURES_REQUEST;
  payload: FetchDeparturesRequestPayload;
}

export type FetchDeparturesSuccess = {
  type: typeof FETCH_DEPARTURE_TYPES.FETCH_DEPARTURES_SUCCESS;
  payload: FetchDeparturesSuccessPayload;
};

export type FetchExtraDeparturesSuccess = {
  type: typeof FETCH_DEPARTURE_TYPES.FETCH_EXTRA_DEPARTURES_SUCCESS;
  payload: FetchExtraDeparturesSuccessPayload;
};

export type FetchDeparturesFailure = {
  type: typeof FETCH_DEPARTURE_TYPES.FETCH_DEPARTURES_FAILURE;
  payload: FetchDeparturesFailurePayload;
};

export type DeparturesActions =
  | FetchDeparturesRequest
  | FetchDeparturesSuccess
  | FetchDeparturesFailure
  | FetchExtraDeparturesSuccess;
