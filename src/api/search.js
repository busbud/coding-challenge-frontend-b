import initialState from '../reducers/initialState'
import axios from 'axios'
import axiosConfig from './config'

const Search = {
  initialize(){
    return axiosConfig.get('https://napi.busbud.com/x-departures/dr5reg/f25dvk/2018-08-02')
      .then(response => {
        return response.data
      })
      .catch(() => {
        return initialState.departures
      })
  }
}

export default Search
