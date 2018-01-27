// JSDom doesn't implement Fetch API yet (https://github.com/tmpvar/jsdom/issues/1724
import 'whatwg-fetch'
import {delay} from 'redux-saga'
// eslint-disable-next-line import/order
import {call, put, takeLatest} from 'redux-saga/effects'
import {REQUEST_DEPARTURES} from './types'
import watchRequests, {fetchDepartures} from './sagas'
import {receiveDepartures, receiveError} from './actions'

describe('fetchDepartures', () => {
	Date.now = jest.fn().mockReturnValue('mocked')

	const from = 'Montreal'
	const to = 'New York'
	const date = new Date(3000, 8, 23)
	const currency = 'CAD'
	const requestUrl = new URL('https://napi.busbud.com/x-departures/f25dvk/dr5reg/3000-09-23')
	requestUrl.searchParams.append('adult', 1)
	requestUrl.searchParams.append('currency', currency)
	const pollUrl = new URL('https://napi.busbud.com/x-departures/f25dvk/dr5reg/3000-09-23/poll')
	pollUrl.searchParams.append('adult', 1)
	pollUrl.searchParams.append('currency', currency)
	const fetchParams = {
		method: 'GET',
		headers: new Headers({
			Accept: 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
			'X-Busbud-Token': process.env.REACT_APP_BUSBUD_TOKEN
		})
	}

	const completeResponseJson = {complete: true, departures: []}
	const completeResponse = new Response(JSON.stringify(completeResponseJson))

	const uncompleteResponseJson = {complete: false, departures: []}
	const uncompleteResponse = new Response(JSON.stringify(uncompleteResponseJson))

	const erroredResponseJson = {error: {details: 'such error'}}
	const erroredResponse = new Response(JSON.stringify(erroredResponseJson), {status: 400})

	const action = {from, to, date, currency, REQUEST_DEPARTURES}
	let gen

	beforeEach(() => {
		gen = fetchDepartures(action)
	})

	it('should fetch departures', () => {
		expect(gen.next().value).toEqual(call(fetch, requestUrl, fetchParams))
		expect(gen.next(completeResponse).value).toEqual(call([completeResponse, 'json']))
		expect(gen.next(completeResponseJson).value).toEqual(put(receiveDepartures(completeResponseJson)))
		expect(gen.next().done).toBe(true)
	})

	it('should poll until response is complete', () => {
		expect(gen.next().value).toEqual(call(fetch, requestUrl, fetchParams))
		expect(gen.next(uncompleteResponse).value).toEqual(call([uncompleteResponse, 'json']))
		expect(gen.next(uncompleteResponseJson).value).toEqual(put(receiveDepartures(uncompleteResponseJson)))
		expect(gen.next().value).toEqual(call(delay, 2000))
		expect(gen.next().value).toEqual(call(fetch, pollUrl, fetchParams))
		expect(gen.next(completeResponse).value).toEqual(call([completeResponse, 'json']))
		expect(gen.next(completeResponseJson).value).toEqual(put(receiveDepartures(completeResponseJson)))
		expect(gen.next().done).toBe(true)
	})

	it('should handle errored response', () => {
		expect(gen.next().value).toEqual(call(fetch, requestUrl, fetchParams))
		expect(gen.next(erroredResponse).value).toEqual(call([erroredResponse, 'json']))
		expect(gen.next(erroredResponseJson).value).toEqual(put(receiveError(erroredResponseJson.error.details)))
		expect(gen.next().done).toBe(true)
	})

	it('should handle uncomplete error response', () => {
		expect(gen.next().value).toEqual(call(fetch, requestUrl, fetchParams))
		expect(gen.next(uncompleteResponse).value).toEqual(call([uncompleteResponse, 'json']))
		expect(gen.next(uncompleteResponseJson).value).toEqual(put(receiveDepartures(uncompleteResponseJson)))
		expect(gen.next().value).toEqual(call(delay, 2000))
		expect(gen.next().value).toEqual(call(fetch, pollUrl, fetchParams))
		expect(gen.next(erroredResponse).value).toEqual(call([erroredResponse, 'json']))
		expect(gen.next(erroredResponseJson).value).toEqual(put(receiveError(erroredResponseJson.error.details)))
		expect(gen.next().done).toBe(true)
	})

	// No need to check for abortion, redux-saga takeLatest handle it by design
})

describe('watchRequests', () => {
	const gen = watchRequests()
	it('should watch for departures', () => {
		expect(gen.next().value).toEqual(takeLatest(REQUEST_DEPARTURES, fetchDepartures))
		expect(gen.next().done).toBe(true)
	})
})
