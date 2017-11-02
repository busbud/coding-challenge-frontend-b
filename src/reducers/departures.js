import { LOAD_DEPARTURE_DATA } from '../actions' 

const departureState = {   
    departures:[],
    isPolling:false
}

export default (state =  departureState, action) => { 
    switch(action.type){
        case LOAD_DEPARTURE_DATA:
            return {
                ...state,
                departures : action.payload.departures

            }
        default:
            return state
    }
}