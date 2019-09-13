import {
  updateLanguage,
  startSearching,
  doneSearching,
  loadDepartures,
  setError,
  clearError,
  sortByPrice,
  sortByTime
} from "../actions/index";
import { mockDeparture, mockLocation, mockOperator, mockCity } from "./mocks";

describe("actions", () => {
  it("should create an action to change language", () => {
    const newLang = "fr";
    const expectedAction = {
      type: "UPDATE_LANGUAGE",
      language: newLang
    };
    expect(updateLanguage(newLang)).toEqual(expectedAction);
  });
  it("should create an action to start searching", () => {
    const expectedAction = {
      type: "START_SEARCHING"
    };
    expect(startSearching()).toEqual(expectedAction);
  });
  it("should create an action to stop searching", () => {
    const expectedAction = {
      type: "DONE_SEARCHING"
    };
    expect(doneSearching()).toEqual(expectedAction);
  });
  it("should create an action to set an error message", () => {
    const expectedAction = {
      type: "SET_ERROR",
      message: "Oops! Something went wrong."
    };
    expect(setError("Oops! Something went wrong.")).toEqual(expectedAction);
  });
  it("should create an action to clear error messages", () => {
    const expectedAction = {
      type: "CLEAR_ERROR"
    };
    expect(clearError()).toEqual(expectedAction);
  });
  it("should create an action to sort by price", () => {
    const expectedAction = {
      type: "SORT_BY_PRICE"
    };
    expect(sortByPrice()).toEqual(expectedAction);
  });
  it("should create an action to sort by time", () => {
    const expectedAction = {
      type: "SORT_BY_TIME"
    };
    expect(sortByTime()).toEqual(expectedAction);
  });
  it("should create an action to load departures", () => {
    const expectedAction = {
      type: "LOAD_DEPARTURES",
      departures: [mockDeparture],
      locations: [mockLocation],
      operators: [mockOperator],
      cities: [mockCity],
      polling: false
    };
    expect(
      loadDepartures(
        [mockDeparture],
        [mockLocation],
        [mockOperator],
        [mockCity],
        false
      )
    ).toEqual(expectedAction);
  });
});
