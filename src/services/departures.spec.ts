import departuresService from "@/services/departures";

import { startDate } from "@/utils/festivalDates";
import { montreal, newYork } from "@/utils/geo";

// tslint:disable-next-line
const fetch = require("jest-fetch-mock");

describe("departures", () => {

  beforeEach(() => {
    this.headers = new Headers({
      "Accept": "application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/",
      "X-Busbud-Token": "this_is_a_busbud_token",
    }) as Headers;
  });

  afterEach(fetch.resetMocks);

  describe("pollDepartures()", () => {

    beforeEach(() => {
      this.numberOfDeparturesToRetrieve = 10 as number;
    });

    it("should be defined", () => {
      expect(departuresService.pollDepartures).toBeDefined();
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

      await departuresService.pollDepartures(this.numberOfDeparturesToRetrieve);
      expect(fetch).toHaveBeenCalledWith(
        // tslint:disable-next-line:max-line-length
        `https://napi.busbud.com/x-departures/${newYork}/${montreal}/${startDate}/poll?index=${this.numberOfDeparturesToRetrieve}`,
        { headers },
      );
    });

    describe("when poll call fails", () => {

      beforeEach(() => {
        fetch.mockReject(new Error("fake error message"));
      });

      it("should throw error", async () => {
        let errorMessage;
        try {
          await departuresService.pollDepartures(this.numberOfDeparturesToRetrieve);
        } catch (error) {
          errorMessage = error.message;
        }
        expect(errorMessage).toBe("Departures poll failed. The reason is: fake error message");
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
          await departuresService.pollDepartures(this.numberOfDeparturesToRetrieve);
        } catch (error) {
          errorMessage = error.message;
        }
        expect(errorMessage).toBe("Departures poll failed. The reason is: fake internal error");
      });
    });
  });

  describe("fetchDepartures()", () => {

    it("should be defined", () => {
      expect(departuresService.fetchDepartures).toBeDefined();
    });

    it("should call te busbud API", async () => {
      const response = {
        complete: true,
        departures: [{}],
      };
      fetch.mockResponseOnce(JSON.stringify(response), { status: 200 });

      await departuresService.fetchDepartures();
      expect(fetch).toHaveBeenCalledWith(
        `https://napi.busbud.com/x-departures/${newYork}/${montreal}/${startDate}`,
        { headers: this.headers },
      );
    });

    describe("when poll call fails", () => {

      beforeEach(() => {
        fetch.mockReject(new Error("fake error message"));
      });

      it("should throw error", async () => {
        let errorMessage;
        try {
          await departuresService.fetchDepartures();
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
          await departuresService.fetchDepartures();
        } catch (error) {
          errorMessage = error.message;
        }
        expect(errorMessage).toBe("Departures fetch failed. The reason is: fake internal error");
      });
    });
  });
});
