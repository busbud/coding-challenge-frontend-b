//We define the reducer and how the data should be stored in redux state
const initialState = {
  mainInformation: {},
  allDepartures: [],
};

//How the reducer will use our data
const firstFetch = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_ACTION":
      return { ...state, mainInformation: action.payload };
    case "FETCH_DEPARTURES":
      return { ...state, allDepartures: action.payload };
    default:
      return state;
  }
};

export default firstFetch;
