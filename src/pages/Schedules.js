import { useEffect, useState, useContext } from "react";
import classes from "../style/Schedules.module.scss";
import { SpinnerContext } from "../contexts/SpinnerContextProvider";
import { FormattedMessage } from "react-intl";
import Tickets from "../components/Tickets";

function Schedules({ lang }) {
  const { showSpinner } = useContext(SpinnerContext);
  const [data, setData] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchData(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  const fetchData = (isPoll) => {
    const pollTimer = setTimeout(
      async () => {
        clearTimeout(pollTimer);
        try {
          showSpinner(true);
          const pollParam = isPoll ? "/poll" : "";
          const indexString = isPoll
            ? `&index=${data?.departures?.length || 0}`
            : "";

          let response = await fetch(
            `https://napi.busbud.com/x-departures/f2m673/f25dvk/2022-08-02${pollParam}?adult=1&lang=${lang}${indexString}`,
            {
              method: "GET",
              headers: {
                Accept:
                  "application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/",
                "X-Busbud-Token": process.env.REACT_APP_API_KEY,
              },
            }
          );
          const result = await response.json();
          if ((await response.status) === 200) {
            if (result.complete) {
              setData(result);
            } else {
              fetchData(true);
            }
          } else {
            setError(true);
          }
          showSpinner(false);
        } catch (error) {
          setError(true);
          showSpinner(false);
        }
      },
      isPoll ? 3000 : 0
    );
  };

  return (
    <div>
      {error ? (
        <div className={classes.errMsg}>
          <FormattedMessage id="errMsg" />
        </div>
      ) : data?.departures?.length === 0 ? (
        <div className={classes.errMsg}>
          <FormattedMessage id="noRecords" />
        </div>
      ) : (
        data?.departures?.map((depValu, i) => (
          <div key={i}>
            <Tickets
              departures={depValu}
              locations={data.locations}
              operators={data.operators}
              cityOriginId={data.origin_city_id}
              cityDestId={data.destination_city_id}
              cities={data.cities}
            />
          </div>
        ))
      )}
    </div>
  );
}

export default Schedules;
