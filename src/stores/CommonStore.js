
import Vuex from 'vuex'
import axios from 'axios'
import moment from 'moment'
import Settings from '../../config/settings'

export default new Vuex.Store({

	state: {

		departures: null,
		token: null
	},

	getters: {

		getToken: state => {

			// If token already set in store

			if( state.token !== null ) {

				return state.token
			}
			else {

				// Else get it from config file

				return Settings.API_TOKEN
			}
		},

		getDepartures: state => {

			return state.departures
		},
	},

	mutations: {

		SET_TOKEN: (state, data) => {

			// Check if API_TOKEN is set in config file

			if( Settings.API_TOKEN === undefined ) {

				alert('Please provide an API TOKEN. See config file.')
			}
			else {

				state.token = Settings.API_TOKEN
			}
		},

		SET_DEPARTURES: (state, data) => {

			if( Settings.API_TOKEN === undefined ) {

				alert('An error occur when setting departures.')
			}
			else {

				state.departures = data.departures
			}
		}
	},

	actions: {

		searchForDepartures: (context, data) => {
			
			// Call Busbud api to Initiate the search

			return new Promise((resolve, reject) => {

				// Check if API_URL is set in config file

				if( Settings.API_URL === undefined ) {

					alert('Please provide an API URL. See config file.')
				}
				else {

					// Add params to complete the request

					data.params = {

						adult: 1,
						child: 0,
						senior: 0,
						lang: 'EN',
						currency: 'USD'
					}


					// Everything looks good, call the API

					axios({

						method: 'get',
						url: Settings.API_URL + '/x-departures/' + data.origin + '/' + data.destination + '/' + data.dateFrom,
						data: data.params,
						headers: {
							
							'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
							'X-Busbud-Token': 'PARTNER_JSWsVZQcS_KzxNRzGtIt1A'
						}

					}).then(function (response) {
						
						console.log( response )

						if( response.status === 200 ) {

							// If search already complete, then set departures in store

							context.commit({

								type: 'SET_DEPARTURES',
								departures: response.data.departures
							})


							// Return status

							resolve({

								error: false,
								complete: response.data.complete
							})
						}
						else {

							reject({
								
								error: true,
								message:  response.data.message
							});
						}

					})
					.catch(function (error) {
						
						reject({
							
							error: true,
							message:  error.message
						})
					})
				}
			})
		},

		fetchDepartures: (context, data) => {
			
			// Call Busbud api to Initiate the search

			return new Promise((resolve, reject) => {

				// Check if API_URL is set in config file

				if( Settings.API_URL === undefined ) {

					alert('Please provide an API URL. See config file.')
				}
				else {

					// Everything looks good, call the API

					axios({

						method: 'get',
						url: Settings.API_URL + '/x-departures/' + data.origin + '/' + data.destination + '/' + data.dateFrom + '/poll',
						data: data.params,
						headers: {
							
							'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
							'X-Busbud-Token': 'PARTNER_JSWsVZQcS_KzxNRzGtIt1A'
						}

					}).then(function (response) {
						
						if( response.status === 200 ) {

							console.log( response )

							// Set departures in store

							context.commit({

								type: 'SET_DEPARTURES',
								departures: response.data.departures
							})


							// Return status

							resolve({

								error: false,
								complete: response.data.complete 
							})
						}
						else {

							reject({
								
								error: true,
								message:  response.data.message
							});
						}

					})
					.catch(function (error) {
						
						reject({
							
							error: true,
							message:  error.message
						})
					})
				}
			})
		}
	}
})

