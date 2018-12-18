import geo from "@/utils/geo";
import { startDate as osheagaStartDate } from "@/utils/festivalDates";
import { apiRequestHeader } from "@/utils/bubudRequestHelper"

class Departures {

    async getDeparturesFromNewYork() {
        const headers: Headers = new Headers(apiRequestHeader);
        await fetch(
            `https://napi.busbud.com/x-departures/${geo.newYork}/${geo.montreal}/${osheagaStartDate}`,
            { headers },
        );
    }
}

export default new Departures();