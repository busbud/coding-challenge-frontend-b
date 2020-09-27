export const queryBuilder = {
  searchInit: ({
    origin,
    destination,
    outboundDate,
    adults,
  }: DepartureSearchInitParams): string => {
    return `x-departures/${origin}/${destination}/${outboundDate}?adult=${adults}&currency=CAD`;
  },
  searchPoll: ({
    origin,
    destination,
    outboundDate,
    adults,
    index,
  }: DepartureSearchPollParams): string => {
    return `x-departures/${origin}/${destination}/${outboundDate}?index=${index}&adult=${adults}&currency=CAD`;
  },
};
