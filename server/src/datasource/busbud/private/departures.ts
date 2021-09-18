import { api } from "./api";
import { Departure } from "./types";
import { DeparturesResponse, Location } from "./apiResponseTypes";
import { LocalDateTime, ZoneId } from "@js-joda/core";
import "@js-joda/timezone";

interface Options {
  adult: number;
  child: number;
  senior: number;
  lang: "en" | "fr" | "es";
  currency: "CAD" | "USD" | "EUR";
}

export async function fetchDepartures(
  origin: string,
  dest: string,
  outboundDate: string,
  options?: Partial<Options>
): Promise<Departure[]> {
  const data = await fetchAllDepartures(origin, dest, outboundDate, options);

  const locationName = locationNameFinder(groupById(data.locations));
  const departures = data.departures.map<Departure>((dep) => ({
    arrivalLocationName: locationName(dep.origin_location_id),
    arrivalEpoch: toEpochTime(dep.arrival_time, dep.arrival_timezone),
    departureLocationName: locationName(dep.destination_location_id),
    departureEpoch: toEpochTime(dep.departure_time, dep.departure_timezone),
    price: {
      currency: dep.prices.currency,
      ammount: dep.prices.total,
    },
  }));

  return departures;
}

//--------------
// DATA FETCHING
//--------------

const fetchAllDepartures = async (
  origin: string,
  destination: string,
  outboundDate: string,
  options?: Partial<Options>
): Promise<DeparturesResponse> => {
  const pollAt = getTimeToPoll();
  const res = await api.Departures.searchInit({
    origin,
    destination,
    outbound_date: outboundDate,
    ...options,
  });
  const initData = res.data<DeparturesResponse>();
  if (initData.complete) {
    return initData;
  }

  return poll(pollAt, initData, origin, destination, outboundDate, options);
};

/**
 * The poll endpoint should be called every 2-5 seconds
 * This will give a point in time in that period
 */
const getTimeToPoll = (): number => Date.now() + (2000 + Math.random() * 3000);

const poll = async (
  requestAt: number,
  prev: DeparturesResponse,
  origin: string,
  destination: string,
  outboundDate: string,
  options?: Partial<Options>
): Promise<DeparturesResponse> => {
  await waitUntil(requestAt);

  const index = prev.departures.length;
  const pollAt = getTimeToPoll();
  const res = await api.Departures.searchPoll({
    origin,
    destination,
    outbound_date: outboundDate,
    ...options,
    index,
  });
  const data = res.data<DeparturesResponse>();
  const mergedData = concatResponse(prev, data);
  if (mergedData.complete) {
    return mergedData;
  }
  return poll(pollAt, mergedData, origin, destination, outboundDate, options);
};

const waitUntil = (targetTime: number): Promise<void> =>
  new Promise((resolve) => {
    const timeout = targetTime - Date.now();
    if (timeout <= 0) {
      resolve();
    }

    setTimeout(resolve, timeout);
  });

const concatResponse = (
  prev: DeparturesResponse,
  next: DeparturesResponse
): DeparturesResponse => ({
  origin_city_id: next.origin_city_id,
  destination_city_id: next.destination_city_id,
  complete: next.complete,
  ttl: next.ttl,
  is_valid_route: next.is_valid_route,
  metadata: next.metadata,
  cities: prev.cities.concat(next.cities),
  locations: prev.locations.concat(next.locations),
  operators: prev.operators.concat(next.operators),
  departures: prev.departures.concat(next.departures),
});

//--------------
// DATA PARSING
//--------------
const locationNameFinder =
  (locations: Map<number, Location>) =>
  (id: number): string =>
    locations.get(id)?.name ?? "Unknown";

const groupById = <T extends { id: number }>(list: T[]): Map<number, T> =>
  new Map(list.map((item) => [item.id, item]));

const toEpochTime = (time: string, timezone: string): number =>
  LocalDateTime.parse(time).atZone(ZoneId.of(timezone)).toEpochSecond();
