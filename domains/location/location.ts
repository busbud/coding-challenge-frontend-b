export type LocationResponse = {
  id: number
  city_id: string
  name: string
  address: string[]
  type: string
  lat: number
  lon: number
  geohash: string
}

export class Location {
  static fromApi(rawLocation: LocationResponse) {
    return new Location(rawLocation.name);
  }

  constructor(public name: string) {}
}
