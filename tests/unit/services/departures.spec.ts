import Departures from "@/services/departures";

import { newYork, montreal } from "@/utils/geo";
import { startDate } from "@/utils/festivalDates";

const fetch = require("jest-fetch-mock");

describe("departures", () => {

  afterEach(fetch.resetMocks);

  describe("getDeparturesFromNewYork()", () => {

    it("should be defined", () => {
      expect(Departures.getDeparturesFromNewYork).toBeDefined();
    });

    it("should call te busbud API", async () => {
      fetch.mockResponseOnce(`https://napi.busbud.com/x-departures/${newYork}/${montreal}/${startDate}`, 200);
      const headers: Headers = new Headers({
        Accept: "application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/",
        "X-Busbud-Token": "this_is_a_busbud_token",
      });

      await Departures.getDeparturesFromNewYork();
      expect(fetch).toHaveBeenCalledWith(
        `https://napi.busbud.com/x-departures/${newYork}/${montreal}/${startDate}`,
        { headers },
      );
    });
  });
});
