import React, { memo } from 'react';
import format from 'date-fns/format';
import { useTranslation } from 'react-i18next';

import { useDataProvider } from '../contexts/SearchContext';

import './DepartureCard.css';
import { getDepartureDuration } from '../utils/time'
export const DepartureCard = memo(({ item, destinationCity, originCity, destinationLocation, originLocation }) => {
    let duration = getDepartureDuration(item);
    const { t } = useTranslation();
    return <a className="DepartureCard" href="#details" data-testid="departure-card">
        <div className="DepartureCard__time-container">
            <div className="DepartureCard__time">
                <span>{format(new Date(item.departure_time), 'HH:mm')}</span>
                <span>{format(new Date(item.departure_time), 'a')}</span>
            </div>
            <div className="DepartureCard__time hidden-sm">
                {duration.days ? duration.days + 'd' : null}
                {duration.hours ? duration.hours + 'h' : null}
                {duration.minutes ? duration.minutes + 'm' : null}
            </div>
            <div className="DepartureCard__time">
                <span>{format(new Date(item.arrival_time), 'HH:mm')}</span>
                <span>{format(new Date(item.arrival_time), 'a')}</span>
            </div>
        </div>
        <div className="DepartureCard__locations">
            <div className="DepartureCard__location">
                <div>{originCity.name}, {originCity.region.region_code}</div>
                <div>{originLocation.name}</div>
            </div>
            <div className="DepartureCard__location">
                <div>{destinationCity.name}, {destinationCity.region.region_code}</div>
                <div>{destinationLocation.name}</div>

            </div>
        </div>
        <div className="DepartureCard__footer">
            <div className="DepartureCard__details">
                {t("Details")}
            </div>
            <div className="DepartureCard__price">
                <span>{item.prices.total / 100} </span>
                <span>{item.prices.currency}</span>
            </div>
        </div>
    </a>
});

const DepartureCardConnected = ({ item }) => {
    const { cities, locations } = useDataProvider();
    const destinationLocation = locations[item.destination_location_id] || {};
    const originLocation = locations[item.origin_location_id] || {};
    const destinationCity = cities[destinationLocation.city_id];
    const originCity = cities[originLocation.city_id];

    if (!destinationCity || !originCity) {
        return <div>Loading...</div>;
    }

    return <DepartureCard
        item={item}
        destinationLocation={destinationLocation}
        originLocation={originLocation}
        destinationCity={destinationCity}
        originCity={originCity}
    />;
}

export default DepartureCardConnected;
