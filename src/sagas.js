import {delay} from 'redux-saga'
// eslint-disable-next-line import/order
import {call, put, takeLatest} from 'redux-saga/effects'
import {REQUEST_DEPARTURES} from './types'
import geocodes from './utils/geocodes'
import {formatDate} from './utils/formatters'
import {receiveDepartures, receiveError} from './actions'

export function* fetchDepartures({from, to, date, currency}) {
	const url = new URL(`https://napi.busbud.com/x-departures/${geocodes[from]}/${geocodes[to]}/${formatDate(date)}`)
	url.searchParams.append('adult', 1) // Not mandatory since this is the default behavior
	url.searchParams.append('currency', currency)

	const fetchParams = {
		method: 'GET',
		headers: new Headers({
			Accept: 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
			'X-Busbud-Token': process.env.REACT_APP_BUSBUD_TOKEN
		})
	}

	let isComplete = yield* singleRequest(url, fetchParams)

	url.pathname += '/poll'

	while (!isComplete) {
		yield call(delay, 2000)
		isComplete = yield* singleRequest(url, fetchParams)
	}
}

/**
 * @param url {URL}
 * @param fetchParams {Object}
 * @returns {Boolean} returns true (complete) if there is an error
 */
function* singleRequest(url, fetchParams) {
	const response = yield call(fetch, url, fetchParams)
	const json = yield call([response, 'json'])

	if (!response.ok) {
		yield put(receiveError(json.error.details))
		return true
	}

	yield put(receiveDepartures(json))
	return json.complete
}

export default function* watchRequests() {
	yield takeLatest(REQUEST_DEPARTURES, fetchDepartures)
}
