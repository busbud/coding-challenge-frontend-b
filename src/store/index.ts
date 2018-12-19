import Vue from "vue";
import Vuex, { Commit, StoreOptions } from "vuex";
import { DepartureState } from "./store";

import departuresService from "@/services/departures";

Vue.use(Vuex);

export const stateDefinition: DepartureState = {
  destinationCity: {},
  departures: [],
  departingCity: {},
};

export const mutations =  {
  addDepartures(state, departures) {
    state.departures.push(...departures);
  },
  setCities(state, cities) {
    state.departingCity = cities[0];
    state.destinationCity = cities[1];
  },
};

export const actions = {
  async fetchDepartures({ commit }: { commit: Commit }): Promise<any> {
    const departureResults = await departuresService.getDeparturesFromNewYork();
    const { cities, departures } = departureResults;

    commit("addDepartures", departures);
    commit("setCities", cities);
  },
};

const store: StoreOptions<DepartureState> = {
  state: stateDefinition,
  mutations,
  actions,
};

export default new Vuex.Store<DepartureState>(store);
