import reducer from "../reducers/index";
import { mockDeparture, mockLocation, mockOperator, mockCity } from "./mocks";

const initialState = {
  language: "en",
  searching: false,
  departures: [],
  locations: [],
  operators: [],
  cities: [],
  error: ""
};

describe("it should have a reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should handle UPDATE_LANGUAGE", () => {
    expect(
      reducer(initialState, {
        type: "UPDATE_LANGUAGE",
        language: "fr"
      })
    ).toEqual({
      language: "fr",
      searching: false,
      departures: [],
      locations: [],
      operators: [],
      cities: [],
      error: ""
    });
  });

  it("should handle START_SEARCHING", () => {
    expect(
      reducer(initialState, {
        type: "START_SEARCHING"
      })
    ).toEqual({
      language: "en",
      searching: true,
      departures: [],
      locations: [],
      operators: [],
      cities: [],
      error: ""
    });
  });

  it("should handle DONE_SEARCHING", () => {
    expect(
      reducer(initialState, {
        type: "DONE_SEARCHING"
      })
    ).toEqual({
      language: "en",
      searching: false,
      departures: [],
      locations: [],
      operators: [],
      cities: [],
      error: ""
    });
  });

  it("should handle SET_ERROR", () => {
    expect(
      reducer(initialState, {
        type: "SET_ERROR",
        message: "Oops!"
      })
    ).toEqual({
      language: "en",
      searching: false,
      departures: [],
      locations: [],
      operators: [],
      cities: [],
      error: "Oops!"
    });
  });

  it("should handle CLEAR_ERROR", () => {
    expect(
      reducer(initialState, {
        type: "CLEAR_ERROR"
      })
    ).toEqual({
      language: "en",
      searching: false,
      departures: [],
      locations: [],
      operators: [],
      cities: [],
      error: ""
    });
  });
  it("should handle SORT_BY_PRICE", () => {
    expect(
      reducer(
        {
          language: "en",
          searching: false,
          departures: [
            mockDeparture,
            // Adding a mockDeparture with a price of 0 - sorting should put that departure first
            { ...mockDeparture, prices: { ...mockDeparture.prices, total: 0 } }
          ],
          locations: [mockLocation],
          operators: [mockOperator],
          cities: [mockCity],
          error: ""
        },
        {
          type: "SORT_BY_PRICE"
        }
      )
    ).toEqual({
      language: "en",
      searching: false,
      departures: [
        { ...mockDeparture, prices: { ...mockDeparture.prices, total: 0 } },
        mockDeparture
      ],
      locations: [mockLocation],
      operators: [mockOperator],
      cities: [mockCity],
      error: ""
    });
  });
  it("should handle SORT_BY_TIME", () => {
    expect(
      reducer(
        {
          language: "en",
          searching: false,
          departures: [
            mockDeparture,
            // Adding a mockDeparture with a departure time of 12:00 am - sorting should put that departure first
            {
              ...mockDeparture,
              departure_time: new Date("2 August, 12:00 am").toISOString()
            }
          ],
          locations: [mockLocation],
          operators: [mockOperator],
          cities: [mockCity],
          error: ""
        },
        {
          type: "SORT_BY_TIME"
        }
      )
    ).toEqual({
      language: "en",
      searching: false,
      departures: [
        {
          ...mockDeparture,
          departure_time: new Date("2 August, 12:00 am").toISOString()
        },
        mockDeparture
      ],
      locations: [mockLocation],
      operators: [mockOperator],
      cities: [mockCity],
      error: ""
    });
  });

  it("should handle LOAD_DEPARTURES, when not polling", () => {
    expect(
      reducer(initialState, {
        type: "LOAD_DEPARTURES",
        departures: [mockDeparture],
        locations: [mockLocation],
        operators: [mockOperator],
        cities: [mockCity],
        polling: false
      })
    ).toEqual({
      language: "en",
      searching: false,
      departures: [mockDeparture],
      locations: [mockLocation],
      operators: [mockOperator],
      cities: [mockCity],
      error: ""
    });
  });
  it("should handle LOAD_DEPARTURES, when polling", () => {
    // Polling should add to the existing list
    expect(
      reducer(
        {
          language: "en",
          searching: false,
          departures: [mockDeparture],
          locations: [mockLocation],
          operators: [mockOperator],
          cities: [mockCity],
          error: ""
        },
        {
          type: "LOAD_DEPARTURES",
          departures: [mockDeparture],
          locations: [mockLocation],
          operators: [mockOperator],
          cities: [mockCity],
          polling: true
        }
      )
    ).toEqual({
      language: "en",
      searching: false,
      departures: [mockDeparture, mockDeparture],
      locations: [mockLocation, mockLocation],
      operators: [mockOperator, mockOperator],
      cities: [mockCity, mockCity],
      error: ""
    });
  });
});
