import IDeparture from "./departure";
import IOperator from "./operator";

export interface StoreState {
  language: string;
  searching: boolean;
  departures: Array<IDeparture>;
  locations: Array<any>;
  operators: Array<IOperator>;
  cities: Array<any>;
  error: string;
}
