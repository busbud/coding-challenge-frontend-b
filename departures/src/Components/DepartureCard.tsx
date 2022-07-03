
import moment from 'moment';
import { TDeparture } from '../Pages/Home';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faCircleDot } from '@fortawesome/free-solid-svg-icons'

interface DepartureCardProps {
    departure: TDeparture
}

export const DepartureCard = (props: DepartureCardProps) => {
    const { departureTime, arrivalTime, locationName_Origin, locationName_Destination, price, currency } = props.departure;

    const _departureTime = FormatDate(departureTime);
    const _arrivalTime = FormatDate(arrivalTime);

    const locationIcon = (locationType: string) => {
        const _icon = (locationType === 'origin') ? faCircleDot : faLocationDot;
        const _size = (locationType === 'origin') ? '12px' : '13px';
        return (
            <div style={{ marginRight: '10px' }}>
                <FontAwesomeIcon icon={_icon} style={{ width: _size, height: _size }} color={'#717578'} />
            </div>
        )
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', backgroundColor: 'white', margin: '16px 4px 16px 4px', border: 'solid 1px #dbdbdb', borderRadius: '4px', padding: '16px 16px 16px 16px', boxShadow: '1px 4px 6px rgba(200, 200, 200, 0.8)' }}>
            <div style={{ flexGrow: 1 }}>
                <div style={{ display: 'flex' }}>
                    {locationIcon('origin')} {_departureTime} - {locationName_Origin}
                </div>
                <div style={{ display: 'flex', marginTop: '10px' }}>
                    {locationIcon('destination')} {_arrivalTime} - {locationName_Destination}
                </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div>{currency}${price}</div>
            </div>
        </div>
    )
}

const FormatDate = (dateString: string) => {
    const date = new Date(dateString);

    const time = moment(date).format('HH:mm');

    return time;
}