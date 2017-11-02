import { LOAD_DEPARTURE_DATA } from '../actions'

const operatorState = {
    operators:[]
}

export default (state = operatorState, action) =>{
    switch(action.type){
        case LOAD_DEPARTURE_DATA:
            return {
                ...state,
                operators : action.payload.operators

            }
        default:
            return state
    }
}