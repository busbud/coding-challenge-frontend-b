import React from "react";
import { useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import geohashData from "../data/geohash.json";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    formControl: {
      margin: theme.spacing(2),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

type Data = {
  description?: string;
};

const requestHeaders = {
  Accept: process.env.BUSBUD_ACCEPT_HEADER ?? "",
  "X-Busbud-Token": process.env.BUSBUD_API_TOKEN ?? "",
};

const origin = geohashData.Québec;
const destination = geohashData.Montreal;
var iso = new Date().toISOString();
iso = iso.substring(0, iso.indexOf("T"));
const outboundDate = iso;

const SearchContainer = () => {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date("2021-08-02T21:00:00")
  );

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const { isLoading, error, data, isFetching } = useQuery<Data, Error>(
    ["repoData"],
    () =>
      fetch(
        `https://napi.busbud.com/x-departures/${origin}/${destination}/${outboundDate}`,
        {
          method: "get",
          headers: requestHeaders,
        }
      ).then((res) => res.json())
  );

  let message = "";

  if (isLoading) message = "Loading...";

  if (error) message = "An error has occurred: " + error.message;

  const classes = useStyles();

  const handleChange = () => {};

  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Typography component="div" style={{ height: "5vmin" }}>
          {isLoading || error
            ? message
            : isFetching
            ? "Updating..."
            : data?.description}
        </Typography>
        <div className={classes.root}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                Destination pickers are locked to allow limited geohash values
                only.
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <FormControl className={classes.formControl} disabled>
                <InputLabel htmlFor="name-native-disabled">Origin</InputLabel>
                <NativeSelect
                  value={"Montréal"}
                  onChange={handleChange}
                  inputProps={{
                    name: "Origin",
                    id: "name-native-disabled",
                  }}
                >
                  <optgroup label="Origin">
                    <option value="Montréal">Montréal</option>
                  </optgroup>
                </NativeSelect>
                <FormHelperText>Disabled</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl className={classes.formControl} disabled>
                <InputLabel htmlFor="name-native-disabled">
                  Destination
                </InputLabel>
                <NativeSelect
                  value={"Québec"}
                  onChange={handleChange}
                  inputProps={{
                    name: "Destination",
                    id: "name-native-disabled",
                  }}
                >
                  <optgroup label="Destination">
                    <option value="Québec">Québec</option>
                  </optgroup>
                </NativeSelect>
                <FormHelperText>Disabled</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Departure Date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
          </Grid>
        </div>
        <ReactQueryDevtools initialIsOpen />
      </Container>
    </React.Fragment>
  );
};

export default SearchContainer;
