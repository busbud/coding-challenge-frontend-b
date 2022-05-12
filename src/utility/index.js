const processDate = (dateTime, timeZone) => {
	const date = new Date(dateTime);
	const options = {
		timeZone,
		timeStyle: "short",
	};

	return date.toLocaleString("en-US", options);
};

const calculateDuration = (departureDateTime, arrivalDateTime) => {
	const departureDate = new Date(departureDateTime);
	const arrivalDate = new Date(arrivalDateTime);

	const diff = arrivalDate.getTime() - departureDate.getTime();
	const diffInMinutes = diff / 60000;
	const hours = Math.floor(diffInMinutes / 60);
	const minutes = Math.floor(diffInMinutes % 60);

	return `${hours}h${minutes ? ` ${minutes}m` : ""}`;
};

export const processDepartures = (results) => {
	const { departures, locations, cities, operators } = results;

	const processedDepartures = departures?.map((departure) => {
		const originLocation = locations?.find(
			(location) => location?.id === departure?.origin_location_id
		);
		const destinationLocation = locations?.find(
			(location) => location?.id === departure?.destination_location_id
		);

		const originCity = cities?.find(
			(city) => city?.id === originLocation?.city_id
		);
		const destinationCity = cities.find(
			(city) => city?.id === destinationLocation?.city_id
		);

		const departureTime = processDate(
			departure?.departure_time,
			departure?.departure_timezone
		);
		const arrivalTime = processDate(
			departure?.arrival_time,
			departure?.arrival_timezone
		);

		const duration = calculateDuration(
			departure?.departure_time,
			departure?.arrival_time
		);

		const from = `${originCity?.name} - ${originLocation?.name}`;
		const to = `${destinationCity?.name} - ${destinationLocation?.name}`;

		const operator = operators?.find(
			(operator) => operator?.id === departure?.operator_id
		);

		const price = new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: departure?.prices?.currency,
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(departure?.prices?.total);

		return {
			id: departure?.id,
			departureTime,
			arrivalTime,
			duration,
			from,
			to,
			price,
			operatorLogo: operator?.logo_url ?? "",
			operatorName: operator?.display_name ?? "",
			busbudUrl: departure?.links?.deeplink,
		};
	});

	return processedDepartures;
};
