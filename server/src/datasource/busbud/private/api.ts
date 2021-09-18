import forge from "mappersmith";
import { busbudToken } from "../../../env";

const headers = {
  "X-Busbud-Token": busbudToken,
  Accept:
    "application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/",
};

export const api = forge({
  clientId: "busbud",
  host: "https://napi.busbud.com",

  resources: {
    Departures: {
      searchInit: {
        headers,
        path: "/x-departures/{origin}/{destination}/{outbound_date}",
      },
      searchPoll: {
        headers,
        path: "/x-departures/{origin}/{destination}/{outbound_date}/poll",
      },
    },
  },
});
