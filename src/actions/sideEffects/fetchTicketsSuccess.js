import thunks, { types } from '../';

export default (payload) => (dispatch, getState) => {
	if (!payload.complete) {
		dispatch(thunks[types.fetchTickets]({
			...getState(),
			index: (payload.index || 0) + payload.tickets.length,
		}));
	} else {
		const expires = (payload.expires + 1) * 1000;
		setTimeout(
			() => dispatch(thunks[types.fetchTickets]({
				...getState(),
				index: 0,
			})),
			expires
		);
	}
};
