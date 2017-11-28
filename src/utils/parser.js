import moment from 'moment';

const findElementById = (elements, id) => {
    return elements.find((location) => {
        return location.id === id;
    });
}

const formatDate = (date) => {
    return moment(date).format('DD-MM-YYYY HH:mm');
}

const formatCents = (price) => {
    return parseFloat(parseInt(price) / 100).toFixed(2);
}

const parser = (response) => {

    return response.departures.map((departure) => {

        let originLocation = findElementById(response.locations, departure.origin_location_id);
        let destinationLocation = findElementById(response.locations, departure.destination_location_id);
        let operator = findElementById(response.operators, departure.operator_id);
        
        return {
            originLocationName: originLocation.name,
            departureTime: formatDate(departure.departure_time),
            destinationLocationName: destinationLocation.name,
            arrivalTime: formatDate(departure.arrival_time),
            price: formatCents(departure.prices.total),
            currency:departure.prices.currency,
            operator:operator.name
        }

    })

}

export default parser