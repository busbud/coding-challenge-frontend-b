import { apiRequestHeader } from "@/utils/bubudRequestHelper";
import { startDate as osheagaStartDate } from "@/utils/festivalDates";
import geo from "@/utils/geo";

const departuresService = {

    async getDeparturesFromNewYork() {
        const headers: Headers = new Headers(apiRequestHeader);
        return await fetch(
            `https://napi.busbud.com/x-departures/${geo.newYork}/${geo.montreal}/${osheagaStartDate}`,
            { headers },
        ).then((response: Response) => {
            return response.ok ? response.json() : Promise.reject(response.body);
        })
        .then((response) => response)
        .catch((error) => {
            console.error(error);
        });
    }
}

export default departuresService;
