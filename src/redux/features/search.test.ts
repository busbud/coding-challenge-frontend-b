import { AnyAction } from "@reduxjs/toolkit";
import reducer, { updateSearchData } from "./search";

describe("search", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {} as AnyAction)).toEqual({
      adult: 1,
      child: 0,
      senior: 0,
    });
  });

  it("should data never be below 1", () => {
    expect(
      reducer(undefined, updateSearchData({ name: "adult", value: 2 }))
    ).toEqual({
      adult: 2,
      child: 0,
      senior: 0,
    });
    expect(
      reducer(undefined, updateSearchData({ name: "adult", value: 0 }))
    ).toEqual({
      adult: 1,
      child: 0,
      senior: 0,
    });
    expect(
      reducer(undefined, updateSearchData({ name: "adult", value: -100000 }))
    ).toEqual({
      adult: 1,
      child: 0,
      senior: 0,
    });
  });
});
