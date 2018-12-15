// @flow
import type { Sign } from './types';

export const computeTravellerCount = (sign: Sign, currentValue: number): number => {
  let newValue = currentValue;
  if (newValue === 0 && sign === '-') {
    return newValue;
  }
  /* eslint-disable no-unused-expressions */
  sign === '+' ? (newValue += 1) : (newValue -= 1);

  return newValue;
};
