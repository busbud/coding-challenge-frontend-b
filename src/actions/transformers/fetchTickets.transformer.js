import getGmapsUrl from '../getGmapsUrl';

export default function fetchTickets({ data, partners = {}, locations = {}, tickets = [] }) {
	const partnersMapped = data.operators.reduce((mem, operator) => {
		// noinspection Eslint
		mem[operator.id] = {
			...operator,
			name: operator.display_name,
			logo: operator.logo_url,
		};
		return mem;
	}, partners);
	const locationsMapped = data.locations.reduce((mem, location) => {
		// noinspection Eslint
		mem[location.id] = {
			...location,
			url: getGmapsUrl(location.name),
		};
		return mem;
	}, locations);
	return {
		expires: data.ttl,
		complete: data.complete,
		tickets: data.departures.map(departure => {
			const partner = partnersMapped[departure.operator_id];
			return {
				id: departure.id,
				price: departure.prices.total,
				currency: departure.prices.currency,
				url: departure.links.deeplink,
				departure: departure.departure_time,
				arrival: departure.arrival_time,
				duration: departure.duration,
				transfers: parseInt(
					departure.num_transfers || (departure.details && departure.details.num_transfers) || 0,
					10
				),
				review: partner.review_state,

				origin: locationsMapped[departure.origin_location_id],
				destination: locationsMapped[departure.destination_location_id],

				operatorId: departure.operator_id,
				operatorLogo: partner.logo,
				operatorUrl: partner.url,
				operatorName: partner.name,
			};
		}).concat(tickets),
		locations: locationsMapped,
		partners: partnersMapped,
	};
}
