import { format } from 'prettier'

export type Location = {
  name: string
  geohash: string
}

export const locations: Location[] = [
  {
    name: 'Québec',
    geohash: 'f2m673',
  },
  {
    name: 'Montréal',
    geohash: 'f25dvk',
  },
]

export const getLocationByName = (name: string) => {
  return locations.find((location) => location.name === name)!
}

export const getNames = () => {
  return locations.map((loc) => loc.name)
}
