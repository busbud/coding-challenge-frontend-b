import React, { memo } from 'react';
import './LocationCard.css';

export const LocationCard = ({ item }) => {
    console.log(item.id, item.name);

    return <div>
        <a className="LocationCard" href="">{item.id} - {item.name}</a>
    </div>
}

export default memo(LocationCard)

