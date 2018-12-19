import departuresService from "@/services/departures";

import { startDate } from "@/utils/festivalDates";
import { montreal, newYork } from "@/utils/geo";

// tslint:disable-next-line
const fetch = require("jest-fetch-mock");

describe("departures", () => {

  afterEach(fetch.resetMocks);

  describe("getDeparturesFromNewYork()", () => {

    it("should be defined", () => {
      expect(departuresService.getDeparturesFromNewYork).toBeDefined();
    });

    it("should call te busbud API", async () => {
      const response = Promise.resolve({ departures: [] });
      fetch.mockResponseOnce(JSON.stringify(response), 200);

      const headers: Headers = new Headers({
        "Accept": "application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/",
        "X-Busbud-Token": "this_is_a_busbud_token",
      });

      await departuresService.getDeparturesFromNewYork();
      expect(fetch).toHaveBeenCalledWith(
        `https://napi.busbud.com/x-departures/${newYork}/${montreal}/${startDate}`,
        { headers },
      );
    });
  });
});
