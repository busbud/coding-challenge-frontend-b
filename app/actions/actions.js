import * as types from './actionTypes';
import axios from 'axios';

function requestData() {
	return {type: types.REQ_DATA}
};

function receiveData(json) {
	return{
		type: types.RECV_DATA,
		data: json
	}
};

function receiveError(json) {
  console.log('receive Error');
	return {
		type: types.RECV_ERROR,
		data: json
	}
};

export function fetchData(url) {
	return function(dispatch) {
		dispatch(requestData());
		return axios({
			url: url,
			timeout: 20000,
			method: 'get',
			responseType: 'json'
		})
			.then(response => {
        console.log('response', response.data)
				dispatch(receiveData(response.data));
      }, (error) => {
				dispatch(receiveError(error));
        }
			)
	}
};
