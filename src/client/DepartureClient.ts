import { Departure, Destination } from '../domain/types';
import HttpClient from './HttpClient';
import { formatISO } from 'date-fns';

const toDestination = ({
  city,
  locationId,
  departureTime,
  locations,
}: {
  city: string;
  locationId: string;
  departureTime: string;
  locations: any[];
}): Destination => {
  return {
    city,
    location:
      locations.find((location) => location.id === locationId).name ?? '',
    time: new Date(departureTime),
  };
};

const toDeparture = (
  departureDTO: any,
  {
    operators,
    locations,
    originCity,
    arrivalCity,
  }: {
    operators: any[];
    locations: any[];
    originCity: string;
    arrivalCity: string;
  },
): Departure => {
  return {
    id: departureDTO.id,
    operator:
      operators.find((operator) => operator.id === departureDTO.operator_id)
        .name ?? '',
    origin: toDestination({
      locations,
      city: originCity,
      locationId: departureDTO.origin_location_id,
      departureTime: departureDTO.departure_time,
    }),
    arrival: toDestination({
      locations,
      city: arrivalCity,
      locationId: departureDTO.destination_location_id,
      departureTime: departureDTO.arrival_time,
    }),
    availableSeats: departureDTO.available_seats,
    price: departureDTO.prices.total / 100,
    currency: departureDTO.prices.currency,
  };
};

class DepartureClient {
  public static async list(
    origin: string,
    destination: string,
    outboundDate: Date,
  ): Promise<any> {
    const response = await HttpClient.get(
      `/x-departures/${origin}/${destination}/${formatISO(outboundDate, {
        representation: 'date',
      })}`,
    );

    const mappingParams = {
      operators: response.operators,
      locations: response.locations,
      originCity:
        response.cities.find((city: any) => city.id === response.origin_city_id)
          .name ?? '',
      arrivalCity:
        response.cities.find(
          (city: any) => city.id === response.destination_city_id,
        ).name ?? '',
    };

    return response.departures.map((departure: any) =>
      toDeparture(departure, mappingParams),
    );
  }
}

export default DepartureClient;
