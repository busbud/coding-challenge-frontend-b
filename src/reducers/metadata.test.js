import * as actions from '../actions';
import metadata from './metadata';

describe('initializeSearch is called', () => {
  it('caches searchParams', () => {
    expect(metadata(undefined, actions.initializeSearch({ fake: 'params' })))
      .toEqual({ departureCount: 0, searchParams: { fake: 'params' } });
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
