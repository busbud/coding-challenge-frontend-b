import { 
    INIT_DEPARTURE_REQUEST,
    HANDLE_DEPARTURE_RESPONSE,
    END_DEPARTURE_REQUESTS,
    UPDATE_SEARCH_LANGUAGE
} from '../actions' 

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
        case INIT_DEPARTURE_REQUEST:
            return {
                ...state,
                isPolling : true
            }
        case HANDLE_DEPARTURE_RESPONSE:
            return {
                ...state,
                departures : sortDepartures(action.payload.departures)

            }
        case END_DEPARTURE_REQUESTS:
            return {
                ...state,
                isPolling : false
            }
        case UPDATE_SEARCH_LANGUAGE:
            return {
                ...state,
                departures: []
            }
        default:
            return state
    }
}