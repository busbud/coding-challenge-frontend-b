import { DepartureItem } from 'domains/departure/models';

type Props = {
  departure: DepartureItem
}

export const Item: React.VFC<Props> = ({ departure }) => (
  <>
    {/* TODO set image height */}
    <div className="flex justify-between flex-wrap mb-4">
      <img
        className="h-full max-h-6"
        src={departure.operator.getImageLogoUrl('128')}
        alt={departure.operator.displayName}
      />
      <span className="text-gray-400 font-bold text-lg">{departure.price}</span>
    </div>
    <div className="text-sm">
      <div className="mb-1">
        <span className="text-gray-400 font-bold">{departure.departureTime}</span>
        {' '}
        <span className="text-gray-400 font-bold">{departure.originLocation.city.name}</span>
        <span className="text-gray-400">{' - '}</span>
        <span className="text-gray-400">{departure.originLocation.name}</span>
      </div>
      <div>
        <span className="text-gray-400 font-bold">{departure.arrivalTime}</span>
        {' '}
        <span className="text-gray-400 font-bold">{departure.destinationLocation.city.name}</span>
        <span className="text-gray-400">{' - '}</span>
        <span className="text-gray-400">{departure.destinationLocation.name}</span>
      </div>
    </div>
  </>
);
