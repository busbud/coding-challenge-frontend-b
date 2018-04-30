import { toUpper } from 'ramda';
import { renameKeysDeep, renameKeysShallow } from './renameKeys';

describe('renameKeysDeep()', () => {
  it('renames all keys using provided function', () => {
    const testObject = {
      a: 'a', b: 'b', c: 'c', d: 'd',
    };
    const result = renameKeysDeep(toUpper, testObject);

    expect(result).toEqual({
      A: 'a', B: 'b', C: 'c', D: 'd',
    });
  });

  it('renames multiple layers', () => {
    const testObject = { a: { b: { c: 'c', d: 'd' } } };
    const result = renameKeysDeep(toUpper, testObject);

    expect(result).toEqual({ A: { B: { C: 'c', D: 'd' } } });
  });

  it('ignores objects nested in arrays', () => {
    const testObject = { a: { b: [{ c: 'c' }, { d: 'd' }] } };
    const result = renameKeysDeep(toUpper, testObject);

    expect(result).toEqual({ A: { B: [{ c: 'c' }, { d: 'd' }] } });
  });
});

describe('renameKeysShallow()', () => {
  it('renames all keys using provided function', () => {
    const testObject = {
      a: 'a', b: 'b', c: 'c', d: 'd',
    };
    const result = renameKeysShallow(toUpper, testObject);

    expect(result).toEqual({
      A: 'a', B: 'b', C: 'c', D: 'd',
    });
  });

  it('renames top layer only', () => {
    const testObject = { a: { b: { c: 'c', d: 'd' } } };
    const result = renameKeysShallow(toUpper, testObject);

    expect(result).toEqual({ A: { b: { c: 'c', d: 'd' } } });
  });
});
