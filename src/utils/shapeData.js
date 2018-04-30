import { curry, mapObjIndexed, propEq, props, find, flatten } from 'ramda';
import { renameKeysShallow } from './renameKeys';

const getProps = (keys, object) => {
  return flatten(props(keys, object));
};

export const findById = (value, arrayToSearch) => {
  return find(propEq('id', value), arrayToSearch);
};

export const findAndGetProps = curry((desiredProps, arrayToSearch, id) => {
  return getProps(desiredProps, findById(id, arrayToSearch));
});

export const renameKeys = curry((nameTransformer, obj) => {
  return renameKeysShallow(key => nameTransformer[key] || key, obj);
});

export const transformValues = curry((valueTransformer, obj) => {
  return mapObjIndexed((val, key) => {
    if (valueTransformer[key]) {
      return valueTransformer[key](val);
    }
    return val;
  }, obj);
});
