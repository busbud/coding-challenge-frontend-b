import Alert from "@mui/material/Alert";
import LinearProgress from "@mui/material/LinearProgress";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import api from "../libs/api";
import Departure from "./Departure";
import type { DeparturesResponse } from "../types";
import { getBaseQuery, getLocationNamesById } from "../libs/utils";

interface DeparturesProps {
  origin: string;
  destination: string;
  date: string;
  passengers: number;
}

export default function Departures(props: DeparturesProps) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
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
      try {
        const { data, status } = await api.get<DeparturesResponse>(url, {
          params,
        });
        if (data) {
          setDepartures(data.departures);
          setLocations(data.locations);
        }
        setHasError(status >= 400);
      } finally {
        setLoading(false);
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
      {loading && <LinearProgress />}
      {hasError && (
        <Alert
          severity="warning"
          onClose={() => {
            setHasError(false);
          }}
        >
          {t("An error occured during the request. Please retry again.")}
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
