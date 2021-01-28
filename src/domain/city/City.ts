export type City = {
  id?: string
  name: string
  geohash: string
}

export const defaultCities: City[] = [
  {
    name: 'Quebec',
    geohash: 'f2m673',
  },
  {
    name: 'Montreal',
    geohash: 'f25dvk',
  },
]

export const getCityByName = (name: string, cities: City[] = defaultCities) => {
  return cities.find((city) => city.name === name)!
}

export const getCityById = (id: string, cities: City[] = defaultCities) => {
  return cities.find((city) => city.id === id)!
}

export const getNames = (cities: City[] = defaultCities) => {
  return cities.map((city) => city.name)
}
