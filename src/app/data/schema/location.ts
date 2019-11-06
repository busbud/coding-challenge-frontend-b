export interface Location {
    id: number;
    city_id?: string;
    name: string;
    address?: string[];
    type?: string;
    lat?: number;
    lon?: number;
    geohash: string;
}