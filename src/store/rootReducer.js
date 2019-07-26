import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  toastr: toastrReducer,
  form: formReducer,
});

export default rootReducer;
