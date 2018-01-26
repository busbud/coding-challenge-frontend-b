import * as actions from './index'
// JSDom doesn't implement Fetch API yet (https://github.com/tmpvar/jsdom/issues/1724
import 'whatwg-fetch'

describe('Actions', () => {
	it('should create an action to abort a request', () => {
		const expectedAction = {
			type: actions.ABORT_REQUEST
		}
		expect(actions.abortRequest(new window.AbortController())).toEqual(expectedAction)
	})

	it('should create an action to request departures', () => {
		const controller = new window.AbortController()
		const expectedAction = {
			type: actions.REQUEST_DEPARTURES,
			controller
		}
		expect(actions.requestDepartures(controller)).toEqual(expectedAction)
	})

	it('should create an action to receive errors from requests', () => {
		const reason = 'because'
		const expectedAction = {
			type: actions.RECEIVE_ERROR,
			reason
		}
		expect(actions.receiveError(reason)).toEqual(expectedAction)
	})

	it('should create an action to receive departures', () => {
		Date.now = jest.fn().mockReturnValue('mocked')

		const operator = {id: 1, name: 'o'}
		/* eslint-disable camelcase */
		const origin_location = {id: 1, name: 'lA'}
		const destination_location = {id: 2, name: 'lB'}
		const json = {
			complete: true,
			operators: [operator],
			locations: [origin_location, destination_location],
			departures: [{
				origin_location_id: 1,
				destination_location_id: 2,
				operator_id: 1
			}]
		}
		const expectedDepartures = [{
			origin_location_id: 1,
			origin_location,
			destination_location_id: 2,
			destination_location,
			operator_id: 1,
			operator
		}]
		/* eslint-disable camelcase */
		const expectedAction = {
			type: actions.RECEIVE_DEPARTURES,
			departures: expectedDepartures,
			receivedAt: 'mocked',
			isPartial: false
		}

		expect(actions.receiveDepartures(json)).toEqual(expectedAction)
	})

	describe('FetchDepartures', () => {
		const from = 'Montreal'
		const to = 'New York'
		const date = new Date(2018, 8, 23)
		const currency = 'CAD'
		const requestUrl = 'https://napi.busbud.com/x-departures/f25dvk/dr5reg/2018-09-23?adult=1&currency=CAD'
		const pollUrl = 'https://napi.busbud.com/x-departures/f25dvk/dr5reg/2018-09-23/poll?adult=1&currency=CAD'
		const fetchParams = {
			signal: new window.AbortController().signal,
			method: 'GET',
			headers: new Headers({
				Accept: 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
				'X-Busbud-Token': process.env.REACT_APP_BUSBUD_TOKEN
			})
		}
		const response = (complete = true) => Promise.resolve(
			new Response(JSON.stringify({complete, departures: []}), {status: 200})
		)
		const erroredResponse = Promise.resolve(
			new Response('{ "error": { "details": "such error" } }', {status: 400})
		)

		it('should fetch departures', async () => {
			window.fetch = jest.fn().mockReturnValue(response())

			await actions.fetchDepartures(from, to, date, currency, () => {})

			expect(fetch.mock.calls[0][0].toString()).toBe(requestUrl)
			expect(fetch.mock.calls[0][1]).toEqual(fetchParams)
		})

		it('should poll until response is complete', async () => {
			window.fetch = jest.fn()
				.mockReturnValueOnce(response(false))
				.mockReturnValue(response())

			await actions.fetchDepartures(from, to, date, currency, () => {}, false, 0)

			expect(fetch.mock.calls.length).toBe(2)
			expect(fetch.mock.calls[0][0].toString()).toBe(requestUrl)
			expect(fetch.mock.calls[1][0].toString()).toBe(pollUrl)
			expect(fetch.mock.calls[1][1]).toEqual(fetchParams)
		})

		it('should handle errors', async () => {
			window.fetch = jest.fn().mockReturnValue(erroredResponse)
			const dispatchMock = jest.fn()

			await actions.fetchDepartures(from, to, date, currency, dispatchMock)

			expect(fetch.mock.calls.length).toBe(1)
			expect(dispatchMock).toBeCalledWith(actions.receiveError('such error'))
		})
	})
})
