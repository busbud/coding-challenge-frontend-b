/**
 *  getNewData(): return a hydrated data object, depending on the polling situation
 **/
function getNewData(state, action) {
    let newData = {};
    let isPoll = action.queryParams.hasOwnProperty('index');

    //if this is the first request: replace all the datas
    if (!isPoll) {
        newData = action.json;
    }
    //if we're polling from an index: append the data to the existing data of the state
    else {
        newData = state.data;
        //append the derpartures
        if (newData.departures && action.json.departures) {
            action.json.departures.map(departure => newData.departures.push(departure));
        }
        //the locations must not be duplicated, so we're checking if it does not exist first
        if (newData.locations && action.json.locations) {
            action.json.locations.forEach((location) => {
                if (!newData.locations.find(existingLocation => existingLocation.id == location.id)) {
                    newData.locations.push(location);
                }
            });
        }
    }

    return newData;
}


/**
 *  
 **/

const api = (state = {
    isFetching: false,
    departures: {}
    }, action) => {

    switch (action.type) {
        case 'FETCH_API_REQUEST':
            return Object.assign({}, state, {
                isFetching: true,
                error: null
            });
        case 'FETCH_API_SUCCESS':
            return Object.assign({}, state, {
                isFetching: false,
                error: null,
                data: getNewData(state, action)
            });
        case 'FETCH_API_FAILURE':
            return Object.assign({}, state, {
                isFetching: false,
                error: action.error,
                data: {}
            });
        default:
            return state;
    }
};

export default api;