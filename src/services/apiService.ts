import axios from "axios";

const apiBase = "https://napi.busbud.com/";

export const apiService = {
  get: async <R>(query: string): Promise<R> => {
    const config = {
      headers: {
        Accept:
          "application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/",
        "X-Busbud-Token": "PARTNER_BaASYYHxTxuOINEOMWq5GA",
      },
    };
    const url = apiBase + query;
    return axios.get(url, config).then((res) => res.data);
  },
};
