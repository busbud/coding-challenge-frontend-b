
export default function (state = [], action) {
    const FETCH_DATA = 'FETCH_DATA'
    const FETCH_FINISH = 'FETCH_FINISH'

    switch (action.type) {
        case FETCH_DATA:
            return {
                ...state,
                isFetching: true,
                payload: action.payload
            };
        case FETCH_FINISH:
            return {
                ...state,
                isFetching: false
            }; 

        default:
            return state;
    }
}