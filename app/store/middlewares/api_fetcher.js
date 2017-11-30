import { receiveDepartures } from '../actions.js'

const requestDepartures = (data = {}) => {

  // Replace API url placeholders
  const baseApiUrl = window.config.api.endpoint
    .replace(/\:origin/, data.origin)
    .replace(/\:destination/, data.destination)
    .replace(/\:outbound_date/, data.outbound_date)
  const urlChunks = [baseApiUrl]
  
  // Set QS
  const params = []
  if (data.polling && data.index) {
    urlChunks.push('poll')
    params.push(`index=${data.index}`)
  }
  const url = `${urlChunks.join('/')}?${params.join('&')}`

  // Set Headers
  const headers = new Headers()
  headers.append('Accept', 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/')
  headers.append('X-Busbud-Token', window.config.api.key)
  const options = {
    headers: headers,
    mode: 'cors'
  }

  // Call busbud API
  return fetch(url, options)
    .then( response => {
      if (response.ok) { return response.json() }
      throw new Error(`Error ${response.status} - ${response.statusText}`)
    })
}

const apiFetcher = store => next => action => {
  next(action)

  switch (action.type) {
    case 'GET_DEPARTURES_REQUESTED':
      requestDepartures(action)
        .then( data => {
          next(receiveDepartures(data))
        })
      break
    case 'UPDATE_DEPARTURES_REQUESTED': 
      requestDepartures({ ...action, polling: true })
        .then( data  => {
          next(receiveDepartures(data))
        })
      break
    default:
      break;
  }
}

export default apiFetcher