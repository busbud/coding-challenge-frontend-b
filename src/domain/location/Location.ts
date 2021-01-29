export type Location = {
  id: number
  city_id: string
  name: string
  geohash: string
}

export const getLocationByName = (locations: Location[], name: string) => {
  return locations.find((location) => location.name === name)!
}

export const getLocationById = (locations: Location[], id: Location['id']) => {
  return locations.find((location) => location.id === id)!
}

export const getNames = (locations: Location[]) => {
  return locations.map((loc) => loc.name)
}
