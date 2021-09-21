import { Region } from "./Region"

export interface City {
  id: string,
  locale: string,
  region_id: number,
  lat: number,
  lng: number,
  geohash: string,
  timezone: string,
  image_url: string,
  legacy_url_form: string,
  full_name: string,
  region: Region
}
