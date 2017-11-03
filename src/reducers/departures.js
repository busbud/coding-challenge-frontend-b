import { HANDLE_DEPARTURE_RESPONSE } from '../actions' 

const departureState = {   
    departures:[],
    isPolling:false
}

const sortDepartures = (departures) => {
    return departures.sort( (departure1, departure2) => {
        const departure1Date = new Date(departure1.departure_time)
        const departure2Date = new Date(departure2.departure_time)
        return departure1Date - departure2Date
    })
}

export default (state =  departureState, action) => { 
    switch(action.type){
        case HANDLE_DEPARTURE_RESPONSE:
            return {
                ...state,
                departures : sortDepartures(action.payload.departures)

            }
        default:
            return state
    }
}