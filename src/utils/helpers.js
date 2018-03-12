import { fromMaybe, toMaybe } from 'sanctuary';
import {
  converge,
  find,
  pipe,
  nthArg,
  propEq,
  compose,
  not,
  equals,
  divide,
  flip,
  modulo,
  join,
  prop,
  map,
} from 'ramda';

export const findById = converge(find, [pipe(nthArg(0), propEq('id')), nthArg(1)]);

export const isNotEquals = compose(not, equals);

export const safeArray = compose(fromMaybe([]), toMaybe);

export const getHours = compose(Math.floor, flip(divide)(60));

export const getMinutes = flip(modulo)(60);

export const formattedAddress = compose(map(join(', '), prop('address')));
