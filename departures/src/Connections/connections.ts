export const API_URL = "https://napi.busbud.com/x-departures";

const token = 'PARTNER_c9g6z7V0SNqUlnar2EFsxw';

const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
        'X-Busbud-Token': token,
    }
}

export interface TQueryParams {
    key: string,
    value: string
}

const GetParamsAsString = (params: Array<TQueryParams>) => {
    let firstParam = true;
    let paramsAsString = '';

    for (const param of params) {
        const prefix = (firstParam) ? '?' : '&';

        if (firstParam) {
            firstParam = false;
        }

        paramsAsString += `${prefix}${param.key}=${param.value}`;
    }

    return paramsAsString;
}

export const fetchDepartures = async (
    _origin: string,
    _destination: string,
    _date: string,
    _queryParams: Array<TQueryParams>
): Promise<any> => {

    const queryParamsString = GetParamsAsString(_queryParams);

    const completeURL = `${API_URL}/${_origin}/${_destination}/${_date}${queryParamsString}`;

    const response = await fetch(completeURL, options);

    const departures = response.json();

    return departures;
}

