const initialState = {
  results : {}
};

const cities = (state = initialState, action) => {
	switch (action.type) {
  	case 'GET_CITIES_DATA_RECEIVED':
      for (let obj of action.data) {
        state.results[obj.id] = obj;
      }
      return state;
  	default:
  		return state;
	}
}

export default cities;
