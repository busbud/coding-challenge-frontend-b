import axios from 'axios'

import * as selectors from './selectors'
import * as localesSelectors from '../locales/selectors'

export const GET_POLLED_SCHEDULES_REQUEST = 'GET_POLLED_SCHEDULES_REQUEST'
export const GET_POLLED_SCHEDULES_SUCCESS = 'GET_POLLED_SCHEDULES_SUCCESS'
export const GET_POLLED_SCHEDULES_ERROR = 'GET_POLLED_SCHEDULES_ERROR'

export const GET_SCHEDULES_REQUEST = 'GET_SCHEDULES_REQUEST'
export const GET_SCHEDULES_SUCCESS = 'GET_SCHEDULES_SUCCESS'
export const GET_SCHEDULES_ERROR = 'GET_SCHEDULES_ERROR'

const API_URL = process.env.REACT_APP_BUSBUD_API_URL
const X_BUSBUD_TOKEN = process.env.REACT_APP_X_BUSBUD_TOKEN
const ACCEPT = 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/'
const HEADERS = {
  'Accept': ACCEPT,
  'X-Busbud-Token': X_BUSBUD_TOKEN,
}

export const getSchedules = ({ origin, destination, outbound_date }, params) => (dispatch, getState) => {
  const isLoading = selectors.getLoading(getState())
  const currency = localesSelectors.getCurrency(getState())
  const lang = localesSelectors.getLang(getState())

  if (isLoading) {
    return
  }

  params.currency = currency
  params.lang = lang

  dispatch({ type: GET_SCHEDULES_REQUEST })

  return axios
    .get(`${API_URL}${origin}/${destination}/${outbound_date}`, { headers: HEADERS, params })
    .then(({ data }) => {
      dispatch({
        type: GET_SCHEDULES_SUCCESS,
        cities: data.cities,
        departures: data.departures,
        isLoading: !data.complete,
        locations: data.locations,
        operators: data.operators,
      })

      if (!data.complete) {
        const timer = setInterval(() => {
          dispatch({ type: GET_POLLED_SCHEDULES_REQUEST })

          params.index = data.departures.length

          return axios
            .get(`${API_URL}${origin}/${destination}/${outbound_date}/poll`, { headers: HEADERS, params })
            .then(({ data }) => {
              const isLoading = selectors.getLoading(getState())

              if (!isLoading) {
                clearInterval(timer)
              }

              return dispatch({
                type: GET_POLLED_SCHEDULES_SUCCESS,
                cities: data.cities,
                departures: data.departures,
                locations: data.locations,
                operators: data.operators,
              })
            }).catch(error => dispatch({ type: GET_POLLED_SCHEDULES_ERROR, error }))
        }, 3500);
      }
    })
    .catch(error => dispatch({ type: GET_SCHEDULES_ERROR, error }))
}

