import * as actions from '../actions';
import tripInformation, { processSearchResults } from './tripInformation';

describe('saveSearchResults is dispatched', () => {
  it('returns processSearchResults(state, responseData)', () => {
    expect(tripInformation({}, actions.saveSearchResults({ locations: [] })))
      .toEqual(processSearchResults({}, { locations: [] }));
  });
});

describe('processSearchResults', () => {
  describe('it receives two objects, the second with new keys', () => {
    it('merges the two objects', () => {
      expect(processSearchResults({}, { locations: [] }))
        .toEqual({ locations: [] });
    });
  });

  describe('it receives two objects with duplicate keys holding distinct non-empty array values', () => {
    it('merges the objects, concatenating the duplicate key values', () => {
      expect(processSearchResults(
        { locations: [{ item: 'a' }] },
        { locations: [{ item: 'b' }] },
      ))
        .toEqual({ locations: [{ item: 'a' }, { item: 'b' }] });
    });
  });

  describe('it receives two objects with duplicate keys, the second holding empty array values', () => {
    it('merges the objects, returning the non-empty array values', () => {
      expect(processSearchResults({ locations: [{ item: 'a' }] }, { locations: [] }))
        .toEqual({ locations: [{ item: 'a' }] });
    });
  });

  describe('it receives two objects, the second with undesired keys', () => {
    it('only returns the desired keys in its result', () => {
      expect(processSearchResults({}, {
        complete: false,
        ttl: 600,
        is_valid_route: true,
        locations: [{ item: 'a' }],
      })).toEqual({ locations: [{ item: 'a' }] });
    });
  });

  describe('an object contains array values that themselves contain objects with snake_cased keys', () => {
    it('recursively converts all keys to camelCase', () => {
      expect(processSearchResults({}, {
        locations: [{ an_item: { a_sub_item: 'a' } }],
      })).toEqual({ locations: [{ anItem: { aSubItem: 'a' } }] });
    });
  });
});
