import {ActionTypes, SET_DEPARTURES, SET_REQUESTED, SET_LANGUAGE, SET_REQUESTED_DATE, SET_FILTER} from "./types";
import {Departure} from "./reducer";

export function setLanguage(lang: string): ActionTypes {
    return {
        type: SET_LANGUAGE,
        payload: lang
    }
}

export function setDepartures(departures: Departure[]): ActionTypes {
    return {
        type: SET_DEPARTURES,
        payload: departures
    }
}

export function setRequested(requested: boolean): ActionTypes {
    return {
        type: SET_REQUESTED,
        payload: requested
    }
}

export function setRequestedDate(date: string): ActionTypes {
    return {
        type: SET_REQUESTED_DATE,
        payload: date
    }
}

export function setFilter(filter: number): ActionTypes {
    return {
        type: SET_FILTER,
        payload: filter
    }
}
