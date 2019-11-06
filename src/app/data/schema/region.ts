import { Country } from './country';

export interface Region {
    id: number;
    locale: string;
    country_code2: string;
    name: string;
    country: Country;
}