import { useTranslation } from '@/i18n';
import { Departure } from '@/store/departures/state';
import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import BudButton from '@/components/BudButton/BudButton';
import fade from '@/styles/transitions/fade.module.scss';
import { snakeToSentence } from '@/utils/stringUtils';
import classnames from 'classnames';
import { Operator } from '@/store/operators/state';
import styles from './styles.module.scss';
import {
  CheckMarkIcon,
  CloseIcon,
  HourGlassIcon,
  LocationCurrentIcon,
  LocationIcon,
  NavigationMoreIcon,
} from '../BudIcons';

export type BudTravelCardProps = {
  departure: Departure;
  operator?: Operator;
};

/**
 *
 * @param date1 - A date string to be compared
 * @param date2 - A date string to be compared with the first one
 */
const totalTravelTime = (date1: string, date2: string) => {
  const diff = (new Date(date1).getTime() - new Date(date2).getTime()) / 1000 / 60;
  const hour = String(Math.floor(diff / 60)).padStart(2, '0');
  const minutes = String(diff % 60).padStart(2, '0');
  return `${hour}h:${minutes}m`;
};

const BudTravelCard: React.FC<BudTravelCardProps> = ({
  departure,
  operator,
}) => {
  const [t, i18n] = useTranslation('common');
  const [showDetails, setShowDetails] = useState(false);

  const toDate = (dateString: string) =>
    new Intl.DateTimeFormat(i18n.language, {
      hour: 'numeric',
      minute: 'numeric',
    }).format(Date.parse(dateString));

  const toNumberFormat = (price: number) =>
    new Intl.NumberFormat(i18n.language).format(price);

  return (
    <div className="transition duration-200 ease-in-out border border-gray-300 shadow rounded mt-8 max-w-xl mx-auto px-8 py-4 bg-white hover:bg-gray-100 relative">
      <img className="w-32" src={operator?.logo_url} aria-hidden alt="" />
      <div className="flex flex-row mt-4">
        <LocationCurrentIcon
          className={classnames([
            'w-3 mr-2 fill-current text-teal-500',
            styles.icon,
          ])}
        />
        <h6 className="mr-2">
          {t('Departure')}
          :
        </h6>
        <p>{toDate(departure?.departure_time)}</p>
        <p className="hidden sm:block">
          &nbsp;-&nbsp;
          {departure?.trip_stops[0]?.name}
        </p>
      </div>
      <div>
        <NavigationMoreIcon className="w-3 transform rotate-90" />
      </div>
      <div className="flex flex-row">
        <LocationIcon
          className={classnames([
            'w-3 mr-2 fill-current text-indigo-600',
            styles.icon,
          ])}
        />
        <h6 className="mr-2">
          {t('Arrival')}
          :
        </h6>
        <p>{toDate(departure?.arrival_time)}</p>
        <p className="hidden sm:block">
          &nbsp;-&nbsp;
          {departure?.trip_stops[departure.trip_stops.length - 1]?.name}
        </p>
      </div>
      <p className="sm:hidden mt-4">
        {t('From')}
        :&nbsp;
        {departure?.trip_stops[0]?.name}
      </p>
      <p className="sm:hidden">
        {t('To')}
        :&nbsp;
        {departure?.trip_stops[departure.trip_stops.length - 1]?.name}
      </p>

      <div className="mt-4 flex" title={t('Total time')}>
        <HourGlassIcon className="w-3 fill-current text-blue-500 mr-2" />
        <p>
          {totalTravelTime(departure.arrival_time, departure.departure_time)}
        </p>
      </div>

      <div className="flex flex-row sm:absolute right-0 top-0 pr-0 sm:pr-8 pt-4 items-center">
        <p className="flex-1">
          <span>
            {departure.prices.currency}
            {' '}
          </span>
          <strong className="text-gray-900">
            {toNumberFormat(departure?.prices?.total)}
          </strong>
        </p>
        <div className="sm:absolute right-0 sm:pr-8 sm:pt-12 sm:top-0 ml-2">
          <BudButton
            onClick={() =>
              setShowDetails(!showDetails)}
            size="sm"
          >
            {t('Details')}
          </BudButton>
        </div>
      </div>
      <CSSTransition
        in={showDetails}
        timeout={200}
        unmountOnExit
        classNames={fade}
      >
        <div className="py-4">
          <h6>
            {t('Amenities')}
            :
          </h6>
          <ul className="mt-3">
            {Object.entries(departure.amenities).map(
              ([key, value]) =>
                typeof value !== 'string' && (
                  <li key={Math.random()} className="flex capitalize">
                    {value ? (
                      <CheckMarkIcon
                        className={classnames([
                          'w-3 fill-current text-teal-700',
                          styles.icon,
                        ])}
                      />
                    ) : (
                      <CloseIcon className="w-3 fill-current text-red-700" />
                    )}
                    &nbsp;
                    {t(snakeToSentence(key))}
                  </li>
                )
            )}
          </ul>
        </div>
      </CSSTransition>
    </div>
  );
};

export default BudTravelCard;
