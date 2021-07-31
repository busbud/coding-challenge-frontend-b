import { createContext } from "react";

export interface BusbudContextValues {
  currencyValue: string;
}

export const BusbudContext = createContext({} as BusbudContextValues);
