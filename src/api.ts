import { ApiResponse } from "./types";

export const cities = {
  quebec: "f2m673",
  montreal: "f25dvk",
};

export function getFestivalStartDate() {
  let departureDate = new Date("July 30, 2021").toISOString();
  departureDate = departureDate.substr(0, departureDate.indexOf("T"));
  return departureDate;
}

type getDeparturesProps = {
  poll?: boolean;
  index?: number;
};
export async function getDepartures(
  args: getDeparturesProps = { poll: false, index: 0 }
): Promise<[ApiResponse, getDeparturesProps | undefined]> {
  const token = process.env.REACT_APP_API_TOKEN;
  if (!token) {
    throw new Error("API Token not set");
  }

  const endpoint = process.env.REACT_APP_API_ENDPOINT;
  if (!endpoint) {
    throw new Error("API Endpoint not set");
  }

  const departureDate = getFestivalStartDate();
  const origin = cities.quebec;
  const destination = cities.montreal;
  const pathParams = [origin, destination, departureDate];
  if (args.poll) {
    pathParams.push("poll");
  }
  const url = `${endpoint}${pathParams.join("/")}`;
  const response = await fetch(url, {
    headers: {
      Accept:
        "application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/",
      "X-Busbud-Token": token,
    },
  });
  const data: ApiResponse = await response.json();
  let nextParams: getDeparturesProps | undefined;
  if (!data.complete) {
    nextParams = {
      poll: true,
      index: (args.index ?? 0) + data.departures.length,
    };
  }
  return [data, nextParams];
}
