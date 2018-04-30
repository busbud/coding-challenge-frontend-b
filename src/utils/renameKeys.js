import { type, reduce, assoc, curry, keys } from 'ramda';

const hasNonObjectValue = (object, key) => {
  return type(object[key]) !== 'Object';
};

export const renameKeysDeep = curry((keyRenamer, obj) => {
  return reduce((acc, key) => {
    if (hasNonObjectValue(obj, key)) {
      return assoc(keyRenamer(key), obj[key], acc);
    }
    return assoc(keyRenamer(key), renameKeysDeep(keyRenamer, obj[key]), acc);
  }, {}, keys(obj));
});


export const renameKeysShallow = curry((keyRenamer, obj) => {
  return reduce((acc, key) => {
    return assoc(keyRenamer(key), obj[key], acc);
  }, {}, keys(obj));
});

export default renameKeysDeep;
