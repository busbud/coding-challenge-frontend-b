import { createMachine, assign, DoneInvokeEvent } from "xstate";
import { getBaseQuery } from "../libs/utils";
import { DeparturesResponse, Search } from "../types";
import api from "../libs/api";

const initSearch = async (parameters: Search) => {
  const { url, parameters: params } = getBaseQuery(parameters);
  const { data } = await api.get<DeparturesResponse>(url, { params });
  return data;
};

interface Context {
  retries: number;
  origin?: string;
  destination?: string;
  adults?: number;
  date?: string;
  departures: DeparturesResponse["departures"];
  locations: DeparturesResponse["locations"];
}

type Event =
  | {
      type: "INITIALIZE";
      origin: string;
      destination: string;
      adults: number;
      date: string;
    }
  | {
      type: "POLL";
    }
  | { type: "TIMER" }
  | { type: "RETRY" }
  | { type: "REJECT" }
  | { type: "COMPLETE" };

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
        INITIALIZE: {
          target: "initializing",
          actions: assign({
            origin: (context, event) => event.origin,
            destination: (context, event) => event.destination,
            date: (context, event) => event.date,
            adults: (context, event) => event.adults,
          }),
        },
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
        ) => initSearch({ origin, destination, date, passengers }),
        onDone: {
          target: "polling",
          actions: assign({
            departures: (context, event: DoneInvokeEvent<DeparturesResponse>) =>
              event.data.departures,
            locations: (context, event: DoneInvokeEvent<DeparturesResponse>) =>
              event.data.locations,
          }),
        },
        onError: {
          target: "failure",
        },
      },
    },
    polling: {
      on: {
        TIMER: "polling",
        COMPLETE: "success",
      },
    },
    success: {
      type: "final",
    },
    failure: {
      on: {
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
