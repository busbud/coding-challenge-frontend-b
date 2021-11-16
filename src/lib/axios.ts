import axios from "axios";
import Config from "../config";

const { BUSBUD_API_TOKEN, BUSBUD_API_URL_X_DEPARTURES, CURRENCY_BY_LANG } =
  Config;

// eslint-disable-next-line import/prefer-default-export
export const busbudAxiosInstance = axios.create({
  baseURL: BUSBUD_API_URL_X_DEPARTURES,
  headers: {
    Accept:
      "application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/",
    "X-Busbud-Token": BUSBUD_API_TOKEN as string,
  },
  params: {
    lang: "en",
    currency: CURRENCY_BY_LANG.EN,
  },
});
