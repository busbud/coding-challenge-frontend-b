export class Operator {
  id: string;
  source_id: number;
  profile_id: number;
  name: string;
  url: string;
  logo_url: string;
  display_name: string;
  fuzzy_prices: boolean;

  constructor(
    id: string,
    source_id: number,
    profile_id: number,
    name: string,
    url: string,
    logo_url: string,
    display_name: string,
    fuzzy_prices: boolean
  ) {
    this.id = id;
    this.source_id = source_id;
    this.profile_id = profile_id;
    this.name = name;
    this.url = url;
    this.logo_url = logo_url;
    this.display_name = display_name;
    this.fuzzy_prices = fuzzy_prices;
  }
}
