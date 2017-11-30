import axios from 'axios-jsonp-pro';

const host = 'https://napi.busbud.com';

const api = {

    basicHeader : function() {
        return { 
            headers: {             
                'Accept':'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
                'X-Busbud-Token':'PARTNER_JSWsVZQcS_KzxNRzGtIt1A'
            } 
        }
    },

    initialSearchDepartures : function(payload) {
        return axios.get(`${host}/x-departures/${payload.origin}/${payload.destination}/${payload.outbound_date}`, this.basicHeader())
    },

    pollDepartures : function(payload, index) {
        return axios.get(`${host}/x-departures/${payload.origin}/${payload.destination}/${payload.outbound_date}/poll?index=${index}`, this.basicHeader())
    }

}

export default api