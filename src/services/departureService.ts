import { departureDao } from "../daos/departureDao";

// Private functions for use in search
const searchPoll = async (
  params: DepartureSearchPollParams
): Promise<DepartureSearchResponse | void> => {
  return departureDao.searchPoll(params);
};
const searchInit = async (
  params: DepartureSearchInitParams
): Promise<DepartureSearchResponse | void> => {
  return departureDao.searchInit(params);
};

export const departureService = {
  search: (
    values: DepartureSearchInitParams
  ): Promise<DepartureSearchResponse[]> => {
    let lastIndex = 0;
    let complete = false;

    return new Promise((resolve, reject) => {
      let responseArr: DepartureSearchResponse[] = [];

      searchInit(values)
        .then((res) => {
          if (res) {
            responseArr.push(res);
            if (res && res.complete) {
              complete = true;
            } else if (res) {
              lastIndex = res.departures.length ? res.departures.length - 1 : 0;
            } else {
              reject("Error: something went wrong on search init");
            }
          }
        })
        .catch((e) => {
          reject(e);
        });

      if (complete) {
        resolve(responseArr);
      }
      const poll = async () => {
        await searchPoll({ ...values, index: lastIndex })
          .then((res) => {
            if (res) {
              responseArr.push(res);
              if (res && res.complete) {
                complete = true;
              } else {
                lastIndex = res.departures.length - 1;
              }
              continuePollingForCompletion();
            } else {
              reject("something horrible happened");
            }
          })
          .catch((e) => {
            reject(e);
          });
      };

      const continuePollingForCompletion = () => {
        if (!complete) {
          setTimeout(poll, 2000);
        } else {
          resolve(responseArr);
        }
      };
      continuePollingForCompletion();
    });
  },
};
