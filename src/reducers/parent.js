import { loop, Cmd } from 'redux-loop';
import { initializeApiSearch, pollApiSearch } from '../api';
import * as actions from '../actions';

const parent = (state = {}, { type, payload }) => {
  switch (type) {
    case 'INITIALIZE_SEARCH':
      return loop(
        state,
        Cmd.run(initializeApiSearch, {
          successActionCreator: actions.saveSearchResults,
          failActionCreator: actions.reportSearchError,
          args: [state.metadata.searchParams],
        }),
      );
    case 'POLL_SEARCH':
      return loop(
        state,
        Cmd.run(pollApiSearch, {
          successActionCreator: actions.saveSearchResults,
          failActionCreator: actions.reportSearchError,
          args: [{
            ...state.metadata.searchParams,
            index: state.metadata.departureCount,
          }],
        }),
      );
    case 'SAVE_SEARCH_RESULTS':
      return loop(
        state,
        Cmd.action(actions.decideIfPollingIsNeeded(payload.complete)),
      );
    default:
      return state;
  }
};

export default parent;
