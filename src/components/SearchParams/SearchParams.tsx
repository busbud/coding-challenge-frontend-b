import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  TApplicationState,
  TCityForSelection,
  TScheduleDepartureRequest,
} from "../../types";
import FormControl from "@material-ui/core/FormControl";
import { getScheduledDepartues } from "../../actions";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  container: {
    background: theme.palette.secondary.main,
    display: "flex",
    flexGrow: 1,
    justifyContent: "space-around",
    padding: theme.spacing(1),
  },
}));

// Linting disable due to all the handle definitions
// Ultimately, each one of the inputs should be abstracted out
// into its own component, but... lazy ;)
// TRB 11/15/2020
// eslint-disable-next-line max-lines-per-function
export const SearchParams = (): React.ReactElement<"div"> => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { i18n, t } = useTranslation();

  const defaultState: TScheduleDepartureRequest = {
    adultTickets: 1,
    childTickets: 0,
    currency: process.env.REACT_APP_DEFAULT_CURRENCY,
    destination: process.env.REACT_APP_BUSBUD_DEFAULT_DESTINATION,
    lang: i18n.language,
    origin: process.env.REACT_APP_BUSBUD_DEFAULT_ORIGIN,
    outboundDate: new Date().toISOString().split("T")[0],
    seniorTickets: 0,
  };
  const [searchState, setSearchState] = React.useState(defaultState);

  // Get the data required to populate the city dropdowns
  const cities: TCityForSelection[] = useSelector(
    (state: TApplicationState) => {
      return state.city.data;
    },
    shallowEqual
  );

  // We need to ensure than any changes to the language are picked up
  // here, otherwise the request submitted to the API might be
  // out of date
  React.useEffect(() => {
    searchState.lang = i18n.language;
    setSearchState(searchState);
  }, [i18n.language, setSearchState, searchState]);

  const handleChangeOrigin = React.useCallback(
    (event) => {
      searchState.origin = event.target.value;
      setSearchState(searchState);
    },
    [setSearchState, searchState]
  );

  const handleChangeDestination = React.useCallback(
    (event) => {
      searchState.destination = event.target.value;
      setSearchState(searchState);
    },
    [setSearchState, searchState]
  );

  const handleChangeAdultTickets = React.useCallback(
    (event) => {
      searchState.adultTickets = parseInt(event.target.value, 10);
      setSearchState(searchState);
    },
    [setSearchState, searchState]
  );
  const handleChangeChildTickets = React.useCallback(
    (event) => {
      searchState.childTickets = parseInt(event.target.value, 10);
      setSearchState(searchState);
    },
    [setSearchState, searchState]
  );

  const handleChangeSeniorTickets = React.useCallback(
    (event) => {
      searchState.seniorTickets = parseInt(event.target.value, 10);
      setSearchState(searchState);
    },
    [setSearchState, searchState]
  );

  const handleChangeOutboundDate = React.useCallback(
    (event) => {
      searchState.outboundDate = event.target.value;
      setSearchState(searchState);
    },
    [setSearchState, searchState]
  );

  const handleSearch = React.useCallback(() => {
    dispatch(getScheduledDepartues(searchState));
  }, [searchState, dispatch]);

  const cityOptions = cities.map((city) => {
    return (
      <option key={city.geohash} value={city.geohash}>
        {city.name}
      </option>
    );
  });
  // origin city

  const originCity = (
    <FormControl>
      <InputLabel htmlFor="age-native-simple">{t("origin")}</InputLabel>
      <Select native value={searchState.origin} onChange={handleChangeOrigin}>
        {cityOptions}
      </Select>
    </FormControl>
  );

  // destination city
  const destinationCity = (
    <FormControl>
      <InputLabel htmlFor="age-native-simple">{t("destination")}</InputLabel>
      <Select
        native
        value={searchState.destintion}
        onChange={handleChangeDestination}
      >
        {cityOptions}
      </Select>
    </FormControl>
  );

  // adult ticket qty
  const adultTickets = (
    <TextField
      defaultValue={searchState.adultTickets}
      id="standard-number"
      InputLabelProps={{
        shrink: true,
      }}
      InputProps={{
        inputProps: {
          max: 10,
          min: 0,
        },
      }}
      label={t("adultTickets")}
      type="number"
      onChange={handleChangeAdultTickets}
    />
  );

  // child ticket qty
  const childTickets = (
    <TextField
      defaultValue={searchState.childTickets}
      id="standard-number"
      InputLabelProps={{
        shrink: true,
      }}
      InputProps={{
        inputProps: {
          max: 10,
          min: 0,
        },
      }}
      label={t("childTickets")}
      type="number"
      onChange={handleChangeChildTickets}
    />
  );

  // senior ticket qty
  const seniorTickets = (
    <TextField
      defaultValue={searchState.seniorTickets}
      id="standard-number"
      InputLabelProps={{
        shrink: true,
      }}
      InputProps={{
        inputProps: {
          max: 10,
          min: 0,
        },
      }}
      label={t("seniorTickets")}
      type="number"
      onChange={handleChangeSeniorTickets}
    />
  );

  // date of departure
  const departureDate = (
    <TextField
      defaultValue={searchState.outboundDate}
      id="date"
      InputLabelProps={{
        shrink: true,
      }}
      label={t("departureDate")}
      type="date"
      onChange={handleChangeOutboundDate}
    />
  );

  return (
    <div className={classes.container}>
      {originCity}
      {destinationCity}
      {departureDate}
      {adultTickets}
      {childTickets}
      {seniorTickets}
      <IconButton aria-label={t("search")} onClick={handleSearch}>
        <SearchIcon />
      </IconButton>
    </div>
  );
};
