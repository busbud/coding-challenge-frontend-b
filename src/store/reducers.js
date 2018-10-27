/***
 * @author Shiming Chen <chen@lemontv.me>
 */

import { combineReducers } from 'redux';
import schedulesReducer from './schedules';

export default combineReducers({
  schedules: schedulesReducer
});
