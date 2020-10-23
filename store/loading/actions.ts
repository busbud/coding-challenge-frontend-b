import types from './action-types';
import { LoadingState } from './state';

export default {
  [types.OPEN_PAGE_LOADER](state: LoadingState): LoadingState {
    if (state.loading) return state;
    return { ...state, loading: true };
  },
  [types.CLOSE_PAGE_LOADER](state: LoadingState): LoadingState {
    if (!state.loading) return state;
    return { ...state, loading: false };
  },
};
