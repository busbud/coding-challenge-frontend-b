/**
 * Parse polling result
 * Return a list of parsed info,
 * such as departure time, arrival time,
 * location name and price
 */
const ParsePollRes = (departures, locations, operators) => {
    try {
        // find all info by departure
        return departures.map(dep => {
            const departure = locations.find(loc => loc.id === dep.origin_location_id)
            const arrival = locations.find(loc => loc.id === dep.destination_location_id)
            const operator = operators.find(op => op.id === dep.operator_id)

            return {
                'departure': departure.name,
                'departureAddress': departure.address.join(','),
                'departureTime': dep.departure_time.substring(11, 19),
                'arrival': arrival.name,
                'arrivalAddress': arrival.address.join(','),
                'arrivalTime': dep.arrival_time.substring(11, 19),
                'price': (dep.prices?.total / 100).toFixed(2),
                'currency': dep.prices?.currency,
                'operatorUrl': operator.url,
                'operatorLogoUrl': operator.logo_url,
            }
        })
    }
    catch(e) {
        return null;
    }
    
}

export default ParsePollRes