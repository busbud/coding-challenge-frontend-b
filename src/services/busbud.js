import axios from 'axios'

export default class Busbud {
    
    constructor(){
        this.config = {
            baseURL: 'https://napi.busbud.com/',
            headers: {
                'X-Busbud-Token': 'PARTNER_JSWsVZQcS_KzxNRzGtIt1A',
                'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/'
            }
        }
    }

    getDepartures(payload){

        const { 
            originHash,
            destinationHash,
            outboundDate
        } = payload;

        this.config.params = {
            adults:payload.adults,
            child: payload.child,
            senior: payload.senior,
            lang: payload.lang,
            currency: payload.currency
        }
        
        const endpoint = `/x-departures/${originHash}/${destinationHash}/${outboundDate}`
    
        return axios.get(endpoint,this.config);
    
    } 
}

