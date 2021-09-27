import type {
    FetchDeparturesFailure,
    FetchDeparturesFailurePayload,
    FetchDeparturesRequest,
    FetchDeparturesRequestPayload,
    FetchDeparturesSuccess,
    FetchDeparturesSuccessPayload,
    FetchExtraDeparturesSuccess,
    FetchExtraDeparturesSuccessPayload,
} from '../types';
import { FETCH_DEPARTURE_TYPES } from './actionTypes';

export const fetchDepartures = (
    payload: FetchDeparturesRequestPayload,
): FetchDeparturesRequest => ({
    type: FETCH_DEPARTURE_TYPES.FETCH_DEPARTURES_REQUEST,
    payload,
});

export const fetchDeparturesSuccess = (
    payload: FetchDeparturesSuccessPayload,
): FetchDeparturesSuccess => ({
    type: FETCH_DEPARTURE_TYPES.FETCH_DEPARTURES_SUCCESS,
    payload,
});

export const fetchExtraDeparturesSuccess = (
    payload: FetchExtraDeparturesSuccessPayload,
): FetchExtraDeparturesSuccess => ({
    type: FETCH_DEPARTURE_TYPES.FETCH_EXTRA_DEPARTURES_SUCCESS,
    payload,
});

export const fetchDeparturesFailure = (
    payload: FetchDeparturesFailurePayload,
): FetchDeparturesFailure => ({
    type: FETCH_DEPARTURE_TYPES.FETCH_DEPARTURES_FAILURE,
    payload,
});
