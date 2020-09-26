export const queryBuilder = {
  searchInit: ({
    origin,
    destination,
    outboundDate,
  }: DepartureSearchInitParams): string => {
    return `x-departures/${origin}/${destination}/${outboundDate}?adults=1`;
  },
  poll: ({
    origin,
    destination,
    outboundDate,
    index,
  }: DepartureSearchPollParams): string => {
    return `x-departures/${origin}/${destination}/${outboundDate}?index=${index}&adults=1`;
  },
};
