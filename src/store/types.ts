import {Departure} from "./reducer";

export const SET_LANGUAGE = 'SET_LANGUAGE';
export const SET_DEPARTURES = 'SET_DEPARTURES';
export const SET_REQUESTED = 'SET_REQUESTED';
export const SET_REQUESTED_DATE = 'SET_REQUESTED_DATE';
export const SET_FILTER = 'SET_FILTER';

interface SetLanguageAction {
    type: typeof SET_LANGUAGE
    payload: string
}

interface SetDeparturesAction {
    type: typeof SET_DEPARTURES
    payload: Departure[]
}

interface SetRequestedAction {
    type: typeof SET_REQUESTED
    payload: boolean
}

interface SetRequestedDate {
    type: typeof SET_REQUESTED_DATE,
    payload: string
}

interface setFilter {
    type: typeof SET_FILTER,
    payload: number
}

export type ActionTypes = SetLanguageAction | SetDeparturesAction | SetRequestedAction | SetRequestedDate | setFilter
