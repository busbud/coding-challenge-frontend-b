export const INIT_DEPARTURE_REQUEST = 'INIT_DEPARTURE_REQUEST'
export const HANDLE_DEPARTURE_RESPONSE = 'HANDLE_DEPARTURE_RESPONSE'
export const END_DEPARTURE_REQUESTS = 'END_DEPARTURE_REQUESTS'

export const initDepartureRequest = () => {
    return (dispatch,getState) => {
        dispatch({
            type:INIT_DEPARTURE_REQUEST,
            payload: getState().searchInputs
        })
    } 
}

export const handleDepartureResponses = (response) => {
    return (dispatch) => {
        
        if(response.complete === true){
            dispatch({
                type:END_DEPARTURE_REQUESTS
            })
        }

        dispatch({
            type:HANDLE_DEPARTURE_RESPONSE,
            payload: response
        })
    } 
}
