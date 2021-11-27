import { createMachine, assign, DoneInvokeEvent } from "xstate";
import { getBaseQuery, getPollQuery } from "../libs/utils";
import { DeparturesResponse, Search } from "../types";
import api from "../libs/api";

interface Context {
  retries: number;
  origin?: string;
  destination?: string;
  adults?: number;
  date?: string;
  departures: DeparturesResponse["departures"];
  locations: DeparturesResponse["locations"];
}

type InitializeEvent = {
  type: "INITIALIZE";
  origin: string;
  destination: string;
  adults: number;
  date: string;
};

type RetryEvent = {
  type: "RETRY";
};

type RejectEvent = { type: "REJECT" };

type Event = InitializeEvent | RetryEvent | RejectEvent;

const initializeSearch = {
  target: "initializing",
  actions: assign<Context, InitializeEvent>({
    origin: (context, event) => event.origin,
    destination: (context, event) => event.destination,
    date: (context, event) => event.date,
    adults: (context, event) => event.adults,
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
          {
            origin = "",
            destination = "",
            date = "",
            adults: passengers = 1,
          }: Context,
          event: Event
        ) => fetchInitialSearch({ origin, destination, date, passengers }),
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
            adults: passengers = 1,
            departures = [],
          }: Context,
          event: Event
        ) =>
          fetchPollSearch({
            origin,
            destination,
            date,
            passengers,
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
