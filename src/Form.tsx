import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/lab/LoadingButton";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import formatISO from "date-fns/formatISO";
import type { City, Search } from "./types";

const QUEBEC = {
  name: "Quebec",
  geohash: "f2m673",
};

const MONTREAL = {
  name: "Montreal",
  geohash: "f25dvk",
};

const cities: City[] = [QUEBEC, MONTREAL];
interface Props {
  onSubmit(data: Search): void;
  loading?: boolean;
}

const DEFAULT_DATE = new Date();

export default function Form({ onSubmit, loading }: Props) {
  const { t } = useTranslation();
  const [origin, setOrigin] = useState<string>(QUEBEC.geohash);
  const [destination, setDestination] = useState<string>(MONTREAL.geohash);
  const [passengers, setPassengers] = useState<number>(1);
  const [date, setDate] = useState<Date | null>(DEFAULT_DATE);

  const _onSubmit = useCallback(() => {
    onSubmit({
      origin,
      destination,
      date: formatISO(date || DEFAULT_DATE, { representation: "date" }),
      passengers,
    });
  }, [date, destination, onSubmit, origin, passengers]);

  return (
    <Grid container spacing={2} marginBottom={4}>
      <Grid item xs={12} md={3}>
        <Autocomplete
          disablePortal
          id="origin"
          options={cities}
          renderInput={(params) => (
            <TextField {...params} label={t("Origin")} />
          )}
          getOptionLabel={(option) => option.name}
          defaultValue={QUEBEC}
          fullWidth
          onChange={(_event, value) => {
            setOrigin(value?.geohash || QUEBEC.geohash);
          }}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <Autocomplete
          disablePortal
          id="destination"
          options={cities}
          renderInput={(params) => (
            <TextField {...params} label={t("Destination")} />
          )}
          getOptionLabel={(option) => option.name}
          defaultValue={MONTREAL}
          onChange={(event, value) => {
            setDestination(value?.geohash || MONTREAL.geohash);
          }}
        />
      </Grid>
      <Grid item xs={12} md={2}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label={t("Date")}
            value={date}
            onChange={(date) => {
              setDate(date);
            }}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={12} md={2}>
        <TextField
          fullWidth
          id="passengers-number"
          label={t("Passengers")}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          value={passengers}
          onChange={(event) => {
            setPassengers(parseInt(event.target.value));
          }}
        />
      </Grid>
      <Grid item xs={12} md={2} alignSelf="center">
        <Button
          variant="contained"
          size="large"
          onClick={_onSubmit}
          fullWidth
          loading={loading}
          disabled={loading}
        >
          {t("Search")}
        </Button>
      </Grid>
    </Grid>
  );
}
