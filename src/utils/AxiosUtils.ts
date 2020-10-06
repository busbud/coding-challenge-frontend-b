import axios from "axios";
import { INumberOfPassengers } from "../containers/SearchSection/SearchSection";

export const axiosRequest = axios.create({
  baseURL: process.env.REACT_APP_BUSBUD_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/",
    "X-Busbud-Token": process.env.REACT_APP_BUSBUD_TOKEN,
  },
});

export function departuresQueryBuilder(origin: string, destination: string, date: string, numberOfPassengers: INumberOfPassengers, lang: string, currency: string): string {
    return `/x-departures/${origin}/${destination}/${date}?&adult=${numberOfPassengers.adults}&child=${numberOfPassengers.children}&senior=${numberOfPassengers.seniors}&lang=${lang}&currency=${currency}`
}
