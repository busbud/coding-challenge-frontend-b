import { apiService } from "../services/apiService";
import { queryBuilder } from "../services/utils/queryBuilder";

export const departureDao = {
  searchInit: async (
    params: DepartureSearchInitParams
  ): Promise<DepartureSearchResponse> => {
    return apiService.get<DepartureSearchResponse>(
      queryBuilder.searchInit(params)
    );
  },
  searchPoll: async (
    params: DepartureSearchInitParams
  ): Promise<DepartureSearchResponse> => {
    return apiService.get<DepartureSearchResponse>(
      queryBuilder.searchInit(params)
    );
  },
};
