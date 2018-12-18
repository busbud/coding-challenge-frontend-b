import geo from "@/utils/geo";
import { startDate as osheagaStartDate } from "@/utils/festivalDates";

class Departures {
    async getDeparturesFromNewYork() {
        await fetch(`https://napi.busbud.com/x-departures/${geo.newYork}/${geo.montreal}/${osheagaStartDate}`);
    }
}

export default new Departures();