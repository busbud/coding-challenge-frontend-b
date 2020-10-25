import actions from './actions';
import createReducers from '../createReducers';
import state from './state';

export const reducer = createReducers(actions);
export { state };
