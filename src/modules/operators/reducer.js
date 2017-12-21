const initialState = {
  results : {}
};

const operators = (state = initialState, action) => {
	switch (action.type) {
  	case 'GET_OPERATORS_DATA_RECEIVED':
      for (let obj of action.data) {
        state.results[obj.id] = obj;
      }
      return state;
  	default:
  		return state;
	}
}

export default operators;
