import axios from "axios";

export const getDepartures = async (poll = false) => {
  return await axios(`${process.env.REACT_APP_LOCALHOST}/api/departures/`, {
    params: {
      poll,
    },
  }).then((response) => response.data);
};
