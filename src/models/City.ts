export class City {
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

    constructor(
        id: string,
        locale: string,
        region_id: number,
        name: string,
        lat: number,
        lon: number,
        geohash: string,
        timezone: string,
        image_url: string,
        legacy_url_form: string,
        full_name: string) {

        this.id = id;
        this.locale = locale;
        this.region_id = region_id;
        this.name = name;
        this.lat = lat;
        this.lon = lon;
        this.geohash = geohash;
        this.timezone = timezone;
        this.image_url = image_url;
        this.legacy_url_form = legacy_url_form;
        this.full_name = full_name
    }
}
