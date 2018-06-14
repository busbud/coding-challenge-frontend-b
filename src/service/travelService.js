import axios from 'axios'

const headers = {
  'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
  'X-Busbud-Token': 'PARTNER_IoysifKUTZqIEyiBCLprjQ'
}

// create a service with that
const serviceUrl = function (parameters) {
  return `https://napi.busbud.com/x-departures/${parameters.geoHashOrigin}/${parameters.geoHashDestination}/${parameters.date.toISOString().split('T')[0]}`
}
const pollUrl = function (parameters) {
  return serviceUrl(parameters) + '/poll'
}

const extractQueryParams = function (parameters) {
  const {adult, child, senior, lang, currency} = parameters
  return {
    adult,
    child,
    senior,
    lang,
    currency
  }
}

export default {

  fetchTravels: function (parameters) {
    return axios.get(serviceUrl(parameters),
      {
        headers: headers,
        params: extractQueryParams(parameters)
      })
  },
  pollTravels: function (parameters, departures) {
    let searchParametersCopy = Object.assign({}, extractQueryParams(parameters))
    searchParametersCopy.index = departures.length

    return axios.get(pollUrl(parameters),
      {
        headers: headers,
        params: searchParametersCopy
      })
  }

}
