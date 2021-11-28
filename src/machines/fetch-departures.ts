import { createMachine, assign, DoneInvokeEvent } from "xstate";
import { getBaseQuery, getPollQuery } from "../libs/utils";
import { DeparturesResponse, Search } from "../types";
import api from "../libs/api";

interface Context {
  retries: number;
  origin?: string;
  destination?: string;
  adult?: number;
  date?: string;
  departures: DeparturesResponse["departures"];
  locations: DeparturesResponse["locations"];
}

type InitializeSearchEvent = {
  type: "INITIALIZE";
} & Search;

type RetryEvent = {
  type: "RETRY";
};

type RejectEvent = { type: "REJECT" };

type Event = InitializeSearchEvent | RetryEvent | RejectEvent;

const initializeSearch = {
  target: "initializing",
  actions: assign<Context, InitializeSearchEvent>({
    origin: (context, event) => event.origin,
    destination: (context, event) => event.destination,
    date: (context, event) => event.date,
    adult: (context, event) => event.adult,
  }),
};

const fetchInitialSearch = async (parameters: Search) => {
  const { url, params } = getBaseQuery(parameters);
  const { data } = await api.get<DeparturesResponse>(url, { params });
  return data;
};

const fetchPollSearch = async (parameters: Search & { index: number }) => {
  const { url, params } = getPollQuery(parameters);
  const { data } = await api.get<DeparturesResponse>(url, { params });
  return data;
};

const setResponseData = assign<Context, DoneInvokeEvent<DeparturesResponse>>({
  departures: (context, event) => event.data.departures,
  locations: (context, event) => event.data.locations,
});

const concatenateResponseData = assign<
  Context,
  DoneInvokeEvent<DeparturesResponse>
>({
  departures: (context, event) => [
    ...context.departures,
    ...event.data.departures,
  ],
  locations: (context, event) => [
    ...context.locations,
    ...event.data.locations,
  ],
});

const fetchDeparturesMachine = createMachine<Context, Event>({
  id: "fetch",
  initial: "idle",
  context: {
    retries: 0,
    departures: [],
    locations: [],
  },
  states: {
    idle: {
      on: {
        INITIALIZE: initializeSearch,
      },
    },
    initializing: {
      invoke: {
        id: "initializeSearch",
        src: (
          { origin = "", destination = "", date = "", adult = 1 }: Context,
          event: Event
        ) => fetchInitialSearch({ origin, destination, date, adult }),
        onDone: {
          target: "polling",
          actions: setResponseData,
        },
        onError: {
          target: "failure",
        },
      },
      on: {
        INITIALIZE: initializeSearch,
      },
    },
    polling: {
      on: {
        INITIALIZE: initializeSearch,
      },
      invoke: {
        id: "pollSearch",
        src: (
          {
            origin = "",
            destination = "",
            date = "",
            adult = 1,
            departures = [],
          }: Context,
          event: Event
        ) =>
          fetchPollSearch({
            origin,
            destination,
            date,
            adult,
            index: departures.length,
          }),
        onDone: [
          {
            target: "polling",
            cond: (
              context: Context,
              event: DoneInvokeEvent<DeparturesResponse>
            ) => !event.data.complete,
            actions: concatenateResponseData,
          },
          {
            target: "success",
            cond: (
              context: Context,
              event: DoneInvokeEvent<DeparturesResponse>
            ) => event.data.complete,
            actions: concatenateResponseData,
          },
        ],
        onError: {
          target: "polling",
        },
      },
    },
    success: {
      on: {
        INITIALIZE: initializeSearch,
      },
    },
    failure: {
      on: {
        INITIALIZE: initializeSearch,
        RETRY: {
          target: "initializing",
          actions: assign({
            retries: (context, event) => context.retries + 1,
          }),
        },
      },
    },
  },
});

export default fetchDeparturesMachine;
