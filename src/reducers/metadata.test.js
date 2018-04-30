import * as actions from '../actions';
import metadata from './metadata';

describe('initializeSearch is dispatched', () => {
  it('sets searchStatus keyval to "inProgress"', () => {
    expect(metadata(undefined, actions.initializeSearch()))
      .toEqual({ searchStatus: 'inProgress' });
  });
});

describe('decideIfPollingIsNeeded is dispatched with truthy val', () => {
  it('sets searchStatus keyval to "complete"', () => {
    expect(metadata(undefined, actions.decideIfPollingIsNeeded(true)))
      .toEqual({ searchStatus: 'complete' });
  });
});

describe('saveSearchResults is dispatched', () => {
  it('updates count of departures received from api', () => {
    const state = { searchParams: { fake: 'params' }, departureCount: 0 };
    const fakeResponse = { departures: [1, 2, 3] };

    expect(metadata(state, actions.saveSearchResults(fakeResponse)))
      .toEqual({ searchParams: { fake: 'params' }, departureCount: 3 });
  });
});

describe('reportSearchError is dispatched', () => {
  it('sets searchStatus keyval to "error"', () => {
    const fakeResponse = { response: { data: { error: { fake: 'error' } } } };

    expect(metadata(undefined, actions.reportSearchError(fakeResponse)))
      .toEqual({ searchStatus: 'error' });
  });
});
