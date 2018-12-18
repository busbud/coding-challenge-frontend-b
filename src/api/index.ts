import axios from 'axios'
import { config } from './../config'

const axiosInstance = axios.create({
  baseURL: config.baseURL,
  headers: config.headers
})

export const getResults = (origin: string, destination: string, outboundDate: string, params: any) => {
  const url = `${origin}/${destination}/${outboundDate}`
  return(
    axiosInstance.get(url, {
      params: params
    })
    .then(response => {
      return response.data
    })
  )
}

export const getPollResults = (origin: string, destination: string, outboundDate: string, params: any) => {
  const url = `${origin}/${destination}/${outboundDate}/poll`
  return(
    axiosInstance.get(url, {
      params: params
    })
    .then(response => {
      return response.data
    })
  )
}