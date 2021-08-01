import axios from "axios";

export const getDepartures = async (
  poll = false,
  adult = 1,
  child = 0,
  senior = 0,
  departureDate = "",
  lang = "en",
  currency = "CAD"
) => {
  return await axios(`${process.env.REACT_APP_LOCALHOST}/api/departures/`, {
    params: {
      poll,
      adult,
      child,
      senior,
      departureDate,
      lang,
      currency,
    },
  }).then((response) => response.data);
};
