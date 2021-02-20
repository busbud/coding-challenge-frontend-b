import { AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { getDepartureParams, getDepartures, getFestivalStartDate } from "./api";
import "./App.css";
import DepartureList, { AnimatedChild } from "./components/DepartureList";
import Loading from "./components/Loading";
import { Departure as DepartureType } from "./types";
const festivalStartDate = getFestivalStartDate();

type AppState = {
  hasSearched: boolean;
  shouldFetch: boolean;
  isLoading: boolean;
  isFinished: boolean;
  isError: boolean;
  resultDate: string;
};

const initialAppState: AppState = {
  hasSearched: false,
  shouldFetch: false,
  isLoading: false,
  isFinished: false,
  resultDate: "",
  isError: false,
};

function App() {
  const [
    { hasSearched, shouldFetch, isLoading, isFinished, isError, resultDate },
    update,
  ] = useReducer(
    (current: AppState, next: Partial<AppState>) => ({
      ...current,
      ...next,
    }),
    initialAppState
  );
  const nextParams = useRef<undefined | getDepartureParams>();
  const [departures, setDepartures] = useState<DepartureType[]>([]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const departureDate = data.get("departureDate");
    if (typeof departureDate === "string") {
      nextParams.current = { departureDate };
      update({
        shouldFetch: true,
        isLoading: true,
        isFinished: false,
        hasSearched: true,
        isError: false,
      });
    }
  }, []);

  useEffect(() => {
    async function startPolling() {
      async function runRequest() {
        try {
          const [data, next] = await getDepartures(nextParams.current);
          setDepartures((departures) => [...departures, ...data.departures]);
          nextParams.current = next;
          if (!next) {
            update({ isLoading: false, isFinished: true });
          }
        } catch {
          update({ isLoading: false, isError: true });
          setDepartures([]);
        }
      }

      if (!shouldFetch || !nextParams.current) {
        return;
      }

      update({
        shouldFetch: false,
        resultDate: nextParams.current.departureDate,
      });
      setDepartures([]);

      while (nextParams.current) {
        await Promise.all([runRequest(), throttle()]);
      }
    }

    startPolling();
  }, [shouldFetch]);

  return (
    <div className="App">
      <header className={!hasSearched ? "splash" : ""}>
        <div className="container">
          <h1>Osheaga Festival 2021</h1>
          <div className="search">
            <p>
              Headed to Osheaga this year?
              <br />
              Let us help you find your way there.
            </p>
            <form onSubmit={handleSubmit}>
              <label htmlFor="departureDate">Departure Date</label>
              <input
                type="date"
                id="departureDate"
                name="departureDate"
                defaultValue={festivalStartDate}
                onChange={(e) => {
                  nextParams.current = undefined;
                  update({ isLoading: false, isFinished: false });
                }}
              />
              <button
                type="submit"
                disabled={isLoading || isFinished}
                aria-label="Search"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </header>
      <div className="results">
        <div className="container">
          <AnimatePresence exitBeforeEnter={true}>
            <AnimatedChild key="departures-list" showing={!!departures.length}>
              <DepartureList departures={departures} resultDate={resultDate} />
            </AnimatedChild>
            <AnimatedChild
              key="no-departures"
              showing={!departures.length && isFinished}
            >
              No Departures Found
            </AnimatedChild>
            <AnimatedChild key="error" showing={isError}>
              Sorry, an error occurred. Please try searching again.
            </AnimatedChild>
          </AnimatePresence>
          {isLoading && <Loading />}
        </div>
      </div>
    </div>
  );
}

export default App;

const THROTTLE_TIME = 3000;
function throttle() {
  return new Promise((resolve) => setTimeout(resolve, THROTTLE_TIME));
}
