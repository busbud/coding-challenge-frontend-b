import types_ from './types';
import getThunk from './getThunk';
import * as sideEffects from './sideEffects';

export const types = types_;

const thunks = {};

Object.keys(types).forEach(el => {
	thunks[el] = getThunk(el, sideEffects[el]);
});

export default thunks;
