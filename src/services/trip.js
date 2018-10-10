const API_URL = 'https://napi.busbud.com';
const PREFIX_LIST = 'x-departures';
const ACCEPT = 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/';
const TOKEN = 'PARTNER_AHm3M6clSAOoyJg4KyCg7w';

const INIT = {
	method: 'GET',
	headers: new Headers({
		Accept: ACCEPT,
		'X-Busbud-Token': TOKEN
	})
};

export async function list(origin, destination, date, queryParams = null){
	const url = `${API_URL}/${PREFIX_LIST}/${origin}/${destination}/${date}${queryParams ? '?' + queryParams : ''}`;
	const response = await fetch(url, INIT);
	return await response.json();
}

export async function pollList(origin, destination, date, queryParams = null){
	const url = `${API_URL}/${PREFIX_LIST}/${origin}/${destination}/${date}/poll${queryParams ? '?' + queryParams : ''}`;
	const response =  await fetch(url, INIT);
	return await response.json();
}