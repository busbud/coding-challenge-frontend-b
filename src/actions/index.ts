import IDeparture from "../types/departure";
import IOperator from "../types/operator";
import ILocation from "../types/location";
import ICity from "../types/city";

interface UpdateLanguageAction {
  type: "UPDATE_LANGUAGE";
  language: string;
}
interface loadDeparturesAction {
  type: "LOAD_DEPARTURES";
  departures: Array<IDeparture>;
  locations: Array<ILocation>;
  operators: Array<IOperator>;
  cities: Array<ICity>;
  polling: boolean;
}
export function updateLanguage(language: string): UpdateLanguageAction {
  return { type: "UPDATE_LANGUAGE", language };
}

export function loadDepartures(
  departures: Array<IDeparture>,
  locations: Array<ILocation>,
  operators: Array<IOperator>,
  cities: Array<ICity>,
  polling: boolean
): loadDeparturesAction {
  return {
    type: "LOAD_DEPARTURES",
    departures,
    locations,
    operators,
    cities,
    polling
  };
}

function startSearching() {
  return {
    type: "START_SEARCHING"
  };
}

function doneSearching() {
  return {
    type: "DONE_SEARCHING"
  };
}

export function fetchDepartures(
  origin: string,
  destination: string,
  outboundDate: string,
  polling: boolean,
  index?: number
) {
  return function(dispatch: any) {
    const token = process.env.REACT_APP_BUSBUD_TOKEN;
    if (!token) {
      console.log("No BUSBUD_TOKEN found");
    } else {
      if (!polling) {
        dispatch(startSearching());
      }
      return fetch(
        `https://napi.busbud.com/x-departures/${origin}/${destination}/${outboundDate}${
          polling ? `/poll?index=${index}` : ""
        }`,
        {
          method: "GET",
          headers: {
            Accept:
              "application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/",
            "X-Busbud-Token": token
          }
        }
      )
        .then(
          response => response.json(),
          error => window.console.log("error: ", error)
        )
        .then(json => {
          if (!json.errors) {
            if (json.departures && json.departures.length > 0) {
              dispatch(
                loadDepartures(
                  json.departures,
                  json.locations,
                  json.operators,
                  json.cities,
                  polling
                )
              );
            }
            if (json.complete) {
              dispatch(doneSearching());
            } else {
              // We only want to keep polling if !complete
              // If we would want to poll continously, we could remove the else {}
              window.setTimeout(
                () =>
                  dispatch(
                    fetchDepartures(
                      origin,
                      destination,
                      outboundDate,
                      true,
                      index + json.departures.length
                    )
                  ),
                2000
              );
            }
          }
        });
    }
  };
}
