import { inc, toUpper } from 'ramda';
import { findById, findAndGetProps, renameKeys, transformValues, sortByTimes } from './shapeData';

describe('findById', () => {
  it('searches for and returns an object by its id prop', () => {
    expect(findById(99, [{ a: 1, id: 99 }]))
      .toEqual({ a: 1, id: 99 });
  });

  it('only returns first result', () => {
    expect(findById(99, [{ a: 1, id: 99 }, { b: 2, id: 99 }]))
      .toEqual({ a: 1, id: 99 });
  });

  it('returns undefined if it finds nothing', () => {
    expect(findById(98, [{ a: 1, id: 99 }, { b: 2, id: 99 }]))
      .toEqual(undefined);
  });
});

describe('findAndGetProps', () => {
  it('searches for an object by id, then extracts the requested array of props', () => {
    expect(findAndGetProps(['a'], [{ a: 1, id: 99 }], 99))
      .toEqual([1]);
  });

  it('returns a flattened array', () => {
    expect(findAndGetProps(['a', 'b'], [{ a: 1, b: [2, [3]], id: 99 }], 99))
      .toEqual([1, 2, 3]);
  });

  it('returns array even if first arg is string', () => {
    expect(findAndGetProps('a', [{ a: 1, id: 99 }], 99))
      .toEqual([1]);
  });
});

describe('renameKeys', () => {
  it('renames all keys with a corresponding value', () => {
    expect(renameKeys({ a: 'c', b: 'd' }, { a: 1, b: 2 }))
      .toEqual({ c: 1, d: 2 });
  });

  it('does not run recursively', () => {
    expect(renameKeys({ a: 'c', b: 'd' }, { a: { b: 2 } }))
      .toEqual({ c: { b: 2 } });
  });

  it('returns same name if no entry exists for key', () => {
    expect(renameKeys({ e: 'b' }, { a: 1, b: 2 }))
      .toEqual({ a: 1, b: 2 });
  });

  it('stores obj value processed last if there are duplicates', () => {
    expect(renameKeys({ a: 'b' }, { a: 1, b: 2 })).toEqual({ b: 2 });
    expect(renameKeys({ a: 'b', c: 'b' }, { a: 1, b: 2, c: 3 }))
      .toEqual({ b: 3 });
  });
});

describe('transformValues', () => {
  it('transforms all values using function corresponding to their key', () => {
    expect(transformValues({ a: inc, b: toUpper }, { a: 1, b: 'x' }))
      .toEqual({ a: 2, b: 'X' });
  });

  it('does not run recursively', () => {
    expect(transformValues({ b: toUpper }, { a: { b: 'x' } }))
      .toEqual({ a: { b: 'x' } });
  });

  it('returns same val if no entry exists for key', () => {
    expect(transformValues({ c: inc }, { a: 1 }))
      .toEqual({ a: 1 });
  });
});

describe('sortByTimes', () => {
  it('sorts by departureTime prop', () => {
    expect(sortByTimes([
      { departureTime: '2018-04-27T18:55:00' },
      { departureTime: '2018-04-29T18:55:00' },
      { departureTime: '2018-04-26T14:55:00' },
    ])).toEqual([
      { departureTime: '2018-04-26T14:55:00' },
      { departureTime: '2018-04-27T18:55:00' },
      { departureTime: '2018-04-29T18:55:00' },
    ]);
  });

  it('sorts by arrivalTime prop in a tie-break', () => {
    expect(sortByTimes([
      { departureTime: '2018-04-27T18:55:00', arrivalTime: '2018-04-28T12:55:00' },
      { departureTime: '2018-04-27T18:55:00', arrivalTime: '2018-04-28T10:00:00' },
      { departureTime: '2018-04-27T19:57:00', arrivalTime: '2018-04-28T09:00:00' },
    ])).toEqual([
      { departureTime: '2018-04-27T18:55:00', arrivalTime: '2018-04-28T10:00:00' },
      { departureTime: '2018-04-27T18:55:00', arrivalTime: '2018-04-28T12:55:00' },
      { departureTime: '2018-04-27T19:57:00', arrivalTime: '2018-04-28T09:00:00' },
    ]);
  });
});
