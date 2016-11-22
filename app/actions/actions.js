import * as types from './actionTypes';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8081/api',
  timeout: 20000,
});

function requestData() {
	return {type: types.REQ_DATA}
};

function receiveData(json) {
	return {
		type: types.RECV_DATA,
		data: json
	}
};

function receiveError(json) {
	return {
		type: types.RECV_ERROR,
		data: json
	}
};

const date = '2017-01-19';

export function fetchData(url, params) {
	return function(dispatch) {
		dispatch(requestData());
		return instance.get('/x-departures/dr5reg/f25dvk/' + date,
			{
				params
			})
			.then(response => {
					dispatch(receiveData(response.data));
      }, (error) => {
				dispatch(receiveError(error));
			}
			)
	}
};

function requestPollData() {
	return {type: types.REQ_POLL_DATA}
};

function receivePollData(json) {
	return {
		type: types.RECV_POLL_DATA,
		data: json
	}
};

function receivePollError(json) {
	return {
		type: types.RECV_POLL_ERROR,
		data: json
	}
};

export function fetchPollData(url, params) {
	return function(dispatch) {
		dispatch(requestPollData());
		return instance.get('/x-departures/dr5reg/f25dvk/' + date + '/poll', {
			params
			})
			.then(response => {
					dispatch(receivePollData(response.data));
      }, (error) => {
				dispatch(receivePollError(error));
        }
			)
	}
};
