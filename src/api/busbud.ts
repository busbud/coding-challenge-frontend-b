import axios from 'axios';

const busbudAPI = axios.create(
    {
        baseURL: 'https://napi.busbud.com/x-departures/',
        headers: {
            Accept: "application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/",
            "X-Busbud-Token": 'PARTNER_AHm3M6clSAOoyJg4KyCg7w'
        }
    }
);

export const getResults = (origin: string, destination: string, outboundDate: string, params: any) => {
    const url = `${origin}/${destination}/${outboundDate}`
    return (
        busbudAPI.get(url, {
            params: params
        })
            .then(response => {
                return response.data
            })
    )
};

export const getPollResults = (origin: string, destination: string, outboundDate: string, params: any) => {
    const url = `${origin}/${destination}/${outboundDate}/poll`;
    return (
        busbudAPI.get(url, {
            params: params
        })
            .then(response => {
                return response.data
            })
    )
}

