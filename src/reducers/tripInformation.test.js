import * as actions from '../actions';
import tripInformation, { processSearchResults } from './tripInformation';

describe('saveSearchResults is dispatched', () => {
  it('returns processSearchResults(state, responseData)', () => {
    expect(tripInformation({}, actions.saveSearchResults({ fake: 'response' })))
      .toEqual(processSearchResults({}, { fake: 'response' }));
  });
});

describe('processSearchResults', () => {
  describe('it receives two objects, the second with new keys', () => {
    it('merges the two objects', () => {
      expect(processSearchResults({}, { new: 'key' }))
        .toEqual({ new: 'key' });
    });
  });

  describe('it receives two objects with duplicate keys holding distinct non-empty array values', () => {
    it('merges the objects, concatenating the duplicate key values', () => {
      expect(processSearchResults({ list: ['itema'] }, { list: ['itemb'] }))
        .toEqual({ list: ['itema', 'itemb'] });
    });
  });

  describe('it receives two objects with duplicate keys, the second holding empty array values', () => {
    it('merges the objects, returning the non-empty array values', () => {
      expect(processSearchResults({ list: ['itema'] }, { list: [] }))
        .toEqual({ list: ['itema'] });
    });
  });

  describe('it receives two objects, the second with undesired keys', () => {
    it('does not return the undesired keys in its result', () => {
      expect(processSearchResults({}, {
        complete: false,
        ttl: 600,
        is_valid_route: true,
        list: ['itema'],
      })).toEqual({ list: ['itema'] });
    });
  });
});
