import {
  callApi,
  TCallApiRequest,
  TWhitelistedEndpoints,
} from "./apiCoreScripts";
import { getCustomHeaders } from "./getCustomHeaders";

export const performGet = (
  endpoint: TWhitelistedEndpoints,
  queryParams: TCallApiRequest["queryParams"],
  urlParams: TCallApiRequest["urlParams"]
): Promise<any> => {
  return callApi({
    endpoint,
    getCustomHeaders,
    method: "GET",
    queryParams,
    urlParams,
  });
};
