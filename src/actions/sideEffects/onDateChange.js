import thunks, { types } from '../';

export default (payload) => (dispatch, getState) => {
	const state = getState().app;
	if (state.date !== payload && state.complete) {
		dispatch(thunks[types.fetchTickets]({
			index: 0,
			...getState(),
		}));
	}
};
