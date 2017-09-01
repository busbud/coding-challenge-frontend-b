import types from './types';

export default function getThunk(action, sideEffect) {
	if (sideEffect) { // sagas
		return payload => (dispatch, getState) => {
			dispatch(getThunk(action)(payload));
			sideEffect(payload)(dispatch, getState);
		};
	}
	return payload => ({
		type: types[action],
		payload,
	});
}
