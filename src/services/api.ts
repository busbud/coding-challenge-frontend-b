// Packages
import axios, { AxiosRequestConfig } from 'axios'

const NEXT_PUBLIC_API_URI = process.env.NEXT_PUBLIC_API_URI
const NEXT_PUBLIC_BUSBUD_TOKEN = process.env.NEXT_PUBLIC_BUSBUD_TOKEN

const config: AxiosRequestConfig = {
  baseURL: NEXT_PUBLIC_API_URI,
  method: 'GET',
  headers: {
    'X-Busbud-Token': NEXT_PUBLIC_BUSBUD_TOKEN,
    Accept:
      'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/'
  }
}

export const request = async (url) => {
  const { data } = await axios({ ...config, url })

  return data
}
