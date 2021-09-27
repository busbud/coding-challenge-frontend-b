import http from './common';

class DepartureService {
    
    GEOHASH: Record<string, string>  = {
        'Québec': 'f2m673',
        'Montréal': 'f25dvk',
    }

    getDepartures = ( {origin, destination, date, passengerCount, poll = false, departureCount }: any): any => {

        let baseUrl = `/x-departures/${this.GEOHASH[origin]}/${this.GEOHASH[destination]}/${date}`;
        const passengerCountQuery = `adult=${passengerCount}`

        if(poll) {
            baseUrl += `/poll?${passengerCountQuery}&index=${departureCount}`
        } else {
            baseUrl += `?${passengerCountQuery}`
        }

        console.log(baseUrl);


        return http.get(baseUrl);
    };
}

export default new DepartureService();
