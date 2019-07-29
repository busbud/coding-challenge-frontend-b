import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { reducer as formReducer } from 'redux-form';
import { i18nReducer } from 'react-redux-i18n';
import departuresReducer from './modules/departures';

const rootReducer = combineReducers({
  i18n: i18nReducer,
  toastr: toastrReducer,
  form: formReducer,
  departures: departuresReducer,
});

export default rootReducer;
