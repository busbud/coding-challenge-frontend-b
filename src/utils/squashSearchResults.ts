// Squash departures and operators into single search response object
export const squashSearchResults = (
  resultsArr: DepartureSearchResponse[]
): DepartureSearchResponse => {
  const initialResult = resultsArr[0];
  const departures: XDeparture[] = resultsArr
    .map((r) => r.departures)
    .reduce((arr, item) => arr.concat(item));

  const operators: Operator[] = resultsArr
    .map((r) => r.operators)
    .reduce((arr, item) => arr.concat(item));

  const squashed = Object.assign(
    {},
    { ...initialResult, departures, operators }
  );
  return squashed;
};
