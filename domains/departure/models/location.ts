import { City, CityResponse } from './city';

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
  static fromApi(rawLocation: LocationResponse, rawCities: CityResponse[]) {
    const rawCity = rawCities.find((city) => city.id === rawLocation.city_id);

    if (rawCity === undefined) {
      throw Error(`Could not find a city ${rawLocation.city_id} in location ${rawLocation.id}`);
    }

    return new Location(
      rawLocation.name,
      City.fromApi(rawCity),
    );
  }

  constructor(
    public name: string,
    public city: City,
  ) {
    this.name = name;
    this.city = city;
  }
}
