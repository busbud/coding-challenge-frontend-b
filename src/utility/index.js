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
	const {
		departures = [],
		locations = [],
		cities = [],
		operators = [],
	} = results;

	// locations object -> key: id, value: info
	const locationsMap = locations.reduce((acc, location) => {
		acc[location.id] = location;
		return acc;
	}, {});

	// cities object -> key: id, value: info
	const citiesMap = cities.reduce((acc, city) => {
		acc[city.id] = city;
		return acc;
	}, {});

	// operators object -> key: id, value: info
	const operatorsMap = operators.reduce((acc, operator) => {
		acc[operator.id] = operator;
		return acc;
	}, {});

	const processedDepartures = departures?.map((departure) => {
		const originLocation = locationsMap[departure?.origin_location_id];
		const destinationLocation =
			locationsMap[departure?.destination_location_id];

		const originCity = citiesMap[originLocation?.city_id];
		const destinationCity = citiesMap[destinationLocation?.city_id];

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

		const operator = operatorsMap[departure?.operator_id];

		// convert from cents to dollars and round to 0 decimal places
		const price = (departure?.prices?.total / 100).toLocaleString("en-US", {
			style: "currency",
			currency: departure?.prices?.currency,
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		});

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
