import axios from 'axios'

/**
 * Instance of axios to be imported elsewhere.
 *
 * By having a global instance declared at one place, we can use a .env file
 * to replace some secret headers variables and change our baseURL easily.
 */
const instance = axios.create({
  baseURL: 'https://napi.busbud.com/',
  headers: {
    // 'Content-Type': 'application/json',
    Accept: 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
    'X-Busbud-Token': 'PARTNER_BaASYYHxTxuOINEOMWq5GA'
  }
})

export default instance
