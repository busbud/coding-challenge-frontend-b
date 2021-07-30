import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getDepartures } from "../../api/api";
import Spinner from "../../components/spinner.component";
import { Departures } from "../../interfaces/departures.interface";
import { convertPrice, parseTime } from "../../utils/utils";

const DeparturesView = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [pollingActive, setPollingActive] = useState<boolean>(false);
  const [departuresData, setDeparturesData] = useState<Departures>();

  const { t } = useTranslation();

  // Collect the Departures Data
  const getData = async (isPolling = false) => {
    const departuresData = await getDepartures(
      isPolling,
      1,
      0,
      0,
      localStorage.lang,
      "CAD"
    );
    let sortedDeparturesResult = departuresData;

    // If the Departures data is not complete, continue polling it to complete the results call.
    if (!departuresData?.complete) {
      executePolling();
      setPollingActive(true);
    } else if (pollingActive) {
      clearInterval(executePolling());
      setPollingActive(false);
    }

    // Sort the results by date/time of departure.
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

  // Execute polling every five seconds.
  const executePolling = () => {
    return setInterval(() => {
      getData(true);
    }, 5000);
  };

  useEffect(() => {
    setLoading(true);

    getData();
  }, []);

  return (
    <>
      {loading && <Spinner />}

      {!loading && departuresData?.departures.length > 0 && (
        <section className="departures">
          <h3 className="departures-result-title">
            {t("departures.from")} Québec City, Québec {t("departures.to")}{" "}
            Montréal, Québec {t("departures.on")} August 2, 2021
          </h3>
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
                <div className="departures-departure-select">
                  <button type="button" title={t("departures.select")}>
                    {t("departures.select")}
                  </button>
                </div>
              </div>
            );
          })}
        </section>
      )}

      {!loading && departuresData?.departures.length === 0 && (
        <div>Sorry. There are no results.</div>
      )}
    </>
  );
};

export default DeparturesView;
