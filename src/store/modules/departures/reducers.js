import { LOADING, COMPLETE, DEPARTURES } from './actions';

// Reducers
const INITIAL_STATE = {
  isLoading: false,
  list: [],
  isComplete: false,
  filters: {
    origin: 'dr5reg',
    destination: 'f25dvk',
    outboundDate: '2019-08-02',
    adult: 1,
    child: 0,
    senior: 0,
    currency: 'CAD',
  },
};

export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case DEPARTURES:
      return { ...state, list: action.payload };
    case LOADING:
      return { ...state, isLoading: action.payload };
    case COMPLETE:
      return { ...state, isComplete: action.payload };
    default:
      return state;
  }
}
