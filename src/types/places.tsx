type Coordinates = {
  lat: number;
  lon: number;
  geohash: string;
};

export type Location = Coordinates & {
  id: number;
  city_id: string;
  name: string;
  address: string[];
  type: string;
};

export type City = Coordinates & {
  id: string;
  locale: string;
  region_id: number;
  name: string;
  timezone: string;
  image_url: string;
  legacy_url_form: string;
  full_name: string;
  region: Region;
};

type Country = {
  code2: string;
  locale: string;
  code3: string;
  name: string;
  continent: string;
  default_locale: string;
  default_currency: string;
  population: number;
};

type Region = {
  id: number;
  locale: string;
  country_code2: string;
  name: string;
  country: Country;
};
