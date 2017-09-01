import thunks, { types } from '../';
import messages from './messages';
import { fetchTickets as transform } from '../transformers/';
import urlEncodeData from '../urlEncodeData';

const queryConstants = {
	adult : 1,
}

export default (payload) => (dispatch, getState) => {
	const { currency, lang, index, date } = payload.app;
	const queryParams = {
		lang,
		currency,
		index,
		...queryConstants,
	};

	const options = {
		url: `https://napi.busbud.com/x-departures/dr5reg/f25dvk/${date}${
			index ? '/poll' : ''
		}?${urlEncodeData(queryParams)}`,
		method: 'GET',
		credentials: 'same-origin',
		headers: {
			Accept: [
				'application/vnd.busbud+json',
				'version=2',
				'profile=https://schema.busbud.com/v2/'
			].join(';'),
			'X-Busbud-Token': TOKEN,
		}
	};

	return fetch(options.url, options)
		.then(response => {
			if (!response.ok) {
				dispatch(thunks[types.requestFailed]());
				throw JSON.stringify(response);
			}
			return response.json();
		})
		.then(data => ({ ...getState(), data }))
		.then(transform)
		.then(thunks[types.fetchTicketsSuccess])
		.then(dispatch)
		.catch((e) => {
			dispatch(thunks[types.generalError](e.message || messages.requestFailed));
		});
};
