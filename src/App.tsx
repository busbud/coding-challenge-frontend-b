import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./App.css";
import { getDepartureParams, getDepartures, getFestivalStartDate } from "./api";
import { Departure as DepartureType, Location } from "./types";
import DepartureList from "./components/DepartureList";
import Loading from "./components/Loading";
import Locations from "./components/Locations";
import NoDepartures from "./components/NoDepartures";
import { wait } from "./utils";
import ErrorPage from "./components/ErrorPage";

const festivalStartDate = getFestivalStartDate();

type AppState = {
  splashHidden: boolean;
  isPolling: boolean;
  isError: boolean;
  resultDate: string;
  canSearch: boolean;
};

const initialAppState: AppState = {
  splashHidden: false,
  isPolling: false,
  resultDate: "",
  isError: false,
  canSearch: true,
};

const throttle = 3000;

function App() {
  const [
    { splashHidden, isPolling, canSearch, isError, resultDate },
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
  const [locations, setLocations] = useState<Location[]>([]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const departureDate = data.get("departureDate");
    if (typeof departureDate === "string") {
      nextParams.current = { departureDate };
      update({
        splashHidden: true,
        isPolling: true,
        canSearch: false,
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
          setLocations((locations) => [...locations, ...data.locations]);

          nextParams.current = next;
          if (!nextParams.current) {
            update({ isPolling: false });
          }
        } catch {
          update({ isPolling: false, isError: true, resultDate: undefined });
          setDepartures([]);
          setLocations([]);
        }
      }

      if (!isPolling || !nextParams.current) {
        return;
      }

      update({ resultDate: nextParams.current.departureDate });
      setDepartures([]);
      setLocations([]);
      while (nextParams.current) {
        await Promise.all([runRequest(), wait(throttle)]);
      }
    }

    startPolling();
  }, [isPolling]);

  return (
    <Locations value={locations}>
      <div className="App">
        <header className={!splashHidden ? "splash" : ""}>
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
                  onChange={(e) => update({ canSearch: true })}
                />
                <button type="submit" disabled={!canSearch} aria-label="Search">
                  Search
                </button>
              </form>
            </div>
          </div>
        </header>
        <div className="results">
          {isPolling && <Loading />}
          <div className="container">
            <AnimatePresence exitBeforeEnter={true}>
              {!departures.length && !isPolling && !!resultDate && (
                <motion.div
                  key="no-departures"
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={{
                    hidden: { opacity: 0 },
                    show: { opacity: 1 },
                  }}
                >
                  <NoDepartures resultDate={resultDate} />
                </motion.div>
              )}
              {isError && (
                <motion.div
                  key="no-departures"
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={{
                    hidden: { opacity: 0 },
                    show: { opacity: 1 },
                  }}
                >
                  <ErrorPage />
                </motion.div>
              )}
              {!!resultDate && !!departures.length && (
                <motion.div
                  key="no-departures"
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={{
                    hidden: { opacity: 0 },
                    show: { opacity: 1 },
                  }}
                >
                  <DepartureList
                    departures={departures}
                    resultDate={resultDate}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Locations>
  );
}

export default App;
