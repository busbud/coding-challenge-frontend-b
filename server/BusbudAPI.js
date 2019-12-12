const { RESTDataSource } = require("apollo-datasource-rest");

class BusbudAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://napi.busbud.com/";
  }

  willSendRequest(request) {
    request.headers.set(
      "Accept",
      "application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/"
    );
    request.headers.set("X-Busbud-Token", this.context.token);
  }

  async getDepartures({ from, to, when }) {
    const data = await this.get(
      `https://napi.busbud.com/x-departures/${from}/${to}/${when}`
    );
    return data.results;
  }
}

module.exports = { BusbudAPI };
