import thunks, { types } from '../';

export default ({ currency }) => (dispatch, getState) => {
	dispatch(thunks[types.fetchTickets]({
		...getState(),
		currency,
		index: 0,
	}));
};
