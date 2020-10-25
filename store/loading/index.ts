import actions from './actions';
import createReducers from '../createReducers';
import state, { LoadingState } from './state';

export const reducer = createReducers(actions);
export { state };
export type { LoadingState as type };
