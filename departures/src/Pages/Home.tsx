import React, { useState, useEffect } from 'react';

import { Alert, Container, Row, Col } from 'react-bootstrap';

import { fetchDepartures, TQueryParams } from '../Connections/connections';

import { BusbudLogo } from '../Components/Icons';

export const origin = "f2m673"; //(Québec - geohash: f2m673)
export const destination = "f25dvk"; //(Montréal - geohash: f25dvk)
export const date = "2022-08-02"; //(the 2nd of August 2021) for 1 adult.

export const queryParams: Array<TQueryParams> = [
    { key: 'adult', value: '1' },
    { key: 'child', value: '0' },
    { key: 'senior', value: '0' },
    { key: 'lang', value: 'EN' },
    { key: 'currency', value: 'CAD' },
];

const busbudColorLight = '#def7fb';
const busbudColorDark = '#edfcf9';
const titleTextColor = '#0274ca';

interface TDeparture {
    id: string,
    departureTime: string,
    arrivalTime: string,
    locationName_Origin: string,
    locationName_Destination: string,
    price: number
}

const Home = () => {
    const [departures, setDepartures] = useState<Array<TDeparture>>([]);

    const fetchDeparturesFromAPI = async () => {
        const data = await fetchDepartures(origin, destination, date, queryParams);

        const _locations = data.locations;
        const _cities = data.cities;

        //console.log('DATA ', data);

        const _departures: Array<TDeparture> = data.departures.map((item: any) => {

            const itemLocation_Origin = _locations.filter((loc: any) => loc.id === item.origin_location_id)[0];
            const itemLocation_Destination = _locations.filter((loc: any) => loc.id === item.destination_location_id)[0];

            const itemCity_Origin = _cities.filter((city: any) => city.id === itemLocation_Origin.city_id)[0];
            const itemCity_Destination = _cities.filter((city: any) => city.id === itemLocation_Destination.city_id)[0];

            const locationName_Origin = `${itemCity_Origin.name} - ${itemLocation_Origin.name}`;
            const locationName_Destination = `${itemCity_Destination.name} - ${itemLocation_Destination.name}`;

            return {
                id: item.id,
                departureTime: item.departure_time,
                arrivalTime: item.arrival_time,
                locationName_Origin,
                locationName_Destination,
                price: item.prices.total
            }
        });

        setDepartures(_departures);

        console.log('Departures Result = ', _departures);
    }

    useEffect(() => {
        fetchDeparturesFromAPI();
    }, []);

    return (
        <div className="HomeContainer">
            {/* {Alerts()} */}
            {Form(departures)}
        </div>
    );
}

const Alerts = () => {
    return (
        <div>
            {['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'].map((variant) => (
                <Alert key={variant} variant={variant}>
                    This is a {variant} alert—check it out!
                </Alert>
            ))}
        </div>
    )
}

interface DepartureCardProps {
    departure: TDeparture
}
const DepartureCard = (props: DepartureCardProps) => {
    const { departureTime, arrivalTime, locationName_Origin, locationName_Destination, price } = props.departure;

    return (
        <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'beige', margin: '4px' }}>
            <div style={{ flexGrow: 1 }}>
                <div>{departureTime} - {locationName_Origin}</div>
                <div>{arrivalTime} - {locationName_Destination}</div>
            </div>
            <div style={{ width: '120px' }}>
                <div>{price}</div>
            </div>
        </div>
    )
}

const Form = (departures: Array<TDeparture>) => {
    return (
        <Container style={{ backgroundColor: busbudColorDark }}>
            <Row style={{ backgroundColor: busbudColorLight }}>
                <Col>
                    <div style={{ display: 'flex', color: titleTextColor, justifyContent: 'flex-start', padding: '4px 10px 4px 10px' }}>
                        <BusbudLogo />
                        <div style={{ display: 'flex', alignItems: 'flex-end', flexGrow: 1, padding: '0px 10px 3px 20px' }}>
                            Departures (Coding Challenge)
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        {departures.map((departure) => <DepartureCard key={departure.id} departure={departure} />)}
                    </div>
                </Col>
            </Row>
            {/* <Row>
                <Col sm>sm=true</Col>
                <Col sm>sm=true</Col>
                <Col sm>sm=true</Col>
            </Row> */}
        </Container>
    );
}

export default Home;