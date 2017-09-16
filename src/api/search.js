import initialState from '../reducers/initialState'
import axios from 'axios'
import axiosConfig from './config'

const Search = {
  getDepartures(poll) {
    const endpoint = 'https://napi.busbud.com/x-departures/dr5reg/f25dvk/2018-08-02/' + poll

    return axiosConfig.get(endpoint)
      .then(response => {
        return response.data
      })
      .catch(() => {
        return initialState.departures
      })
  }
}

export default Search
