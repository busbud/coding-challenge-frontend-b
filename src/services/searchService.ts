import axios from 'axios'

import { SearchDomain, DeparturesDomain } from '../domain/search'

const X_BUSBUD_TOKEN = process.env.NEXT_PUBLIC_X_BUSBUD_TOKEN

const SearchService = (searchDomain: SearchDomain.Search) => {
  const axiosInstance = axios.create({
    baseURL: 'https://napi.busbud.com/x-departures/',
    headers: {
      Accept:
        'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
      'X-Busbud-Token': X_BUSBUD_TOKEN,
    },
  })

  const baseUrl = searchDomain.urlParams()
  const fetch = async () => {
    try {
      return axiosInstance.get<DeparturesDomain.Departures>(baseUrl, {
        params: searchDomain.queryParams(),
      })
    } catch (error) {
      console.error(error)
    }
  }

  const poll = async (index?: number) => {
    try {
      return axiosInstance.get<
        Pick<
          DeparturesDomain.Departures,
          'operators' | 'departures' | 'complete'
        >
      >(`${baseUrl}/poll`, {
        params: {
          ...searchDomain.queryParams(),
          index,
        },
      })
    } catch (error) {
      console.error(error)
    }
  }
  return {
    fetch,
    poll,
  }
}

export default SearchService
