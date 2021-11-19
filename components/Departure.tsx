import React from 'react';
import Image from 'next/image';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import dayjs from 'dayjs';
import PurchaseButton from './PurchaseButton';

import { DeparturesFullEntity } from '../interfaces/response';

const dateFormat = 'hh:mm a';

const Departure = ({ departure }: { departure: DeparturesFullEntity}) => {
    return (
        <Card sx={{ width: '80%', m: 3, minWidth: '300px' }}>
            <CardHeader
                avatar={
                    <Avatar aria-label={departure.operator.name}>
                        <Image src={departure.operator.logo_url} layout='fill' />
                    </Avatar>
                }
                action={
                    <PurchaseButton price={departure.prices.total} link={departure.links.deeplink} />
                }
                title={`${departure.originLocation.cityName} - ${departure.originLocation.name}`}
                subheader={`${departure.destinationLocation.cityName} - ${departure.destinationLocation.name}`}
            />
            <CardContent>
                Departure: {dayjs(departure.departure_time).format(dateFormat)}
                <br/>
                Arrival: {dayjs(departure.arrival_time).format(dateFormat)}
            </CardContent>
        </Card>
    )
};

export default Departure;