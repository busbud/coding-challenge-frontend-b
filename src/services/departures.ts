import { apiRequestHeader } from "@/utils/bubudRequestHelper";
import { startDate as osheagaStartDate } from "@/utils/festivalDates";
import geo from "@/utils/geo";

const headers: Headers = new Headers(apiRequestHeader);
const fetchUrl: string = `https://napi.busbud.com/x-departures/${geo.newYork}/${geo.montreal}/${osheagaStartDate}`;

const departuresService = {

  async pollDepartures(numberOfDeparturesToRetrieve: number): Promise<any> {
    const pollUrl: string = `${fetchUrl}/poll?index=${numberOfDeparturesToRetrieve}`;
    try {
      const response: Response = await fetch(pollUrl, { headers });

      if (response.ok) {
        return response.json();
      }
      const errorResponse: any = await response.json();
      throw new Error(errorResponse.error);
    } catch (error) {
      throw new Error(`Departures poll failed. The reason is: ${error.message}`);
    }
  },
  async fetchDepartures(): Promise<any> {
    try {
      const response: Response = await fetch(fetchUrl, { headers });

      if (response.ok) {
        return response.json();
      }
      const errorResponse: any = await response.json();
      throw new Error(errorResponse.error);
    } catch (error) {
      throw new Error(`Departures fetch failed. The reason is: ${error.message}`);
    }
  },
};

export default departuresService;
