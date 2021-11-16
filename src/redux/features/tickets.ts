import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getDeparturesFromQuebecToMontreal,
  getDeparturesFromQuebecToMontrealPoll,
} from "../../lib/busbud";
import { AppThunk, RootState } from "../store";
import { TicketsDTOOutput } from "../../lib/types/busbud";

interface TicketsState {
  loading: boolean;
  tickets: TicketsDTOOutput["departures"];
  locations: TicketsDTOOutput["locations"];
  cities: TicketsDTOOutput["cities"];
  complete: boolean;
  fetchedOneTime: boolean;
  error?: string;
}

const initialState: TicketsState = {
  loading: false,
  tickets: [],
  locations: [],
  cities: [],
  complete: false,
  fetchedOneTime: false,
};

const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    startTicketsFetching: (state) => ({
      ...state,
      loading: true,
    }),
    stopTicketsFetching: (state) => ({
      ...state,
      loading: false,
      fetchedOneTime: true,
    }),
    updateTickets: (
      state,
      { payload: { tickets } }: PayloadAction<Pick<TicketsState, "tickets">>
    ) => ({
      ...state,
      tickets: [...state.tickets, ...tickets],
    }),
    updateLocations: (
      state,
      { payload: { locations } }: PayloadAction<Pick<TicketsState, "locations">>
    ) => ({
      ...state,
      locations: [...state.locations, ...locations],
    }),
    updateCities: (
      state,
      { payload: { cities } }: PayloadAction<Pick<TicketsState, "cities">>
    ) => ({
      ...state,
      cities: [...state.cities, ...cities],
    }),
    updateComplete: (
      state,
      { payload: { complete } }: PayloadAction<Pick<TicketsState, "complete">>
    ) => ({
      ...state,
      complete,
    }),
    setError: (state, { payload }: PayloadAction<string>) => ({
      ...state,
      error: payload,
    }),
    cleanTicketsReducer: () => ({
      ...initialState,
    }),
  },
});

export const {
  startTicketsFetching,
  stopTicketsFetching,
  updateTickets,
  updateLocations,
  updateCities,
  updateComplete,
  cleanTicketsReducer,
} = ticketsSlice.actions;

export const fetchTicketsPoll = (): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(startTicketsFetching());
    const {
      search,
      tickets: { tickets },
    } = getState();
    const {
      data: { complete, departures, locations },
    } = await getDeparturesFromQuebecToMontrealPoll(search, tickets.length);
    dispatch(updateTickets({ tickets: departures }));
    dispatch(updateLocations({ locations }));
    dispatch(updateComplete({ complete }));
    if (complete) {
      dispatch(stopTicketsFetching());
    } else {
      dispatch(fetchTicketsPoll());
    }
  } catch (e) {
    dispatch(stopTicketsFetching());
  }
};

export const fetchTickets = (): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(cleanTicketsReducer());
    dispatch(startTicketsFetching());
    const { search } = getState();
    const {
      data: { complete, departures, locations, cities },
    } = await getDeparturesFromQuebecToMontreal(search);
    dispatch(updateTickets({ tickets: departures }));
    dispatch(updateLocations({ locations }));
    dispatch(updateCities({ cities }));
    dispatch(updateComplete({ complete }));
    if (complete) {
      dispatch(stopTicketsFetching());
    } else {
      dispatch(fetchTicketsPoll());
    }
  } catch (e) {
    dispatch(stopTicketsFetching());
  }
};

export const ticketsSelector = ({
  tickets: { tickets },
}: RootState): TicketsState["tickets"] => tickets;

export default ticketsSlice.reducer;
