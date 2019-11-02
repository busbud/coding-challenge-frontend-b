export const bakeDepartureResults = (results, response) => {
  if (!results.departures) {
    results = {
      departures: []
    };
  }
  // csorted departure dates
  if (response && response.departures && response.departures.length > 0) {
    results.departures = sortByDate(
      [...results.departures, ...response.departures],
      "departure_time"
    );
  }
  // converting to object so we dont have to loop it later
  if (response && response.locations && response.locations.length > 0) {
    results.locations = convertArrayToObj(response.locations, "id");
  }
  // converting to object so we dont have to loop it later
  if (response && response.operators && response.operators.length > 0) {
    results.operators = convertArrayToObj(response.operators, "id");
  }
  return results;
};

const convertArrayToObj = (arr, key) => {
  return arr.reduce((accumulator, current) => {
    accumulator[current[key]] = current;
    return accumulator;
  }, {});
};

const sortByDate = (results, key) => {
  return results.sort((a, b) => {
    const aDate = new Date(a[key]);
    const bDate = new Date(b[key]);
    if (aDate.getTime() < bDate.getTime()) {
      return -1;
    }
    if (aDate.getTime() > bDate.getTime()) {
      return 1;
    }
    return 0;
  });
};
