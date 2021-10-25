import { useMemo, useState } from "react";

import { City, Departure, Location, Operator, SearchResult } from "@/types";

const formatISODate = (dateString: string, timeZone: string) =>
  new Date(dateString).toLocaleString("en-US", {
    timeStyle: "short",
    timeZone,
  });

export const useDepartures = (passengers: number) => {
  const [cities, setCities] = useState<Array<City>>([]);
  const [departures, setDepartures] = useState<Array<Departure>>([]);
  const [locations, setLocations] = useState<Array<Location>>([]);
  const [operators, setOperators] = useState<Array<Operator>>([]);

  const [isLoading, setIsLoading] = useState(false);

  const loadResults = async (offset = 0) => {
    try {
      const response = await fetch(
        `/api/departures?index=${offset}&passengers=${passengers}`,
        {
          method: "GET",
        }
      );

      const json = await response.json();

      if (json.error) {
        throw new Error(json.error);
      }

      if (json.cities) {
        setCities(json.cities as []);
      }
      if (json.departures) {
        setDepartures(json.departures as []);
      }
      if (json.locations) {
        setLocations(json.locations as []);
      }
      if (json.operators) {
        setOperators(json.operators as []);
      }

      if (!json.complete) {
        setTimeout(() => loadResults(offset + json.departures.length), 2500);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const onSearch = () => {
    // Reset data
    setCities([]);
    setDepartures([]);
    setLocations([]);
    setOperators([]);

    setIsLoading(true);
    loadResults();
  };

  const searchResults = useMemo<Array<SearchResult>>(
    () =>
      departures.map((departure) => {
        const operator = operators.find((o) => o.id === departure.operator_id);

        const originLocation = locations.find(
          (l) => l.id === departure.origin_location_id
        );
        const destinationLocation = locations.find(
          (l) => l.id === departure.destination_location_id
        );

        const originCity = cities.find((c) => c.id === originLocation?.city_id);
        const destinationCity = cities.find(
          (c) => c.id === destinationLocation?.city_id
        );

        const departureTime = formatISODate(
          departure.departure_time,
          departure.departure_timezone
        );
        const arrivalTime = formatISODate(
          departure.arrival_time,
          departure.arrival_timezone
        );

        const from = `${originLocation?.name}, ${originCity?.name}`;
        const to = `${destinationLocation?.name}, ${destinationCity?.name}`;

        const price = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: departure.prices.currency,
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(departure.prices.total);

        return {
          id: departure.id,
          departureTime,
          arrivalTime,
          from,
          to,
          price,
          operatorLogo: operator?.logo_url ?? "",
          operatorName: operator?.display_name ?? "",
          url: departure.links.deeplink,
        };
      }),
    [cities, departures, locations, operators]
  );

  return { isLoading, onSearch, searchResults };
};
