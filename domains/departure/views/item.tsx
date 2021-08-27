import { DepartureItem } from 'domains/departure/models';

type Props = {
  departure: DepartureItem
}

export const Item: React.VFC<Props> = ({ departure }) => (
  <>
    <div className="flex justify-between flex-wrap mb-4">
      <img
        className="h-full max-h-6"
        src={departure.operator.getImageLogoUrl('128')}
        alt={departure.operator.displayName}
      />
      <span
        className="text-gray-400 font-bold text-lg"
        data-cy="price"
      >
        {departure.price}
      </span>
    </div>
    <div className="mb-1">
      <span
        className="text-gray-400 font-bold"
        data-cy="departure-time"
      >
        {departure.departureTime}
      </span>
      {' '}
      <span
        className="text-gray-400 font-bold"
        data-cy="origin-city-name"
      >
        {departure.originLocation.city.name}
      </span>
      <span className="text-gray-400">{' - '}</span>
      <span
        className="text-gray-400"
        data-cy="origin-location-name"
      >
        {departure.originLocation.name}
      </span>
    </div>
    <div>
      <span
        className="text-gray-400 font-bold"
        data-cy="arrival-time"
      >
        {departure.arrivalTime}
      </span>
      {' '}
      <span
        className="text-gray-400 font-bold"
        data-cy="destination-city-name"
      >
        {departure.destinationLocation.city.name}
      </span>
      <span className="text-gray-400">{' - '}</span>
      <span
        className="text-gray-400"
        data-cy="destination-location-name"
      >
        {departure.destinationLocation.name}
      </span>
    </div>
  </>
);
