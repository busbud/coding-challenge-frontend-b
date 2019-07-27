import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { reducer as formReducer } from 'redux-form';
import departuresReducer from './modules/departures';

const rootReducer = combineReducers({
  toastr: toastrReducer,
  form: formReducer,
  departures: departuresReducer,
});

export default rootReducer;
