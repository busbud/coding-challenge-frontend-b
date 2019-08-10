let reducer = (state, action) => {
  console.log("Reducer action: " + action.type);
  switch (action.type) {
    case "origin":
      return { ...state, origin: action.origin };
    case "destination":
      return { ...state, destination: action.destination };
    case "date":
      return { ...state, date: action.date };
    case "results":
      return {
        ...state,
        results: action.results,
        departures: action.departures,
        pollstop: action.pollstop,
        query: action.query
      };
    case "reset":
      return {
        ...state,
        origin: "dr5reg",
        destination: "f25dvk",
        date: "2020-08-02",
        results: undefined,
        departures: [],
        pollstop: true,
        query: ""
      };
    default:
      return state;
  }
};

export default reducer;
