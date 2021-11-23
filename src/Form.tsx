import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import { ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";
import { City } from "./types";

const cities: City[] = [
  {
    name: "Quebec",
    geohash: "f2m673",
  },
  {
    name: "Montreal",
    geohash: "f25dvk",
  },
];

export default function Form() {
  const { t } = useTranslation();
  const [date, setDate] = useState<Date | null>(new Date(2021, 7, 2));

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <Autocomplete
          disablePortal
          id="departure"
          options={cities}
          renderInput={(params) => (
            <TextField {...params} label={t("Departure")} />
          )}
          getOptionLabel={(option) => option.name}
          defaultValue={{
            name: "Quebec",
            geohash: "f2m673",
          }}
          fullWidth
        />
      </Grid>
      <Grid item xs={3}>
        <Autocomplete
          disablePortal
          id="arrival"
          options={cities}
          renderInput={(params) => (
            <TextField {...params} label={t("Arrival")} />
          )}
          getOptionLabel={(option) => option.name}
          defaultValue={{
            name: "Montreal",
            geohash: "f25dvk",
          }}
        />
      </Grid>
      <Grid item xs={2}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label={t("Date")}
            value={date}
            onChange={(date) => {
              setDate(date);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={2}>
        <TextField
          id="passengers-number"
          label={t("Passengers")}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          defaultValue={1}
        />
      </Grid>
      <Grid item xs={2}>
        <Button variant="contained" size="large">
          {t("Search")}
        </Button>
      </Grid>
    </Grid>
  );
}
