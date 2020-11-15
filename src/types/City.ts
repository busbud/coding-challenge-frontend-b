// NOTE: Linting disabled due to external data requirements
/* eslint-disable @typescript-eslint/naming-convention */
import { TCurrency } from "./Currency";
import { TLang } from "./Lang";

export type TCity = {
  full_name: string;
  geohash: string;
  id: string;
  image_url: string;
  lat: number;
  legacy_url_form: string;
  locale: TLang;
  lon: number;
  name: string;
  region: {
    country: {
      code2: string;
      locale: TLang;
      code3: string;
      name: string;
      continent: string;
      default_locale: TLang;
      default_currency: TCurrency;
      population: number;
    };
    country_code2: string;
    id: number;
    locale: TLang;
    name: string;
  };
  region_id: number;
  timezone: string;
};
