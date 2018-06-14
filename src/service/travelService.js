import axios from 'axios'

const headers = {
  'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
  'X-Busbud-Token': 'PARTNER_IoysifKUTZqIEyiBCLprjQ'
}

/** create the url to access the departures endpoint
 * @param parameters
 * @returns {string}
 */
const serviceUrl = function (parameters) {
  return `https://napi.busbud.com/x-departures/${parameters.geoHashOrigin}/${parameters.geoHashDestination}/${parameters.date.toISOString().split('T')[0]}`
}

/**
 * create the url to access the departures endpoint poll
 * @param parameters
 * @returns {string}
 */
const pollUrl = function (parameters) {
  return serviceUrl(parameters) + '/poll'
}

/** based on an object containing parameters, filter the properties
 * @param parameters
 * @returns {{adult: *, child: *, senior: *, lang: *, currency: *}}
 */
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

  /**
   * return a promise that will returns the travels
   * @param parameters
   * @returns {AxiosPromise<T>}
   */
  fetchTravels: function (parameters) {
    return axios.get(serviceUrl(parameters),
      {
        headers: headers,
        params: extractQueryParams(parameters)
      })
  },
  /**
   * return a promise that will return the departures by polling
   * @param parameters
   * @param departures
   * @returns {AxiosPromise<T>}
   */
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
