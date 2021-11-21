import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import { ReactChildren, ReactNode, useState } from "react";
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

function FormItem({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        marginBottom: 5,
      }}
    >
      {children}
    </Box>
  );
}

export default function Form() {
  const { t } = useTranslation();
  const [date, setDate] = useState<Date | null>(new Date(2021, 7, 2));

  return (
    <Grid container>
      <Grid item xs={4}>
        <FormItem>
          <Autocomplete
            disablePortal
            id="departure"
            options={cities}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label={t("Departure")} />
            )}
            getOptionLabel={(option) => option.name}
            defaultValue={{
              name: "Quebec",
              geohash: "f2m673",
            }}
          />
        </FormItem>
      </Grid>
      <Grid item xs={4}>
        <FormItem>
          <Autocomplete
            disablePortal
            id="arrival"
            options={cities}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label={t("Arrival")} />
            )}
            getOptionLabel={(option) => option.name}
            defaultValue={{
              name: "Montreal",
              geohash: "f25dvk",
            }}
          />
        </FormItem>
      </Grid>
      <Grid item xs={4}></Grid>
      <Grid item xs={4}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <FormItem>
            <DatePicker
              label={t("Date")}
              value={date}
              onChange={(date) => {
                setDate(date);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </FormItem>
        </LocalizationProvider>
      </Grid>
      <Grid item xs={4}>
        <FormItem>
          <TextField
            id="passengers-number"
            label={t("Passengers")}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            defaultValue={1}
          />
        </FormItem>
      </Grid>
      <Button variant="contained">{t("Search")}</Button>
    </Grid>
  );
}
