import { TQueryParams } from '../Types/Types';

export const API_URL = "https://napi.busbud.com/x-departures";

const token = 'PARTNER_c9g6z7V0SNqUlnar2EFsxw';

const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
        'X-Busbud-Token': token,
    }
}

const GetParamsAsString = (params: TQueryParams) => {
    let firstParam = true;
    let paramsAsString = '';

    let keys = Object.keys(params);

    for (const param of keys) {
        const prefix = (firstParam) ? '?' : '&';

        if (firstParam) {
            firstParam = false;
        }

        const value = params[param as keyof TQueryParams];

        paramsAsString += `${prefix}${param}=${value}`;
    }

    return paramsAsString;
}

export const fetchDepartures = async (
    _origin: string,
    _destination: string,
    _date: string,
    _queryParams: TQueryParams
): Promise<any> => {

    const queryParamsString = GetParamsAsString(_queryParams);

    const completeURL = `${API_URL}/${_origin}/${_destination}/${_date}${queryParamsString}`;

    const response = await fetch(completeURL, options);

    const departures = response.json();

    return departures;
}

