import * as actions from '../actions';
import metadata from './metadata';

describe('saveSearchResults is dispatched', () => {
  it('updates count of departures received from api', () => {
    const state = { searchParams: { fake: 'params' }, departureCount: 0 };
    const fakeResponse = { departures: [1, 2, 3] };

    expect(metadata(state, actions.saveSearchResults(fakeResponse)))
      .toEqual({ searchParams: { fake: 'params' }, departureCount: 3 });
  });
});

describe('reportSearchError is dispatched', () => {
  it('sets searchError keyval to error object', () => {
    const fakeResponse = { response: { data: { error: { fake: 'error' } } } };
    expect(metadata(undefined, actions.reportSearchError(fakeResponse)))
      .toEqual({ searchError: { fake: 'error' } });
  });
});
