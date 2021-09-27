import { combineReducers } from 'redux';
import departureReducer from 'src/departures/redux/reducers/departure';

import { Reducers } from './constants';

const rootReducer = combineReducers({
    [Reducers.DEPARTURE_REDUCER]: departureReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
