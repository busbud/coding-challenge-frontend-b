import { Suspense, lazy, useEffect, useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";
import { getDepartures } from "../../api/api";
import { Departures } from "../../interfaces/departures.interface";
import { BusbudContext } from "../../interfaces/context.interface";
import { dateTimeFormat, handleNavClick } from "../../utils/utils";

const DepartureCard = lazy(
  () => import("../../components/DepartureCard/departureCard.component")
);
const Spinner = lazy(
  () => import("../../components/Spinner/spinner.component")
);

const DeparturesView = () => {
  const history = useHistory();
  const { adult, senior, child, departureDate } = useLocation()?.state;
  const { currencyValue } = useContext(BusbudContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pollingActive, setPollingActive] = useState<boolean>(false);
  const [departuresData, setDeparturesData] = useState<Departures>();

  const { t } = useTranslation();

  // Collect the Departures Data
  const getData = async (isPolling = false) => {
    const departuresData = await getDepartures(
      isPolling,
      adult,
      senior,
      child,
      departureDate,
      localStorage.lang,
      currencyValue
    );
    let sortedDeparturesResult = departuresData;

    // If the Departures data is not complete, continue polling it to complete the results call.
    if (!departuresData?.complete) {
      getData(true);
      setPollingActive(true);
    } else if (pollingActive) {
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

    // Remove the Spinner and either display pre-polled data or the no data screen.
    if (
      departuresData?.departures.length > 0 ||
      (departuresData?.departures.length === 0 && departuresData?.complete)
    ) {
      setIsLoading(false);
    }
  };

  // When the currency is changed, update the data with the newly-selected currency.
  useEffect(() => {
    setIsLoading(true);

    getData();
  }, [currencyValue]);

  useEffect(() => {
    setIsLoading(true);

    getData();
  }, []);

  return (
    <Suspense fallback={<span>Loading...</span>}>
      {isLoading && <Spinner position="center" />}

      {!isLoading && departuresData?.departures.length > 0 && (
        <section className="departures">
          <button
            className="departures-back"
            type="button"
            title={t("departures.back")}
            onClick={handleNavClick("/", history)}
          >
            &#8592; {t("departures.back")}
          </button>
          <div className="departures-result-title-container">
            <h3 className="departures-result-title">
              {t("departures.from")} Québec City, Québec {t("departures.to")}{" "}
              Montréal, Québec {t("departures.on")}{" "}
              {dateTimeFormat(departureDate)}
            </h3>
            {!departuresData?.complete && <Spinner size="small" />}
          </div>

          {departuresData?.departures.map((departure, key) => (
            <DepartureCard data={departure} key={key} />
          ))}
        </section>
      )}

      {!isLoading && departuresData?.departures.length === 0 && (
        <div className="departures-no-data">
          <span>{t("departures.noResults")}</span>

          <button
            className="departures-back"
            type="button"
            title={t("departures.back")}
            onClick={handleNavClick("/", history)}
          >
            &#8592; {t("departures.back")}
          </button>
        </div>
      )}
    </Suspense>
  );
};

export default DeparturesView;
