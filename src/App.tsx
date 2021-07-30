import { useEffect, useState } from "react";
import { getDepartures } from "./api/api";
import Spinner from "./components/spinner.component";
import { Departures } from "./interfaces/departures.interface";
import { convertPrice, parseTime } from "./utils/utils";

const App = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [pollingActive, setPollingActive] = useState<boolean>(false);
  const [departuresData, setDeparturesData] = useState<Departures>();

  const getData = async (isPolling = false) => {
    const departuresData = await getDepartures(isPolling);
    let sortedDeparturesResult = departuresData;
    console.log(departuresData?.complete);

    if (!departuresData?.complete) {
      executePolling();
      setPollingActive(true);
    } else if (pollingActive) {
      clearInterval(executePolling());
      setPollingActive(false);
    }

    sortedDeparturesResult.departures = departuresData?.departures.sort(
      (a, b) => {
        return a.departure_time < b.departure_time
          ? -1
          : a.departure_time > b.departure_time
          ? 1
          : 0;
      }
    );

    setDeparturesData(sortedDeparturesResult ?? []);
    setLoading(false);
  };

  const executePolling = () => {
    return setTimeout(() => {
      console.log("poll hit.");

      getData(true);
    }, 5000);
  };

  useEffect(() => {
    setLoading(true);

    getData();
  }, []);

  useEffect(() => {
    console.log(departuresData);
  }, [departuresData]);

  return (
    <div className="App">
      <nav className="nav">
        <div className="nav-container">
          <h1>BusBud</h1>
        </div>
      </nav>
      {loading && <Spinner />}

      {!loading && departuresData?.departures.length > 0 && (
        <article className="departures">
          {departuresData?.departures.map((departure, key) => {
            const {
              departure_time,
              arrival_time,
              prices: { total },
              trip_stops,
              origin_location_id,
              destination_location_id,
            } = departure;

            const origin = trip_stops.find((stop) => {
              return stop.location_id === origin_location_id;
            });

            const destination = trip_stops.find((stop) => {
              return stop.location_id === destination_location_id;
            });

            return (
              <div key={key} className="departures-departure">
                <div className="departures-departure-travel-info">
                  <div className="departures-departure-origin">
                    <span className="departures-departure-origin-name">
                      {origin.name}
                    </span>
                    <span className="departures-departure-origin-time">
                      {parseTime(departure_time)}
                    </span>
                  </div>
                  <div className="departures-departure-arrow">&#10230;</div>
                  <div className="departures-departure-destination">
                    <span className="departures-departure-destination-name">
                      {destination.name}
                    </span>
                    <span className="departures-departure-destination-time">
                      {parseTime(arrival_time)}
                    </span>
                  </div>
                </div>
                <div className="departures-departure-price">
                  {convertPrice(total)}
                </div>
              </div>
            );
          })}
        </article>
      )}

      {!loading && departuresData?.departures.length === 0 && (
        <div>NO Results.</div>
      )}
    </div>
  );
};

export default App;
