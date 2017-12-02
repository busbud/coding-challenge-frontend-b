const defaultState = {
  origin_city_id: null,
  destination_city_id: null,
  cities: [],
  locations: [],
  operators: [],
  departures: [],
  complete: false,
}

const apiData = (state = defaultState, action) => {
  switch (action.type) {
    case 'GET_DEPARTURES_RECEIVED':
      return {
        origin_city_id: action.data.origin_city_id,
        destination_city_id: action.data.destination_city_id,
        cities: state.cities.concat(action.data.cities),
        locations: state.locations.concat(action.data.locations),
        operators: state.operators.concat(action.data.operators),
        departures: state.departures.concat(action.data.departures),
        complete: action.data.complete,
      }
    default:
      return state
  }
}

export default apiData