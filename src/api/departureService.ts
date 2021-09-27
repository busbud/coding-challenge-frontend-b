import type { AxiosResponse } from 'axios';
import type { DepartureRequestParameters } from 'src/types';

import http from './common';

class DepartureService {
    GEOHASH: Record<string, string> = {
        Québec: 'f2m673',
        Montréal: 'f25dvk',
    };

    getDepartures = ({
        origin,
        destination,
        date,
        passengerCount,
        poll = false,
        departureCount,
    }: DepartureRequestParameters): Promise<AxiosResponse<unknown>> => {
        let baseUrl = `/x-departures/${this.GEOHASH[origin]}/${this.GEOHASH[destination]}/${date}`;
        if (poll) {
            baseUrl += `/poll?index=${departureCount}`;
        } else {
            baseUrl += `?adult=${passengerCount}`;
        }
        return http.get(baseUrl);
    };
}

export default new DepartureService();
