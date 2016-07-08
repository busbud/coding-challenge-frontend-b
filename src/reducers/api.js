/**
 *  formatData(): format the data so it's ready to display
 *  Doing this at this point lighten the sorting and filtering in the component.
 **/
 function formatData(data = {}, index, date) {

    let formattedData = Object.assign({}, data);

    if (formattedData.departures){

        //initialize sub-objects
        if (!formattedData.route) {
            formattedData.route = {
                date: date
            };
        }

        //Get the origin city
        let fromObject = formattedData.cities.find((city) => city.id === formattedData.origin_city_id);
        if (fromObject) {
            formattedData.route.origin = fromObject.full_name;
        }

        //Get the destination city
        let toObject = formattedData.cities.find((city) => city.id === formattedData.destination_city_id);
        if (toObject) {
            formattedData.route.destination = toObject.full_name;
        }

        formattedData.departures.map((departure, currentIndex) => {
            //do not reformat previously formatted data (when coming from poll)
            if (typeof index === 'undefined' || !departure.display || !departure.display.operator || !departure.display.departure_location ) {

                //Get all departure display infos
                departure.display = {
                    departure_time: departure.departure_time,
                    departure_location: formattedData.locations.find((location) => location.id === departure.origin_location_id),
                    arrival_time: departure.arrival_time,
                    arrival_location: formattedData.locations.find((location) => location.id === departure.destination_location_id),
                    class_name: departure.class_name,
                    operator: formattedData.operators.find((operator) => operator.id === departure.operator_id),
                    price: departure.prices.total / 100
                };
            }
            return departure;
        });
    }


    return formattedData;
 }


/**
 *  getNewData(): return a hydrated data object, depending on the polling situation
 **/
function getNewData(state, action) {

    let isPoll = action.queryParams.hasOwnProperty('index');

    //if this is the first request: replace all the datas
    if (!isPoll) {
        return formatData(action.json, undefined, action.params.date);
    }
    //if we're polling from an index: append the data to the existing data of the state
    else {
        let newData = state.data;
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
        //the operators must not be duplicated, so we're checking if it does not exist first
        if (newData.operators && action.json.operators) {
            action.json.operators.forEach((operator) => {
                if (!newData.operators.find(existingOperator => existingOperator.id == operator.id)) {
                    newData.operators.push(operator);
                }
            });
        }
        return formatData(newData, action.queryParams.index);
    }
}


/**
 *  
 **/

const api = (state = {
    isFetching: false,
    lang:'',
    currency:'',
    data: {}
    }, action) => {

    switch (action.type) {
        case 'FETCH_API_REQUEST':

            //reset data if we changed the queryParams
            let newData = {};
            if (action.queryParams.lang == state.lang || action.queryParams.currency == state.currency) {
                newData = state.data;
            }

            return Object.assign({}, state, {
                isFetching: true,
                lang: action.queryParams.lang,
                currency: action.queryParams.currency,
                error: null,
                data: newData
            });
        case 'FETCH_API_SUCCESS':
            return Object.assign({}, state, {
                isFetching: false,
                lang: action.queryParams.lang,
                currency: action.queryParams.currency,
                error: null,
                data: getNewData(state, action)
            });
        case 'FETCH_API_FAILURE':
            return Object.assign({}, state, {
                isFetching: false,
                lang: action.queryParams.lang,
                currency: action.queryParams.currency,
                error: action.error,
                data: {}
            });
        default:
            return state;
    }
};

export default api;