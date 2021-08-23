import { Departure } from 'domains/departure';

type Props = {
  departure: Departure
}

export const Card: React.VFC<Props> = ({ departure }) => (
  <div>
    {/* TODO set image height */}
    <img src={departure.operator.logoUrl} alt={departure.operator.displayName} />
    <ul>
      <li>
        {departure.departureTime}
        {' '}
        {departure.originLocation.city.name}
        {' '}
        -
        {' '}
        {departure.originLocation.name}
      </li>
      <li>
        {departure.arrivalTime}
        {departure.destinationLocation.city.name}
        {' '}
        -
        {' '}
        {departure.destinationLocation.name}
      </li>
    </ul>
    <b>{departure.priceTotal}</b>
    <a href={departure.link}>Select</a>
  </div>
);
