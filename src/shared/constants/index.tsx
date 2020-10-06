import * as Yup from "yup";

/*
 * TODO rather than hard-coding those values, it would be
 * better to compute them using a third-party library
 */
export const GEOHASHES: { [key: string]: string } = {
  // US cities
  "New York": "dr5reg",
  // Canadian cities
  Calgary: "c3nf7v",
  Edmonton: "c3x29u",
  Hamilton: "dpxnnc",
  Kitchener: "dpwxpc",
  Montréal: "f25dvk",
  Ottawa: "f244m6",
  Québec: "f2m673",
  Toronto: "dpz88g",
  Vancouver: "c2b2nm",
  Winnipeg: "cbfgv3",
  // British cities
  London: "gcpvj0",
  Manchester: "gcw2jp",
};

// TODO use for autocomplete ?
export const CITIES = Object.keys(GEOHASHES);

export const LOCATION_TYPES_DISPLAY_NAME: { [key: string]: string } = {
  airport: "Airport",
  bus_stop: "Bus stop",
  bus_station: "Bus station",
  transit_station: "Transit station",
  train_station: "Train station",
  subway_station: "Subway station",
  other: "Other",
  default: "Other",
};

export const POLLING_INTERVAL = 3000; // milliseconds

export const BUSBUD_API_HEADERS = {
  Accept:
    "application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/",
  "X-Busbud-Token": process.env.REACT_APP_BUSBUD_API_TOKEN || "",
};

export const SERVER_HOST = "http://localhost:3000";

export const XDepartureSearchStandardSchema = Yup.object().shape(
  {
    origin: Yup.string().required("Please fill in your starting point"),
    destination: Yup.string().required("Please fill in your destination"),
    outbound_date: Yup.string().required("Please enter a date for your travel"),
    adult: Yup.number().when("senior", {
      is: (val: number) => val < 1,
      then: Yup.number().moreThan(
        0,
        "There needs to be at least one person travelling"
      ),
    }),
    senior: Yup.number().when("adult", {
      is: (val: number) => val < 1,
      then: Yup.number().moreThan(
        0,
        "There needs to be at least one person travelling"
      ),
    }),
    child: Yup.number().when(["adult", "senior"], {
      is: (val) => val < 1,
      then: Yup.number().lessThan(
        1,
        "Children cannot travel without supervision"
      ),
    }),
  },
  [["adult", "senior"]]
);
