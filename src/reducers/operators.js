import { HANDLE_DEPARTURE_RESPONSE } from '../actions'

const operatorState = {
    operators:[]
}

export default (state = operatorState, action) =>{
    switch(action.type){
        case HANDLE_DEPARTURE_RESPONSE:
            return {
                ...state,
                operators : action.payload.operators

            }
        default:
            return state
    }
}