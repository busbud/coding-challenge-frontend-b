import Vue from "vue";
import Vuex, { Commit, StoreOptions } from "vuex";
import { DepartureState } from "./store";

import departuresService from "@/services/departures";

Vue.use(Vuex);

export const stateDefinition: DepartureState = {
  areAllDeparturesLoaded: false,
  destinationCity: {},
  departures: [],
  departuresLength: 0,
  departingCity: {},
};

export const mutations =  {
  addDepartures(state, departures) {
    state.departures.push(...departures);
    state.departuresLength = state.departures.length;
  },
  areAllDeparturesLoaded(state, areAllDeparturesLoaded) {
    state.areAllDeparturesLoaded = areAllDeparturesLoaded;
  },
  setCities(state, cities) {
    state.departingCity = cities[0];
    state.destinationCity = cities[1];
  },
};

export const actions = {
  async fetchDepartures({ commit, state }: { commit: Commit, state: DepartureState }): Promise<any> {
    const departureResults = await departuresService.fetchDepartures();
    const { cities, departures, complete }: {cities: any[], departures: any[], complete: boolean} = departureResults;
    const pollingComplete: boolean = complete;

    commit("setCities", cities);
    commit("areAllDeparturesLoaded", pollingComplete);
    commit("addDepartures", departures);

    if (!pollingComplete) {
      pollDepartures(commit, state, departures);
    }

  },
};

const store: StoreOptions<DepartureState> = {
  state: stateDefinition,
  mutations,
  actions,
};

async function pollDepartures(commit, state, departures) {
  const departuresObject: any = await departuresService.pollDepartures(state.departuresLength);
  commit("addDepartures", departuresObject.departures);

  if (!departuresObject.complete) {
    setTimeout(() => pollDepartures(commit, state, departures), 3500);
  } else {
    commit("areAllDeparturesLoaded", departuresObject.complete);
  }
}
export default new Vuex.Store<DepartureState>(store);
