import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import api from "./api";
import type { DeparturesResponse } from "./types";

interface DeparturesProps {
  origin: string;
  destination: string;
  date: string;
  passengers: number;
}

function getBaseQuery(parameters: DeparturesProps) {
  return {
    url: `/x-departures/${parameters.origin}/${parameters.destination}/${parameters.date}`,
    parameters: {
      adult: parameters.passengers,
    },
  };
}

function getPollQuery(parameters: DeparturesProps) {
  const baseQuery = getBaseQuery(parameters);
  return {
    url: `${baseQuery.url}/poll`,
    parameters: {
      adult: parameters.passengers,
    },
  };
}

export default function Departures(props: DeparturesProps) {
  const { t } = useTranslation();
  const [departures, setDepartures] = useState<
    DeparturesResponse["departures"]
  >([]);

  useEffect(() => {
    async function fetchInitialSearch() {
      const { url, parameters: params } = getBaseQuery(props);
      const { data } = await api.get<DeparturesResponse>(url, { params });
      if (data) {
        setDepartures(data.departures);
      }
    }
    fetchInitialSearch();
  }, [props]);

  return (
    <>
      <h2>{t("Departures")}</h2>
      {departures?.map((departure) => departure.departure_time)}
    </>
  );
}
