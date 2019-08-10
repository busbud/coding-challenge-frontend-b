import {
    SEARCH_DEPARTURES,
    SET_CITIES,
    SET_LOCATIONS,
    CLEAR_DEPARTURES,
    SET_LOADING,
    SET_LANGUAGE
 } from '../types'

 export default (state, action) => {
     switch(action.type) {
        case SEARCH_DEPARTURES:
            return {
                ...state,
                departures: action.payload,
                loading: false
            }
        case SET_CITIES:
            return {
                ...state,
                cities: action.payload,
            }
        case SET_LOCATIONS:
            return {
                ...state,
                locations: action.payload,
            }
        case CLEAR_DEPARTURES:
            return {
                ...state,
                departures: [],
                loading: false
            }
        case SET_LOADING:
             return {
                 ...state,
                 loading: false
             }
        case SET_LANGUAGE:
            return {
                ...state,
                english: !state.english
            }
         default: 
            return state;
     }
 }