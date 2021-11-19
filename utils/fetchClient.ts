import { HttpResponse } from '../interfaces';

type busBudApiParams = {
    uri: string;
    query: object;
};

type fetchClientParams = {
    url: string;
    headers: object;
    method: string;
};

/**
 * Wrapper for Busbud api.
 * Builds full URL and adds Busbud specific headers
 */
export const busBudApi = async <T>({ uri, query }: busBudApiParams): Promise<HttpResponse<T>> => {
    const url = new URL(`https://napi.busbud.com${uri}`);
    url.search = new URLSearchParams({ ...query }).toString();
    return await fetchClient({
        url: url.toString(),
        method: 'get',
        headers: {
            'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
            'X-Busbud-Token': process.env.NEXT_PUBLIC_BUSBUD_TOKEN,
        },
    });
};

/**
 * Returns response with parsed json body
 */
const fetchClient = async <T>({ url, headers, method }: fetchClientParams): Promise<HttpResponse<T>> => {
    const response: HttpResponse<T> = await fetch(url, {
        method,
        headers: { ...headers },
    });
    try {
        response.parsedBody = await response.json();
    } catch (error) {
        throw new Error(error);
    }
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response;
};

export default fetchClient;