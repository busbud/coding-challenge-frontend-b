import Vue from "vue";
import Vuex, { Commit, StoreOptions } from "vuex";
import { DepartureState } from "./store";

import departuresService from "@/services/departures";

Vue.use(Vuex);

export const stateDefinition: DepartureState = {
  departures: [],
};

export const mutations =  {
  addDepartures(state, departures) {
    state.departures.push(...departures);
  },
};

export const actions = {
  async fetchDepartures({ commit }: { commit: Commit }): Promise<any> {
    return await departuresService.getDeparturesFromNewYork()
      .then(({ departures }) => {
        commit("addDepartures", departures);
      });
  },
};

const store: StoreOptions<DepartureState> = {
  state: stateDefinition,
  mutations,
  actions,
};

export default new Vuex.Store<DepartureState>(store);
