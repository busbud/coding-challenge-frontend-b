import axios from 'axios'

const axiosConfig = axios.create({ headers: {}})
axiosConfig.defaults.headers['Accept'] = 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/'
axiosConfig.defaults.headers['X-Busbud-Token'] = 'PARTNER_JSWsVZQcS_KzxNRzGtIt1A'
axiosConfig.defaults.headers['Content-Type'] = 'application/json'

export default axiosConfig
