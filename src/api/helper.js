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
        amenities: departure.amenities,
        terms: departure.terms
    };
};

export const compressedDepartureObj = (departures, language = 'en') => {
    const dictionary = {};

    departures.forEach(d => {
        if (!dictionary[d.operator.display_name]) {
            dictionary[d.operator.display_name] = {
                duration: [d.totalDuration],
                destination: {},
                about: [],
                origin: {},
                location: {},
                logo: d.operator.logo_url
            };

            dictionary[d.operator.display_name].about = [
                {
                    departureTime: d.departureTime,
                    arrivalTime: d.arrivalTime,
                    origin: d.origin.name,
                    destination: d.destination.name,
                    price: d.price,
                    currency: d.currency,
                    amenities: d.amenities,
                    terms: d.terms
                }
            ];

            dictionary[d.operator.display_name]['location'][
                d.origin.name.concat('|').concat(d.destination.name)
            ] = 1;
            dictionary[d.operator.display_name]['origin'][d.origin.name] = 1;
            dictionary[d.operator.display_name]['destination'][d.destination.name] = 1;
        } else {
            dictionary[d.operator.display_name]['origin'][d.origin.name] = 1;
            dictionary[d.operator.display_name]['destination'][d.destination.name] = 1;
            dictionary[d.operator.display_name]['location'][
                d.origin.name.concat('|').concat(d.destination.name)
            ] = 1;

            dictionary[d.operator.display_name].about.push({
                departureTime: d.departureTime,
                arrivalTime: d.arrivalTime,
                origin: d.origin.name,
                destination: d.destination.name,
                price: d.price,
                currency: d.currency,
                amenities: d.amenities,
                terms: d.terms
            });
        }
    });

    for (let prop in dictionary) {
        dictionary[prop].about = dictionary[prop].about.filter(
            (elem, pos, arr) => {
                const matches = arr.findIndex(
                    a =>
                        a.departureTime === elem.departureTime &&
                        a.arrivalTime === elem.arrivalTime
                );

                elem.price = arr
                    .filter(
                        a =>
                            a.departureTime === elem.departureTime &&
                            a.arrivalTime === elem.arrivalTime
                    )
                    .map(a => ({
                        price: a.price,
                        currency: a.currency,
                        amenities: a.amenities,
                        terms: a.terms
                    }));
                return pos === matches;
            }
        );
    }
    return dictionary;
};

export const getDestination = obj => {
    return obj.departures.map(d =>
        departureObj(d, obj.locations, obj.operators)
    );
};
