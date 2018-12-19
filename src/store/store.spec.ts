import Vue from "vue";
import Vuex, { Commit } from "vuex";

import departuresService from "@/services/departures";
import store, { actions, mutations } from "@/store";

jest.mock("../services/departures");

describe("store", () => {

  beforeEach(() => {
    Vue.use(Vuex);
    store.replaceState({
      destinationCity: {},
      departures: [],
      departingCity: {},
    });
  });

  describe("actions", () => {

    beforeEach(() => {
      this.cities = [
        { id: "375dd5879001acbd84a4683deda84183" },
        { id: "375dd587-9001-acbd-84a4-683dedfb933e" },
      ];
      this.departures = [{}];
      departuresService.getDeparturesFromNewYork = jest.fn(() => Promise.resolve({
        cities: this.cities,
        departures: this.departures,
      }));
      this.commit = jest.fn() as Commit;
    });

    describe("fetchDepartures", () => {

      it("should be defines", () => {
        expect(actions.fetchDepartures).toBeDefined();
      });

      it("should retrieve the departures from New York", async () => {
        await actions.fetchDepartures({ commit: this.commit });
        expect(departuresService.getDeparturesFromNewYork).toHaveBeenCalledTimes(1);
      });

      it("should commit the retrieved departures", async () => {
        await actions.fetchDepartures({ commit: this.commit });
        expect(this.commit).toHaveBeenCalledWith("addDepartures", this.departures);
        expect(this.commit).toHaveBeenCalledWith("setCities", this.cities);
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
        departuresService.getDeparturesFromNewYork = jest.fn(() => Promise.resolve({
          cities: this.cities,
          departures: this.departures,
        }));
      });

      it("should update the state with the retrieved departures", async () => {
        await store.dispatch("fetchDepartures");
        expect(store.state.departures).toEqual(this.departures);
      });
    });
  });
});
