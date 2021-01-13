import React, { useEffect, useState } from "react";
import { injectIntl, FormattedMessage } from "react-intl";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getDepartures } from "../../services/getDepartures";
import SearchResult from "./SearchResult";

function SearchResults(props) {
  const [data, setData] = useState(null);
  const lang = props.intl.locale;

  useEffect(() => {
    let mounted = true;
    getDepartures(lang).then((result) => {
      if (mounted) {
        setData(result);
      }
    });
    return () => (mounted = false);
  }, [lang]);

  if (data) {
    if (data.departures && data.departures.length > 0) {
      let locations = new Map();
      data.locations.map(
        (location) => (locations[location.id] = location.name)
      );
      let cities = [];
      data.cities.map((city) => cities.push(city.name));
      let operatorLogos = new Map();
      let operatorNames = new Map();
      data.operators.forEach(function (operator) {
        operatorLogos[operator.id] = operator.logo_url.split("?")[0];
        operatorNames[operator.id] = operator.name;
      });
      return (
        <>
          {data.departures.map((departure) => (
            <SearchResult
              duration={departure.duration}
              originDepot={locations[departure.origin_location_id]}
              originCity={cities[0]}
              departTime={new Date(
                departure.departure_time
              ).toLocaleDateString(lang, {
                hour: "2-digit",
                minute: "2-digit",
              })}
              destinationDepot={locations[departure.destination_location_id]}
              destinationCity={cities[1]}
              arriveTime={new Date(
                departure.arrival_time
              ).toLocaleDateString(lang, {
                hour: "2-digit",
                minute: "2-digit",
              })}
              price={departure.prices.total}
              operatorLogo={operatorLogos[departure.operator_id]}
              operatorName={operatorNames[departure.operator_id]}
            />
          ))}
        </>
      );
    } else {
      return (
        <h2>
          <FormattedMessage id="no.results" />
        </h2>
      );
    }
  } else {
    return <CircularProgress />;
  }
}

export default injectIntl(SearchResults);
