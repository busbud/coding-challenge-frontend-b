import { TicketsDTOOutput } from "./types/busbud";
import {
  getDeparturesFromQuebecToMontreal,
  getDeparturesFromQuebecToMontrealPoll,
} from "./busbud";
import { busbudAxiosInstance } from "./axios";

jest.mock("");

describe("Busbud", () => {
  let busbudAxiosInstanceGetSpy: jest.SpyInstance;
  const searchParams = {
    adult: 1,
    child: 3,
    senior: 2,
  };
  const data = {
    complete: true,
    departures: [
      {
        id: "1",
      },
    ],
  } as TicketsDTOOutput;

  beforeEach(() => {
    busbudAxiosInstanceGetSpy = jest.spyOn(busbudAxiosInstance, "get");
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe("getDeparturesFromQuebecToMontreal", () => {
    it("should return all departures", async () => {
      busbudAxiosInstanceGetSpy.mockResolvedValueOnce({ data });

      const res = await getDeparturesFromQuebecToMontreal(searchParams);

      expect(res).toEqual({ data });
      expect(busbudAxiosInstance.get).toBeCalledTimes(1);
      expect(busbudAxiosInstance.get).toBeCalledWith(
        "/x-departures/f2m673/f25dvk/2021-12-12",
        {
          params: {
            ...searchParams,
          },
        }
      );
    });

    it("should throw if api throw error", async () => {
      busbudAxiosInstanceGetSpy.mockRejectedValueOnce(
        "Error getDeparturesFromQuebecToMontreal"
      );

      await expect(
        getDeparturesFromQuebecToMontreal(searchParams)
      ).rejects.toEqual("Error getDeparturesFromQuebecToMontreal");
      expect(busbudAxiosInstance.get).toBeCalledTimes(1);
      expect(busbudAxiosInstance.get).toBeCalledWith(
        "/x-departures/f2m673/f25dvk/2021-12-12",
        {
          params: {
            ...searchParams,
          },
        }
      );
    });
  });

  describe("getDeparturesFromQuebecToMontrealPoll", () => {
    it("should return all departures polled", async () => {
      busbudAxiosInstanceGetSpy.mockResolvedValueOnce({ data });

      const res = await getDeparturesFromQuebecToMontrealPoll(searchParams, 50);
      expect(res).toEqual({ data });
      expect(busbudAxiosInstance.get).toBeCalledTimes(1);
      expect(busbudAxiosInstance.get).toBeCalledWith(
        "/x-departures/f2m673/f25dvk/2021-12-12/poll",
        {
          params: {
            ...searchParams,
            index: 50,
          },
        }
      );
    });

    it("should throw error if API throw error", async () => {
      busbudAxiosInstanceGetSpy.mockRejectedValueOnce(
        "Error getDeparturesFromQuebecToMontrealPoll"
      );

      await expect(
        getDeparturesFromQuebecToMontrealPoll(searchParams, 75)
      ).rejects.toEqual("Error getDeparturesFromQuebecToMontrealPoll");
      expect(busbudAxiosInstance.get).toBeCalledTimes(1);
      expect(busbudAxiosInstance.get).toBeCalledWith(
        "/x-departures/f2m673/f25dvk/2021-12-12/poll",
        {
          params: {
            ...searchParams,
            index: 75,
          },
        }
      );
    });
  });
});
