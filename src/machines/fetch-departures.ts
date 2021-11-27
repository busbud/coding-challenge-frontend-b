import { createMachine, assign } from "xstate";

interface Context {
  retries: number;
  origin?: string;
  destination?: string;
  adults?: number;
  date?: string;
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
      on: {
        POLL: "polling",
        REJECT: "failure",
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
