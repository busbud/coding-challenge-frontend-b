import { Region } from './region';

export interface City {
    id: string;
    locale?: string;
    region_id?: number;
    name: string;
    lat?: number;
    lon?: number;
    geohash: string;
    timezone?: string;
    image_url?: string;
    legacy_url_form?: string;
    full_name?: string;
    region?: Region;
}