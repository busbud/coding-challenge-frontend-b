
import moment from 'moment';
import { DepartureCardProps } from '../Types/Types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faCircleDot } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';

import '../Styles/DepartureCard.css';

export const DepartureCard = (props: DepartureCardProps) => {
    const { departureTime, arrivalTime, locationName_Origin, locationName_Destination, price, currency } = props.departure;

    const _departureTime = FormatDate(departureTime);
    const _arrivalTime = FormatDate(arrivalTime);

    return (
        <div className='d-card-container'>
            <div className='d-card-loc-container'>
                <div className='d-origin-text-container'>
                    <LocationIcon locationType={'origin'} /> {_departureTime} - {locationName_Origin}
                </div>
                <div className='d-destination-text-container'>
                    <LocationIcon locationType={'destination'} /> {_arrivalTime} - {locationName_Destination}
                </div>
            </div>
            <div className='d-card-price-container'>
                <div>
                    <div className='d-price-text'>${price}</div>
                    <div className='d-currency-text'>{currency}</div>
                </div>
                <div>
                    <Button variant="outline-secondary" style={{ borderColor: 'transparent', backgroundColor: 'orange', height: '28px' }}>
                        <div className='d-select-button-text'>Select</div>
                    </Button>
                </div>
            </div>
        </div>
    )
}

const LocationIcon = ({ locationType }: { locationType: string }) => {
    const _icon = (locationType === 'origin') ? faCircleDot : faLocationDot;
    const _size = (locationType === 'origin') ? '12px' : '13px';
    return (
        <div style={{ marginRight: '10px' }}>
            <FontAwesomeIcon icon={_icon} style={{ width: _size, height: _size, marginBottom: '1px' }} color={'#717578'} />
        </div>
    )
}

const FormatDate = (dateString: string) => {
    const date = new Date(dateString);

    const time = moment(date).format('HH:mm');

    return time;
}