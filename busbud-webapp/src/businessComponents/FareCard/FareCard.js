import React from 'react';
import PropTypes from 'prop-types';
import { formatLocalTime } from '../../utils/date.utils';
import s from './FareCard.module.css';
import { formatCurrency } from '../../utils/number.utils';

// For a production app,  I would also extract at least Price component
// and possibly Arrival/Departure components

const FareCard = ({
    departure_time,
    arrival_time,
    id,
    arrival_location,
    departure_location,
    total_price,
    currency,
    departure_origin,
    arrival_origin,
}) => {
    const formattedDepartureTime = formatLocalTime(departure_time);
    const formattedArrivalTime = formatLocalTime(arrival_time);
    return (
        <div className={s.contentWrapper} key={`id_${id}`}>
            <div className={s.summary}>
                <section className={s.originInfo} data-testid="originSection">
                    <span className={s.action}>Departure:</span>
                    <span data-testid={`departureTime_${id}`}>{formattedDepartureTime}</span>
                    <span>{departure_origin}</span>
                    <span className={s.location} data-testid={`departureLocation_${id}`}>
                        {departure_location}
                    </span>
                </section>
                <section className={s.destinationInfo} data-testid="destinationSection">
                    <span className={s.action}>Arrival:</span>
                    <span data-testid={`arrivalTime_${id}`}>{formattedArrivalTime}</span>
                    <span>{arrival_origin}</span>
                    <span className={s.location} data-testid={`arrivalLocation_${id}`}>
                        {arrival_location}
                    </span>
                </section>
            </div>
            <section className={s.price} data-testid={`totalPrice_${id}`}>
                {formatCurrency(total_price, currency)}
            </section>
        </div>
    );
};

FareCard.propTypes = {
    departure_time: PropTypes.string.isRequired,
    arrival_time: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    arrival_location: PropTypes.string.isRequired,
    departure_location: PropTypes.string.isRequired,
    total_price: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    departure_origin: PropTypes.string.isRequired,
    arrival_origin: PropTypes.string.isRequired,
};

export default FareCard;
