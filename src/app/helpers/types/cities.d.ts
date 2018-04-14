  export interface Country {
      code2: string;
      code3: string;
      continent: string;
      default_currency: string;
      default_locale: string;
      locale: string;
      name: string;
      population: number;
  }

  export interface Region {
      country_code2: string;
      id: number;
      locale: string;
      name: string;
      region_code: string;
      country: Country;
  }

  export interface Cities {
      country_code2: string;
      full_name: string;
      geohash: string;
      hero_image_url: string;
      id: string;
      image_url: string;
      lat: number;
      region_id: number;
      timezone: string;
      legacy_url_form: string;
      locale: string;
      lon: number;
      name: string;
      region: Region;
  }

