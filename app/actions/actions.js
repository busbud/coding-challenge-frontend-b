import * as types from './actionTypes';
import axios from 'axios';

function requestData() {
	return {type: types.REQ_DATA}
};

function receiveData(json) {

  if (!json.complete) {
    console.log('poll');
    // call again
  }
	return function(dispatch) {
		return {
      type: types.RECV_DATA,
		    data: json
    }
	}
};

function receiveError(json) {
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
			.then(function(response) {
        console.log('response', response.data);
				dispatch(receiveData(response.data));
			})
			.catch(function(response){
				dispatch(receiveError(response.data));
			})
	}
};
