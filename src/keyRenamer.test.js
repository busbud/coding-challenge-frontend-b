import { toUpper } from 'ramda';
import renameKeysDeep from './keyRenamer';

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
