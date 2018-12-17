import Departures from "@/services/departures";
import * as fetchMock from "fetch-mock";

describe("departures", () => {

  afterEach(fetchMock.restore);

  describe("getDeparturesFromNewYork()", () => {

    it("should be defined", () => {
      expect(Departures.getDeparturesFromNewYork).toBeDefined();
    });

    it("should call te busbud API", () => {
      fetchMock.mock("https://napi.busbud.com/x-departures/:origin/:destination/:outbound_date", 200);
    });
  });
});
