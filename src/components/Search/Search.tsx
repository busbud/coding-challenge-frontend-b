import { useContext, useState } from "react";
import {
  Box,
  Paper,
  TextField,
  MenuItem,
  Typography
} from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import SearchIcon from "@mui/icons-material/Search";
// Local Components
import CitySelect from "./CitySelect";
// Used Utils
import { citiesAsRecord, processDepartures } from 'utils';
import api from "app/api";
import Store from "app/store";
import { setTimeout } from "timers";
import {
  Value,
  currencies,
  seatTypes,
  defaultOrigin,
  defaultDestination,
  defaultSeatType,
  defaultSeat,
} from "utils/defaultValues";

interface Props {
  originId?: string;
  destinationId?: string;
}

const Search = ({ originId, destinationId }: Props): JSX.Element => {
  const { cities, isLoading, toggleLoading, addSearch, setCities, setDepartures, setIsDirty } = useContext(Store);
  const [origin, setOrigin] = useState(defaultOrigin.value);
  const [destination, setDestination] = useState(defaultDestination.value);
  // While the excersie said a different date, the api doesn't allow for past dates. Assuming it was not updated
  const [date, setDate] = useState(new Date("2022-01-01"));
  const [currency, setCurrency] = useState("USD");
  const [seatType, setSeatType] = useState(defaultSeatType);
  const [seat, setSeat] = useState(defaultSeat);
  const [currentIndex, setCurrentIndex] = useState(0);

  const citiesAsArray = Object.keys(cities).map((city) => ({
    key: cities[city].name,
    value: cities[city].geohash,
  }));

  const options = [...citiesAsArray, defaultOrigin, defaultDestination];

  const originValue: Value =
    citiesAsArray.find((option) => option.key === originId) || defaultOrigin;
  const destinationValue: Value =
    citiesAsArray.find((option) => option.key === destinationId) ||
    defaultDestination;

  const selectSeatType = (event: { target: { value: string } }) => {
    setSeatType(event.target.value);
  };

  const selectCurrency = (event: { target: { value: string } }) => {
    setCurrency(event.target.value);
  };

  const selectSeat = (event: { target: { value: string } }) => {
    const seat = Number(event.target.value);
    if (!Number.isNaN(seat)) {
      setSeat(seat);
    }
  };

  const selectDate = (event: { target: { value: string } }) => {
    setDate(new Date(event.target.value));
  }

  const startSearch = async (index?: number) => {
    const filters = {
      adult: 0,
      child: 0,
      senior: 0,
      lang: 'en',
      currency: 'USD'
    };
    filters[seatType as 'adult' | 'child' | 'senior'] = seat;
    filters['currency'] = currency;

    // Trimming here as it doesn't accept (I'm guessing it should)
    const outbound_date = date.toISOString().split('T')[0];
    // All this logic should be moved to a wrapper "service", doing it here for sake of commodity to avoid
    // multiple (And therefore, confusing) contact points with Context
    toggleLoading(true);
    try {
      const search = await api.search({ origin, destination, outbound_date, filters, index });
      if (search) {
        addSearch(search);
        setCities(citiesAsRecord(search));
        setDepartures(processDepartures(search.departures, search.locations));
        if (!search.complete) {
          const newIndex = currentIndex + search.departures.length;
          setCurrentIndex(newIndex);
          // Using recursion for polling, although there are better ways to handle this (Like using `poll` library)
          setTimeout(() => {
            startSearch(newIndex)
          }, 2000)
        }
      }
    } catch (e) {
      console.log('There was an error', e);
    } finally {
      toggleLoading(false);
    }
  };

  return (
    <Paper
      sx={{
        ml: 1.5,
        mr: 1.5,
        mt: 3,
        p: 2,
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 1,
        gridTemplateRows: "auto",
        gridTemplateAreas: `
        "header header header header"
        "from from to to"
        "when seat type currency"
        ". . . search"`,
      }}
      variant="outlined"
    >
      <Typography variant="h5" sx={{ gridArea: "header" }}>Find your best option to travel!</Typography>
      <Box sx={{ gridArea: "from" }}>
        <CitySelect
          label="From"
          options={options}
          defaultValue={originValue}
          helperText="Origin"
          onChange={setOrigin}
        />
      </Box>
      <Box sx={{ gridArea: "to" }}>
        <CitySelect
          label="To"
          options={options}
          defaultValue={destinationValue}
          helperText="Destination"
          onChange={setDestination}
        />
      </Box>
      <Box sx={{ gridArea: "when" }}>
        <TextField
          id="date"
          label="When"
          type="date"
          onChange={selectDate}
          value={date}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ width: 1 }}
        />
      </Box>
      <Box sx={{ gridArea: "seat" }}>
        <TextField
          label="Seats for"
          value={seat}
          onChange={selectSeat}
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          sx={{ width: 1 }}
        />
      </Box>
      <Box sx={{ gridArea: "type" }}>
        <TextField
          id="seats"
          select
          label="Seat Type"
          value={seatType}
          onChange={selectSeatType}
          sx={{ width: 1 }}
        >
          {seatTypes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Box sx={{ gridArea: "currency" }}>
        <TextField
          id="outlined-select-currency"
          select
          label="Currency"
          value={currency}
          onChange={selectCurrency}
          sx={{ width: 1 }}
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Box sx={{ gridArea: "search" }}>
        <LoadingButton
          type="submit"
          onClick={async () => {
            await startSearch(currentIndex)
            setIsDirty(true);
          }}
          loading={isLoading}
          disableElevation
          variant="contained"
          sx={{ width: 1 }}
          loadingPosition="end"
          endIcon={<SearchIcon />}
        >
          Search
        </LoadingButton>
      </Box>
    </Paper>
  );
};

export default Search;
