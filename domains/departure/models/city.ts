type CountryResponse = {
  code2: string
  code3: string
  name: string
  continent: string
  default_locale: string
  default_currency: string
  population: number
  locale: string
}

type RegionResponse = {
  id: number
  country_code2: string
  name: string
  locale: string
  country: CountryResponse
}

export type CityResponse = {
  id: string
  region_id: number
  name: string
  lat: number
  lon: number
  geohash: string
  timezone: string
  image_url: null
  image_url: string
  legacy_url_form: string
  full_name: string
  locale: string
  region: RegionResponse
}

export class City {
  static fromApi(rawCity: CityResponse) {
    return new City(
      rawCity.name,
    );
  }

  constructor(public name: string) {
    this.name = name;
  }
}
