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
interface StartSearchingAction {
  type: "START_SEARCHING";
}
interface DoneSearchingAction {
  type: "DONE_SEARCHING";
}
interface SetErrorAction {
  type: "SET_ERROR";
  message: string;
}
interface ClearErrorAction {
  type: "CLEAR_ERROR";
}
interface SortByPriceAction {
  type: "SORT_BY_PRICE";
}
interface SortByTimeAction {
  type: "SORT_BY_TIME";
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

export function startSearching(): StartSearchingAction {
  return {
    type: "START_SEARCHING"
  };
}

export function doneSearching(): DoneSearchingAction {
  return {
    type: "DONE_SEARCHING"
  };
}

export function setError(message: string): SetErrorAction {
  return {
    type: "SET_ERROR",
    message
  };
}

export function clearError(): ClearErrorAction {
  return {
    type: "CLEAR_ERROR"
  };
}

export function sortByPrice(): SortByPriceAction {
  return {
    type: "SORT_BY_PRICE"
  };
}

export function sortByTime(): SortByTimeAction {
  return {
    type: "SORT_BY_TIME"
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
        .then(response => response.json())
        .catch(() =>
          dispatch(setError("Something went wrong! Please try again."))
        )
        .then(json => {
          dispatch(clearError());
          if (
            json.departures &&
            json.departures.length > 0 &&
            json.locations &&
            json.locations.length > 0 &&
            json.operators &&
            json.operators.length > 0 &&
            json.cities &&
            json.cities.length > 0
          ) {
            dispatch(
              loadDepartures(
                json.departures,
                json.locations,
                json.operators,
                json.cities,
                polling
              )
            );
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
          } else {
            // Sometimes a response doesn't have all the data we want, it seems.
            // Because we're relying on all the data being available when we're filtering
            // Operators, Cities, etc, in the DeparturesList component,
            // it's important that all data is in the response. If not, we'll just
            // try again! :-)
            dispatch(fetchDepartures(origin, destination, outboundDate, false));
          }
        })
        .catch(() => {
          dispatch(
            setError("It's taking slightly longer than usual, please hang on.")
          );
          dispatch(fetchDepartures(origin, destination, outboundDate, false));
        });
    }
  };
}
