import axios from "axios";

export default axios.create({
  baseURL: "https://napi.busbud.com/",
  headers: {
    Accept:
      "application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/",
    "X-Busbud-Token": "PARTNER_AHm3M6clSAOoyJg4KyCg7w"
  }
});
