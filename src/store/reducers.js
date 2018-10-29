/***
 * @author Shiming Chen <chen@lemontv.me>
 */

import { combineReducers } from 'redux';
import localeReducer from './locale';
import schedulesReducer from './schedules';

export default combineReducers({
  schedules: schedulesReducer,
  locale: localeReducer
});
