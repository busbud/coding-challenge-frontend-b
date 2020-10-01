import axios from 'axios'

/**
 * axios instance for polling search
 */
const AxiosInstance = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL,
	headers: {
		"Content-Type": "application/json",
		Accept:
		"application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/",
		"X-Busbud-Token": process.env.REACT_APP_BUSBUD_TOKEN,
	},
});

export default AxiosInstance
