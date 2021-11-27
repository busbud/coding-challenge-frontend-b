import { interpret } from "xstate";
import mockAxios from "jest-mock-axios";
import fetchDeparturesMachine from "./fetch-departures";

describe("fetchDepartureMachie", () => {
  test("transition from idle to initializing", () => {
    const state = fetchDeparturesMachine.transition("idle", {
      type: "INITIALIZE",
      origin: "aaaaaa",
      destination: "bbbbbb",
      adults: 2,
      date: "2021-01-01",
    });
    expect(state.matches("initializing")).toBe(true);
  });

  test("retry from failure to initializing", () => {
    const state = fetchDeparturesMachine.transition("failure", {
      type: "RETRY",
    });
    expect(state.matches("initializing")).toBe(true);
  });

  test("transition from initial search > polling > complete", (done) => {
    mockAxios.get.mockResolvedValueOnce({
      data: {
        complete: false,
        departures: [
          {
            arrival_time: "2021-01-01 12:22",
            departure_time: "2021-01-01 08:00",
            prices: { currency: "EUR", total: 1200 },
            origin_location_id: 1,
            arrival_timezone: "America/Montreal",
            departure_timezone: "America/Montreal",
          },
        ],
        locations: [{ name: "Aéroport YUL", id: 1, address: [""] }],
      },
    });
    mockAxios.get.mockResolvedValueOnce({
      data: {
        complete: true,
        departures: [
          {
            arrival_time: "2021-01-01 22:22",
            departure_time: "2021-01-01 18:00",
            prices: { currency: "EUR", total: 2400 },
            origin_location_id: 1,
            arrival_timezone: "America/Montreal",
            departure_timezone: "America/Montreal",
          },
        ],
        locations: [{ name: "Aéroport YUL", id: 1, address: [""] }],
      },
    });

    const fetchService = interpret(fetchDeparturesMachine).onTransition(
      (state) => {
        if (state.matches("success")) {
          done();
        }
      }
    );

    fetchService.start();
    fetchService.send({
      type: "INITIALIZE",
      origin: "aaaaaa",
      destination: "bbbbbb",
      adults: 2,
      date: "2021-01-01",
    });
  });

  test("handle network failure", (done) => {
    mockAxios.get.mockRejectedValue({
      data: null,
    });

    const fetchService = interpret(fetchDeparturesMachine).onTransition(
      (state) => {
        if (state.matches("failure")) {
          done();
        }
      }
    );

    fetchService.start();
    fetchService.send({
      type: "INITIALIZE",
      origin: "aaaaaa",
      destination: "bbbbbb",
      adults: 2,
      date: "2021-01-01",
    });
  });
});
