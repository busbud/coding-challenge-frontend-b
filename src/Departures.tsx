import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import api from "./api";
import Departure from "./Departure";
import type { DeparturesResponse } from "./types";
import { getBaseQuery, getLocationNamesById } from "./utils";

interface DeparturesProps {
  origin: string;
  destination: string;
  date: string;
  passengers: number;
}

export default function Departures(props: DeparturesProps) {
  const { t } = useTranslation();
  const [departures, setDepartures] = useState<
    DeparturesResponse["departures"]
  >([]);
  const [locations, setLocations] = useState<DeparturesResponse["locations"]>(
    []
  );

  useEffect(() => {
    async function fetchInitialSearch() {
      const { url, parameters: params } = getBaseQuery(props);
      const { data } = await api.get<DeparturesResponse>(url, { params });
      if (data) {
        setDepartures(data.departures);
        setLocations(data.locations);
      }
    }
    fetchInitialSearch();
  }, [props]);

  const locationNamesById = useMemo(
    () => getLocationNamesById(locations),
    [locations]
  );

  return (
    <>
      <h2>{t("Departures")}</h2>
      {departures?.map((departure) => (
        <Departure
          departureTime={departure.departure_time}
          arrivalTime={departure.arrival_time}
          location={locationNamesById[departure.origin_location_id]}
          price={departure.prices.total}
          currency={departure.prices.currency}
        />
      ))}
    </>
  );
}
