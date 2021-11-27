import Alert from "@mui/material/Alert";
import LinearProgress from "@mui/material/LinearProgress";
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
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<number | null>(null);
  const [departures, setDepartures] = useState<
    DeparturesResponse["departures"]
  >([]);
  const [locations, setLocations] = useState<DeparturesResponse["locations"]>(
    []
  );

  useEffect(() => {
    async function fetchInitialSearch() {
      const { url, parameters: params } = getBaseQuery(props);
      setLoading(true);
      const { data, status } = await api.get<DeparturesResponse>(url, {
        params,
      });
      if (data) {
        setDepartures(data.departures);
        setLocations(data.locations);
      }
      setStatus(status);
      setLoading(false);
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
      {loading && <LinearProgress />}
      {status && status >= 400 && (
        <Alert
          severity="warning"
          onClose={() => {
            setStatus(null);
          }}
        >
          {t("An error occured during the request")}
        </Alert>
      )}
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
