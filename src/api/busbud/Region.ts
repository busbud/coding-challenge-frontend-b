import { Country } from "./Country"

export interface Region {
  id: number,
  locale: string,
  country_code2: string,
  name: string,
  country: Country
}
