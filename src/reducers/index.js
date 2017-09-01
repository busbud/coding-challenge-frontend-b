import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import composeState from './composeState';
import getStateDiff from './getStateDiff';

export const defaultState = {
	safe: false,
	date: '2017-09-10',
	tickets: [{
		id: 'Zjc5ZDhjODI6NzA4YWRkZjk',
		price: 9543,
		currency: 'USD',
		url: 'https://www.busbud.com/en/deeplink/dr5reg/f25dvk/Zjc5ZDhjODI6NzA4YWRkZjk?outbound_date=2017-09-06&return_date&adults=1&children=0&seniors=0&child_ages=&senior_ages=&discount_code&utm_source={utm_source}&utm_campaign={utm_campaign}&utm_medium={utm_medium}',
		departure: '2017-09-06T07:00:00',
		arrival: '2017-09-06T22:35:00',
		duration: 935,
		origin: {
			id: 1942,
			name: 'NY',
		},
		destination: {
			id: 1938,
			name: 'MR',
		},
		operator_id: '0e753dbf-a9de-4339-8a00-bbb6f4813d18',
		operator_logo: 'https://busbud.imgix.net/operator-logos/adirondack-trailways.png?h={height}&w={width}&auto=format&fit=fill&bg=0FFF',
		operator_url: 'https://trailwaysny.com',
		operator_name: 'Adirondack Trailways',
	}],
	lang: 'en',
	currency: 'USD',
};

const reducers = combineReducers({
	routing: routerReducer,
	app: (state = defaultState, action = {}) => {
		const merge = composeState(state);
		const stateDiff = getStateDiff(action);
		return merge(stateDiff);
	},
});

export default reducers;
