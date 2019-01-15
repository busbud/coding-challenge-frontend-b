import Vue from "vue";
import Vuex, { Commit } from "vuex";

import departuresService from "@/services/departures";
import store, { actions, mutations } from "@/store";

jest.mock("../services/departures");

describe("store", () => {

  beforeEach(() => {
    Vue.use(Vuex);
    store.replaceState({
      areAllDeparturesLoaded: false,
      destinationCity: {},
      departures: [],
      departuresLength: 0,
      departingCity: {},
    });
  });

  describe("actions", () => {

    beforeEach(() => {
      this.cities = [
        { id: "375dd5879001acbd84a4683deda84183" },
        { id: "375dd587-9001-acbd-84a4-683dedfb933e" },
      ];
      this.departures = [{}, {}, {}];
    });

    describe("fetchDepartures", () => {

      describe("when all the results are retrieved after the fetch", () => {

        beforeEach(() => {
          departuresService.fetchDepartures = jest.fn(() => Promise.resolve({
            cities: this.cities,
            departures: this.departures,
            complete: true,
          }));
          this.commit = jest.fn() as Commit;
        });

        it("should be defined", () => {
          expect(actions.fetchDepartures).toBeDefined();
        });

        it("should fetch the departures from New York", async () => {
          await actions.fetchDepartures({ commit: this.commit, state: store.state });
          expect(departuresService.fetchDepartures).toHaveBeenCalledTimes(1);
        });

        it("should commit the retrieved departures", async () => {
          await actions.fetchDepartures({ commit: this.commit, state: store.state });
          expect(this.commit).toHaveBeenCalledWith("addDepartures", this.departures);
          expect(this.commit).toHaveBeenCalledWith("setCities", this.cities);
        });

        it("should commit all the departures loaded once", async () => {
          await actions.fetchDepartures({ commit: this.commit, state: store.state });
          expect(this.commit.mock.calls[1]).toEqual(["areAllDeparturesLoaded", true]);
          expect(this.commit.mock.calls.filter((call) => call[0] === "areAllDeparturesLoaded").length).toBe(1);
        });
      });

      describe("when the initial fetch does not return all the results", () => {

        beforeEach(() => {
          this.departuresLength = this.departures.length;
          departuresService.fetchDepartures = jest.fn(() => Promise.resolve({
            cities: this.cities,
            departures: this.departures,
            complete: false,
          }));
          departuresService.pollDepartures = jest.fn()
            .mockReturnValueOnce(
              Promise.resolve({
                cities: this.cities,
                departures: [this.departures[0], this.departures[1]],
                complete: true,
              }),
            );
          this.commit = jest.fn() as Commit;
          jest.useFakeTimers();
        });

        afterEach(jest.clearAllTimers);

        it("should fetch the departures from New York", async () => {
          await actions.fetchDepartures({ commit: this.commit, state: store.state });
          expect(departuresService.fetchDepartures).toHaveBeenCalledTimes(1);
        });

        it("should poll the departures until the complete value is true", async () => {
          await actions.fetchDepartures({ commit: this.commit, state: store.state });
          jest.runAllTimers();
          expect(departuresService.pollDepartures).toHaveBeenCalledTimes(1);
        });

        it("should poll the departures passing the pagination value", async () => {
          store.state.departuresLength = 987;
          await actions.fetchDepartures({ commit: this.commit, state: store.state });
          expect(departuresService.pollDepartures).toHaveBeenCalledWith(987);
        });

        it("should commit the cities once", async () => {
          await actions.fetchDepartures({ commit: this.commit, state: store.state });
          jest.runAllTimers();
          expect(this.commit.mock.calls[0]).toEqual(["setCities", this.cities]);
          expect(this.commit.mock.calls.filter((call) => call[0] === "setCities").length).toBe(1);
        });

        it("should commit the departures every time that a set of departures is retrieved", async () => {
          await actions.fetchDepartures({ commit: this.commit, state: store.state });
          jest.runAllTimers();
          expect(this.commit.mock.calls[2]).toEqual(["addDepartures", this.departures]);
          expect(this.commit.mock.calls[3]).toEqual(["addDepartures", [this.departures[0], this.departures[1]]]);
          expect(this.commit.mock.calls.filter((call) => call[0] === "addDepartures").length).toBe(2);
        });

        it("should commit all the departures loaded once", async () => {
          await actions.fetchDepartures({ commit: this.commit, state: store.state });
          jest.runAllTimers();
          expect(this.commit.mock.calls[4]).toEqual(["areAllDeparturesLoaded", true]);
          expect(this.commit.mock.calls.filter((call) => call[0] === "areAllDeparturesLoaded").length).toBe(2);
        });
      });
    });
  });

  describe("mutations", () => {

    describe("addDepartures", () => {

      beforeEach(() => {
        this.departures = [{ busbud_departure_id: "c07c1eb9" }];
      });

      it("should be defined", () => {
        expect(mutations.addDepartures).toBeDefined();
      });

      it("should modify the departures field in the state", () => {
        mutations.addDepartures(store.state, this.departures);
        expect(store.state.departures).toEqual(this.departures);
      });
    });

    describe("setCities", () => {

      beforeEach(() => {
        this.cities = [
          { id: "375dd5879001acbd84a4683deda84183" },
          { id: "375dd587-9001-acbd-84a4-683dedfb933e" },
        ];
      });

      it("should be defined", () => {
        expect(mutations.setCities).toBeDefined();
      });

      it("should modify the destinationCity and departingCity fields in the state", () => {
        mutations.setCities(store.state, this.cities);
        expect(store.state.departingCity).toEqual(this.cities[0]);
        expect(store.state.destinationCity).toEqual(this.cities[1]);
      });
    });
  });

  describe("dispatching actions", () => {

    describe("fetchDepartures", () => {

      beforeEach(() => {
        this.cities = [
          { id: "375dd5879001acbd84a4683deda84183" },
          { id: "375dd587-9001-acbd-84a4-683dedfb933e" },
        ];
        this.departures = [{}];
      });

      describe("when all the results are retrieved after the fetch", () => {

        beforeEach(() => {
          departuresService.fetchDepartures = jest.fn(() => Promise.resolve({
            cities: this.cities,
            departures: this.departures,
            complete: true,
          }));
          departuresService.pollDepartures = jest.fn();
        });

        it("should update the state with the retrieved departures", async () => {
          await store.dispatch("fetchDepartures");
          expect(store.state.departures).toEqual(this.departures);
        });
      });
    });
  });
});
