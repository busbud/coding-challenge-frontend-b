import {
  SET_DEPARTURES_COMPLETE,
  DEPARTURES_DATA,
  SET_DEPARTURES_QUERY
} from './actions';

const initialState = {
  results : {},
  complete : false,
  date : ''
};

const departures = (state = initialState, action) => {
	switch (action.type) {
  	case DEPARTURES_DATA.RECEIVED:
      let results = state.results;
      if (!action.poll) {
        results = {};
      }
      for (let obj of action.data) {
        results[obj.id] = obj;
      }
      return {
        ...state,
        results
      };
    case DEPARTURES_DATA.CLEAR:
      return {
        ...state,
        results : initialState.results
      };
    case SET_DEPARTURES_COMPLETE:
      return Object.assign({}, state, {
        complete: action.complete
      });
    case SET_DEPARTURES_QUERY:
      return Object.assign({}, state, {
        date: action.date
      });
  	default:
  		return state;
	}
}

export default departures;
