import React from "react";
import { renderHook } from "@testing-library/react-hooks";

import usePollingApi from "../usePollingApi";
import mockSchedules from "../../__mocks__/schedules";
import * as apiUtils from "../../utils/api";
import { bakeDepartureResults } from "../../pages/bakeResults";

describe("usePollingApi custom hool", () => {
  it("should send initial hook state", async function() {
    const mockGetSchedules = jest.spyOn(apiUtils, "getApi");
    mockGetSchedules.mockResolvedValue(mockSchedules);

    const { result } = renderHook(() =>
      usePollingApi(
        ["data"],
        ["?adult=1"],
        bakeDepartureResults,
        "http://localhost"
      )
    );

    expect(result.current).toStrictEqual({ isLoading: true, results: {} });
  });

  it("should send result received from api in correct format", async function() {
    const mockGetSchedules = jest.spyOn(apiUtils, "getApi");
    mockGetSchedules.mockResolvedValue(mockSchedules);

    const { result, waitForNextUpdate } = renderHook(() =>
      usePollingApi(
        ["data"],
        ["?adult=1"],
        bakeDepartureResults,
        "http://localhost"
      )
    );

    expect(result.current).toStrictEqual({ isLoading: true, results: {} });
    await waitForNextUpdate();
    expect(result.current).toStrictEqual({
      isLoading: false,
      results: bakeDepartureResults(
        { isLoading: true, results: {} },
        mockSchedules
      )
    });
  });
});
