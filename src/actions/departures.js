export const INIT_DEPARTURE_DATA = 'INIT_DEPARTURE_DATA'
export const LOAD_DEPARTURE_DATA = 'LOAD_DEPARTURE_DATA'
export const LOAD_DEPARTURE_COMPLETED = 'LOAD_DEPARTURE_COMPLETED'

export const getDepartures = (originHash,destinationHash,outboundDate) => {
    console.log('Init Departure')
    return (dispatch) => {
        dispatch({
            type:INIT_DEPARTURE_DATA,
            payload: {
                originHash,
                destinationHash,
                outboundDate
            }
        })
    } 
}

export const updateDepartures = (response) => {
    return (dispatch) => {
        
        if(response.complete){
            dispatch({
                type:LOAD_DEPARTURE_COMPLETED
            })
           
        }

        dispatch({
            type:LOAD_DEPARTURE_DATA,
            payload: response
        })
    } 
}