import { departureDao } from "../daos/departureDao";

export const departureService = {
  searchInit: async (
    params: DepartureSearchInitParams
  ): Promise<DepartureSearchResponse | void> => {
    return departureDao.searchInit(params);
  },
  searchPoll: async (
    params: DepartureSearchPollParams
  ): Promise<DepartureSearchResponse | void> => {
    return departureDao.searchPoll(params);
  },
};
