const axios = require('axios')

const TOKEN = process.env.X_BUSBUD_TOKEN
const client = axios.create({
  baseURL: 'https://napi.busbud.com/x-departures/',
  headers: {
    'Accept': [
      'application/vnd.busbud+json;',
      'version=2;',
      'profile=https://schema.busbud.com/v2/'
    ].join(' '),
    'X-Busbud-Token': TOKEN
  }
})

export default {
  async search ({ origin, destination, date, poll }) {
    console.log('departures.search inputs', origin, destination, date, poll)
    let url = `${origin}/${destination}/${toIsoDate(date)}`
    if (poll) {
      url += '/poll'
    }
    try {
      const response = await client.get(url)
      const data = response.data || {}
      return {
        complete: data.complete,
        cities: data.cities,
        locations: data.locations,
        operators: data.operators,
        departures: data.departures
      }
    } catch (error) {
      throw new Error('Failed to get departures')
    }
  }
}

function toIsoDate (date) {
  return date.toISOString().split('T')[0]
}
