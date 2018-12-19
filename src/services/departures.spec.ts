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
      const response = {
        complete: true,
        departures: [{}],
      };
      fetch.mockResponseOnce(JSON.stringify(response), { status: 200 });

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

    describe("when there is a polling needed", () => {

      beforeEach(() => {
        this.incompleteResponse = {
          complete: false,
          departures: [{ id: "MzNmMjVhOGM6YzM2NGI3ZjA" }],
        };
        this.completeResponse = {
          complete: true,
          departures: [{ id: "MjhiZWZmYjg6NmU1YTk2NTA" }],
        };
        fetch.mockResponses(
          [
            JSON.stringify(this.incompleteResponse),
            { status: 200 },
          ],
          [
            JSON.stringify(this.incompleteResponse),
            { status: 200 },
          ],
          [
            JSON.stringify(this.completeResponse),
            { status: 200 },
          ],
        );
      });

      it("should call the api until the complete field s true", async () => {
        await departuresService.getDeparturesFromNewYork();
        expect(fetch).toHaveBeenCalledTimes(3);
      });

      it("should return a complete object with all the retrieved departures", async () => {
        const departuresObject = await departuresService.getDeparturesFromNewYork();
        expect(departuresObject.departures.length).toBe(3);
        expect(departuresObject.departures).toEqual([
          ...this.incompleteResponse.departures,
          ...this.incompleteResponse.departures,
          ...this.completeResponse.departures,
        ]);
      });
    });

    describe("when fetch call fails", () => {

      beforeEach(() => {
        fetch.mockReject(new Error("fake error message"));
      });

      it("should throw error", async () => {
        let errorMessage;
        try {
          await departuresService.getDeparturesFromNewYork();
        } catch (error) {
          errorMessage = error.message;
        }
        expect(errorMessage).toBe("Departures fetch failed. The reason is: fake error message");
      });
    });

    describe("when the promise rejects", () => {

      beforeEach(() => {
        const response = { error: "fake internal error" };

        fetch.mockResponseOnce(JSON.stringify(response), { status: 500 });
      });

      it("should throw an error", async () => {
        let errorMessage;
        try {
          await departuresService.getDeparturesFromNewYork();
        } catch (error) {
          errorMessage = error.message;
        }
        expect(errorMessage).toBe("Departures fetch failed. The reason is: fake internal error");
      });
    });
  });
});
