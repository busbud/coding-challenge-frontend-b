import { apiRequestHeader } from "@/utils/bubudRequestHelper";
import { startDate as osheagaStartDate } from "@/utils/festivalDates";
import geo from "@/utils/geo";

const departuresService = {

  async getDeparturesFromNewYork(): Promise<any> {
    let departuresList: any[] = [];
    let pollingComplete: boolean = false;
    while (!pollingComplete) {
      const departuresObject: any = await this.fetchDepartures();

      departuresList = [...departuresList, ...departuresObject.departures];
      pollingComplete = departuresObject.complete;

      if (pollingComplete) {
        departuresObject.departures = departuresList;

        return departuresObject;
      }
    }
  },
  async fetchDepartures(): Promise<any> {
    const headers: Headers = new Headers(apiRequestHeader);
    const url: string = `https://napi.busbud.com/x-departures/${geo.newYork}/${geo.montreal}/${osheagaStartDate}`;
    try {
      const response: Response = await fetch(url, { headers });

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
