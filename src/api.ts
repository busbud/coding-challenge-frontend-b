import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASEURL || "https://napi.busbud.com",
  timeout: 1000,
  headers: {
    "X-Busbud-Token": process.env.REACT_APP_API_KEY || "",
    Accept:
      "application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/",
  },
});

export default api;
