import React from 'react';

import './card-list.styles.scss';
import Card from '../card/card.component';

export const CardList = ({departures, locations, cities}) => (
    <div className='card-list'>
        {departures.map(data => {
                const destination = locations.find((item) => item.id === data.destination_location_id).name
                const origin = locations.find((item) => item.id === data.origin_location_id).name
                return <Card key ={data.id} departures={data} destinations={destination} origin={origin} cities={cities}/>
            })
        }
    </div>
)

export default CardList;