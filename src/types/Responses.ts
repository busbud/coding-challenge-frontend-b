// NOTE: Linting disabled due to external data requirements
/* eslint-disable @typescript-eslint/naming-convention */

import { TCity } from "./City";
import { TDeparture } from "./Departure";
import { TLocation } from "./Location";
import { TOperator } from "./Operator";

export type TScheduleDepartureResponse = {
  origin_city_id: string;
  destination_city_id: string;
  cities: TCity[];
  locations: TLocation[];
  operators: TOperator[];
  departures: TDeparture[];
  complete: boolean;
  ttl: number;
  is_valid_route: boolean;
};
