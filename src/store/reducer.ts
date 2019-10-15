import {ActionTypes, SET_DEPARTURES, SET_FILTER, SET_LANGUAGE, SET_REQUESTED, SET_REQUESTED_DATE} from "./types";

export interface Departure {
    id: string,
    arrival_city: string,
    departure_city: string,
    departure_time: string,
    arrival_time: string,
    duration: number,
    arrival_location: string,
    departure_location: string
    operator_logo: string,
    price: number

}

export interface State {
    loading: boolean,
    requested: boolean,
    language: string,
    departures: Departure[],
    requested_date: string,
    filter: number
}

const initState = {
    loading: false,
    requested: false,
    language: 'en',
    departures: [],
    requested_date: '',
    filter: 1
};


// REDUCERS
export const reducer = (state: State = initState, action: ActionTypes) => {
    switch (action.type) {
        case SET_LANGUAGE:
            return {...state, language: action.payload};
        case SET_DEPARTURES:
            return {...state, departures: action.payload};
        case SET_REQUESTED:
            return {...state, requested: action.payload};
        case SET_REQUESTED_DATE:
            return {...state, requested_date: action.payload};
        case SET_FILTER:
            return {...state, filter: action.payload};
        default:
            return state
    }
};


