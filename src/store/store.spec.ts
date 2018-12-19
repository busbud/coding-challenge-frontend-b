import Vue from "vue";
import Vuex, { Commit } from 'vuex';

import departuresService from "@/services/departures";
import store, { actions, mutations } from "@/store";

jest.mock("../services/departures");

describe("store", () => {

  beforeEach(() => {
    Vue.use(Vuex);
    store.replaceState({
      departures: [],
    });
  });

  describe("actions", () => {

    beforeEach(() => {
      this.departures = [{}];
      departuresService.getDeparturesFromNewYork = jest.fn(() => Promise.resolve({ departures: this.departures }));
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
        expect(this.commit).toHaveBeenCalledTimes(1);
        expect(this.commit).toHaveBeenCalledWith("addDepartures", this.departures);
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
        expect(store.state.departures).toEqual(this.departures)
      });
    });
  });

  describe("dispatching actions", () => {

    describe("fetchDepartures", () => {

      beforeEach(() => {
        this.departures = [{}];
        departuresService.getDeparturesFromNewYork = jest.fn(() => Promise.resolve({ departures: this.departures }));
      });
  
      it("should update the state with the retrieved departures", async () => {
        await store.dispatch("fetchDepartures");
        expect(store.state.departures).toEqual(this.departures);
      });
    });
  });
});
