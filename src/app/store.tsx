/**
 * With a similar approach than api/types, putting everything in just one file as the challenge is
 * simple (And I need easy exploration of files for clarity), but SHOULD be splitted in different directories.
 * Probably using Redux/Sagas instead of Context. Due simplicity, I opted for this.
 */

import React from 'react';
import { ResponseSearch, Departure, SearchList, ResponseCity } from 'types';
  
 interface SimpleStore {
  searches: SearchList;
  departures: Array<Departure>;
  cities: Record<string, ResponseCity>;
  lang: string;
  isDirty: boolean;
  isLoading: boolean;
  clean: () => void;
  toggleLoading: (value: boolean) => void;
  setIsDirty: (value: boolean) => void;
  setLang: (lang: string) => void;
  addSearch: (response: ResponseSearch) => void;
  setCities: (cities: Record<string, ResponseCity>) => void;
  setDepartures: (departures: Array<Departure>) => void;
}

const defaultState: SimpleStore = {
  searches: {} as SearchList,
  departures: [],
  cities: {},
  lang: "en",
  isDirty: false,
  isLoading: false,
  clean: () => undefined,
  setLang: () => undefined,
  toggleLoading: () => undefined,
  setIsDirty: () => undefined,
  addSearch: () => undefined,
  setCities: () => undefined,
  setDepartures: () => undefined,
};

const Store = React.createContext<SimpleStore>(defaultState);

export default Store;