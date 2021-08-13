import '../styles/ServiceOption.scss';
import React from 'react';
import { IAmenities, IDeparture, ISearchResponseDTO } from '../api/dtos/ISearchResponseDTO';

const ServiceOption = ({ searchResult = {} as ISearchResponseDTO }: Props) => {
  // @ts-ignore
  const { departures = [], locations = [], operators = [] } = searchResult;
  return (
    <div className="serviceProviders">
      {departures.map(
        ({
          arrival_time = '',
          departure_time = '',
          prices,
          available_seats,
          destination_location_id,
          origin_location_id,
          id,
          amenities = {} as IAmenities,
          source_id,
        }: IDeparture) => {
          const { total = 0, currency } = prices;
          const { wifi, ac, food, tv, toilet } = amenities;

          const originLocation = locations.filter(({ id }: any) => id === origin_location_id)[0];
          const { name: originName } = originLocation;

          const destinationLocation = locations.filter(({ id }: any) => id === destination_location_id)[0];
          const { name: destinationName } = destinationLocation;

          const provider =
            operators.filter(({ source_id: operatorSourceId }: any) => source_id === operatorSourceId)[0] || {};
          const { logo_url } = provider;

          return (
            <div className="provider" key={id}>
              <div className="money">
                <div>
                  {(total / 100).toLocaleString('en-US', {
                    style: 'currency',
                    currency: currency,
                  })}
                </div>
              </div>

              <div className="image">
                <img src={logo_url} alt="new" />
              </div>

              <div className="providerDetails">
                <label htmlFor="time-from">
                  Departure: {arrival_time.split('T')[1]} - {originName}{' '}
                </label>
              </div>

              <div className="providerDetails">
                <label htmlFor="time-to">
                  Arrival: {departure_time.split('T')[1]} - {destinationName}
                </label>
              </div>

              <div className="extraInfo">
                <label htmlFor="availableSeats">Available seats: {available_seats}</label>
              </div>

              <div className="extraInfo">
                <label htmlFor="features">Available features:</label>
                {wifi && <label htmlFor="features"> Wifi </label>}
                {ac && <label htmlFor="features"> AC </label>}
                {food && <label htmlFor="features"> Food </label>}
                {tv && <label htmlFor="features"> TV </label>}
                {toilet && <label htmlFor="features"> Toilet </label>}
              </div>
            </div>
          );
        },
      )}
    </div>
  );
};

export default ServiceOption;

interface Props {
  searchResult: object; //ISearchResponseDTO;
}
