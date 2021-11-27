import LinearProgress from "@mui/material/LinearProgress";
import { useMemo, useState } from "react";
import Departure from "./Departure";
import { getLocationNamesById } from "../libs/utils";
import { DeparturesResponse } from "../types";
import Alert from "@mui/material/Alert";
import { useTranslation } from "react-i18next";

interface DeparturesProps {
  departures: DeparturesResponse["departures"];
  locations: DeparturesResponse["locations"];
  loading?: boolean;
  hasError?: boolean;
}

export default function Departures(props: DeparturesProps) {
  const { t } = useTranslation();
  const [displayAlert, setDisplayAlert] = useState(true);
  const locationNamesById = useMemo(
    () => getLocationNamesById(props.locations),
    [props.locations]
  );

  return (
    <>
      {props.loading && <LinearProgress />}
      {props.hasError && displayAlert && (
        <Alert
          severity="warning"
          onClose={() => {
            setDisplayAlert(false);
          }}
        >
          {t("An error occured during the request. Please retry again.")}
        </Alert>
      )}
      {props.departures?.map((departure) => (
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
