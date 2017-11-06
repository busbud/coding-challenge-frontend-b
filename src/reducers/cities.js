import { HANDLE_DEPARTURE_RESPONSE } from '../actions'

const cityState = {
    origin:null,
    destination:null,
    locations:[]
}

const getOriginCity = (payload) => {
   
    return getCityByType('origin',payload)
}

const getDestinationCity = (payload) => {
    
    return getCityByType('destination',payload)
}

const getCityByType = (type,payload) => {
    

    let id = payload.origin_city_id

    if(type === 'destination'){
        id = payload.destination_city_id
    }

    return payload.cities.filter(city => city.id === id)
}

export default (state = cityState, action) =>{
   
    switch(action.type){
        case HANDLE_DEPARTURE_RESPONSE:
            return {
                ...state,
                origin : getOriginCity(action.payload),
                destination : getDestinationCity(action.payload),
                locations : action.payload.locations
            }
        default:
            return state
    }
}