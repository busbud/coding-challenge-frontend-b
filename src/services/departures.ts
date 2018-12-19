import { apiRequestHeader } from "@/utils/bubudRequestHelper";
import { startDate as osheagaStartDate } from "@/utils/festivalDates";
import geo from "@/utils/geo";

const departuresService = {

  getDeparturesFromNewYork(): Promise<any> {
    return this.fetchDepartures()
      .catch((error) => {
        throw new Error(error);
      });
  },
  async fetchDepartures() {
    const headers: Headers = new Headers(apiRequestHeader);
    try {
      const response: Response = await fetch(
        `https://napi.busbud.com/x-departures/${geo.newYork}/${geo.montreal}/${osheagaStartDate}`,
        { headers },
      );
      if (!response.ok) {
        return Promise.reject(response.body);
      }

      return response.json();
    } catch (error) {
        throw new Error(error);
    }
  },
};

export default departuresService;
