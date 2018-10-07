const departureObj = (departure, locations, operators) => {
    let origin, destination, operator;

    locations.forEach(loc => {
        if (loc.id === departure.origin_location_id) {
            origin = loc;
        }
        if (loc.id === departure.destination_location_id) {
            destination = loc;
        }
        return origin && destination; //break statement
    });

    operators.forEach(op => {
        if (op.id === departure.operator_id) {
            operator = op;
        }
        return operator; //break statement
    });

    const price = departure.prices.total / 100; //2 decimal places
    const duration_in_hours = Math.floor(departure.duration / 60); //convert to hours
    const duration_in_minutes = departure.duration % 60; //get minutes

    return {
        id: departure.id,
        origin: origin,
        departureTime: departure.departure_time,
        arrivalTime: departure.arrival_time,
        currency: departure.prices.currency,
        totalDuration: departure.duration,
        duration: `${duration_in_hours}h ${duration_in_minutes}m`,
        price: price,
        destination: destination,
        operator: operator,
        amenities: departure.amenities
    };
};

export const getDestination = obj => {
    return obj.departures.map(d =>
        departureObj(d, obj.locations, obj.operators)
    );
};