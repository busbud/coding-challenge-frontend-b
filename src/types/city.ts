export default interface ICity {
  id: string;
  locale: string;
  region_id: number;
  name: string;
  lat: number;
  lon: number;
  geohash: string;
  timezone: string;
  image_url: string;
  legacy_url_form: string;
  full_name: string;
  region: {
    id: number;
    locale: string;
    country_code2: string;
    name: string;
    country: {
      code2: string;
      locale: string;
      code3: string;
      name: string;
      continent: string;
      default_locale: string;
      default_currency: string;
      population: number;
    };
  };
}
