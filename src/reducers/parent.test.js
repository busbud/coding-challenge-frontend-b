import { loop, Cmd } from 'redux-loop';
import { initializeApiSearch, pollApiSearch } from '../api';
import * as actions from '../actions';
import parent from './parent';

describe('parent reducer', () => {
  describe('initializeSearch is dispatched', () => {
    it('runs initializeApiSearch using params in state and handles result', () => {
      const state = { metadata: { searchParams: { fake: 'params' } } };

      expect(parent(state, actions.initializeSearch()))
        .toEqual(loop(
          state,
          Cmd.run(initializeApiSearch, {
            successActionCreator: actions.saveSearchResults,
            failActionCreator: actions.reportSearchError,
            args: [{ fake: 'params' }],
          }),
        ));
    });
  });

  describe('saveSearchResults is dispatched', () => {
    it('decides if polling is necessary', () => {
      const state = { metadata: { searchParams: { fake: 'params' } } };

      expect(parent(state, actions.saveSearchResults({ fake: 'response', complete: false })))
        .toEqual(loop(
          state,
          Cmd.action(actions.decideIfPollingIsNeeded(false)),
        ));
    });
  });

  describe('decideIfPollingIsNeeded is dispatched with falsey param', () => {
    it('runs pollApiSearch using cached query params and handles result', () => {
      const state = {
        metadata: { searchParams: { fake: 'params' }, departureCount: 3 },
      };
      expect(parent(state, actions.decideIfPollingIsNeeded(false)))
        .toEqual(loop(
          state,
          Cmd.run(pollApiSearch, {
            successActionCreator: actions.saveSearchResults,
            failActionCreator: actions.reportSearchError,
            args: [{
              ...state.metadata.searchParams,
              index: state.metadata.departureCount,
            }],
          }),
        ));
    });
  });
});
