import { City } from "./City";

export class Location {
    id: string;
    city_id: string;
    name: string;
    address: string[];
    type: string;
    lat: number;
    lon: number;
    geohash: string;

    constructor(
        id: string,
        city_id: string,
        name: string,
        address: string[],
        type: string,
        lat: number,
        lon: number,
        geohash: string) {

        this.id = id;
        this.city_id = city_id;
        this.name = name;
        this.address = address;
        this.type = type;
        this.lat = lat;
        this.lon = lon;
        this.geohash = geohash;
    }
}
