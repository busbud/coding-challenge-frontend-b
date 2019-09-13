export default interface ILocation {
  id: number;
  city_id: string;
  name: string;
  address: Array<string>;
  type: string;
  lat: number;
  lon: number;
  geohash: string;
}
