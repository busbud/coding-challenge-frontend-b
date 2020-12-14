//We import axios for the data fetch
import axios from "axios";
//Token provided by Busbud
const token = "PARTNER_BaASYYHxTxuOINEOMWq5GA";

//Defining Redux Action
export default function FetchAction(date) {
  const request = axios.get(
    `https://napi.busbud.com/x-departures/f2m673/f25dvk/${date}`,
    {
      headers: {
        Accept:
          "application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/",
        "X-Busbud-Token": `${token}`,
      },
    }
  );

  const requestTwo = axios.get(
    `https://napi.busbud.com/x-departures/f2m673/f25dvk/${date}/poll`,
    {
      headers: {
        Accept:
          "application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/",
        "X-Busbud-Token": `${token}`,
      },
    }
  );


  return (dispatch) => {
    request.then(({ data }) => {
      dispatch({ type: "FETCH_ACTION", payload: data });
      //////
      requestTwo
        .then(({ data }) => {
          dispatch({ type: "FETCH_DEPARTURES", payload: data });
        })
        .catch((error) => {
          console.err(error);
        });
    });
  };
}
