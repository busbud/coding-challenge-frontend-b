import { loop, Cmd } from 'redux-loop';
import { initializeApiSearch, pollApiSearch } from '../api';
import * as actions from '../actions';
import parent from './parent';

describe('initializeSearch is dispatched', () => {
  it('runs initializeApiSearch using payload and handles result', () => {
    expect(parent(undefined, actions.initializeSearch({ fake: 'params' })))
      .toEqual(loop(
        {},
        Cmd.run(initializeApiSearch, {
          successActionCreator: actions.saveSearchResults,
          failActionCreator: actions.reportSearchError,
          args: [{ fake: 'params' }],
        }),
      ));
  });
});

describe('saveSearchResults is dispatched', () => {
  it('checks if polling is necessary', () => {
    expect(parent(undefined, actions.saveSearchResults({ fake: 'response', complete: false })))
      .toEqual(loop(
        {},
        Cmd.action(actions.checkIfPollingIsNeeded(false)),
      ));
  });
});
