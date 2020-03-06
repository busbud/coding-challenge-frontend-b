import Vue from 'vue'
import axios from 'axios'

// headers are set here
axios.defaults.baseURL = 'https://napi.busbud.com'
axios.defaults.headers.common.Accept = 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/'
axios.defaults.headers.common['X-Busbud-Token'] = 'PARTNER_AHm3M6clSAOoyJg4KyCg7w'
Vue.prototype.$axios = axios
