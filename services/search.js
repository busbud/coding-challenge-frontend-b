const axios = require("axios");
const { acceptHeader, token, apiBase } = require("../types");

const initializeSearch = async (req, res) => {
  const headers = {
    Accept: acceptHeader,
    "X-Busbud-Token": token,
  };
  const params = req.query;

  try {
    const response = await axios({
      method: "get",
      url: `${apiBase}x-departures/${req.params.origin}/${req.params.destination}/${req.params.outbound_date}`,
      params,
      headers,
    });
    const data = response.data;

    if (data.complete === true) {
      res.send(data);
    } else {
      res.send(null);
    }
  } catch (error) {
    console.error(error);
    res.send(null);
  }
};

const searchPolling = async (req, res) => {
  const headers = {
    Accept: acceptHeader,
    "X-Busbud-Token": token,
  };
  const params = req.query;
  const response = await axios({
    method: "get",
    url: `${apiBase}x-departures/${req.params.origin}/${req.params.destination}/${req.params.outbound_date}/poll`,
    params,
    headers,
  });
  const data = response.data;

  res.send(data);
};

module.exports = {
  initializeSearch,
  searchPolling,
};
