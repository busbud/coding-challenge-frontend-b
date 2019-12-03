import axios from 'axios'

const http = axios.create({
  baseURL: 'https://napi.busbud.com',
  headers: {
    Accept: 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
    'X-Busbud-Token': process.env.REACT_APP_BUD_TOKEN
  }
})

export default http;
