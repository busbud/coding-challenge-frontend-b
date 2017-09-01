import thunks, { types } from '../';

export default () => (dispatch, getState) => {
	// noinspection Eslint
	dispatch({
		type: 'i18n',
		payload: {
			i18n: require('../../i18n').default(),
		},
	});
	dispatch(thunks[types.fetchTickets](getState()));
};
