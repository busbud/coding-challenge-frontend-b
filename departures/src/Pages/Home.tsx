import { useState, useEffect, useRef } from 'react';

import { Container, Row, Col } from 'react-bootstrap';



import { fetchDepartures, TQueryParams } from '../Connections/connections';

import { BusbudLogo } from '../Components/Icons';
import { SelectionMenu, LocationPopOver, PassengersPopOver } from '../Components/SelectionMenu';
import { DepartureCard } from '../Components/DepartureCard';

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

const busbudColorLight = 'transparent'//'#edfcf9';
const busbudColorDark = '#def7fb'//'#edfcf9';
const titleTextColor = '#0274ca';


const originAvailable = [{ id: 1, city: 'Québec City', state: 'Quebec' }];
const destinationAvailable = [{ id: 1, city: 'Montreal', state: 'Quebec' }];

export interface TLocation {
    id: number,
    city: string,
    state: string
}
export interface TDeparture {
    id: string,
    departureTime: string,
    arrivalTime: string,
    locationName_Origin: string,
    locationName_Destination: string,
    price: number,
    currency: string
}

const Home = () => {
    const [departures, setDepartures] = useState<Array<TDeparture>>([]);
    const [showDepartures, setShowDepartures] = useState<boolean>(false);
    const [showDestinations, setShowDestinations] = useState<boolean>(false);
    const [showPassengers, setShowPassengers] = useState<boolean>(false);
    const [targetOrigin, setTargetOrigin] = useState<any>(null);
    const [targetDestination, setTargetDestination] = useState<any>(null);
    const [targetPassengers, setTargetPassengers] = useState<any>(null);
    const refOrigin = useRef(null);
    const refDestination = useRef(null);
    const refPassengers = useRef(null);

    const clickShowDepartures = (event: any) => {
        setShowDepartures(!showDepartures);
        setTargetOrigin(event.target);
    };

    const clickShowDestinations = (event: any) => {
        setShowDestinations(!showDestinations);
        setTargetDestination(event.target);
    };

    const clickShowPassengers = (event: any) => {
        setShowPassengers(!showPassengers);
        setTargetPassengers(event.target);
    };

    const fetchDeparturesFromAPI = async () => {
        const data = await fetchDepartures(origin, destination, date, queryParams);

        const _locations = data.locations;
        const _cities = data.cities;

        console.log('DATA ', data);

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
                price: item.prices.total,
                currency: item.prices.currency
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
            <Container style={{ backgroundColor: busbudColorLight }}>
                <Row style={{ backgroundColor: busbudColorDark }}>
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
                    <Col sm={2}></Col>
                    <Col sm={8}>
                        {SelectionMenu(
                            clickShowDepartures,
                            clickShowDestinations,
                            clickShowPassengers,
                            setShowDepartures,
                            setShowDestinations,
                            setShowPassengers
                        )}
                    </Col>
                    <Col sm={2}></Col>
                </Row>
                <Row>
                    <Col sm={3}></Col>
                    <Col sm={6}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            {departures.map((departure) => <DepartureCard key={departure.id} departure={departure} />)}
                        </div>
                    </Col>
                    <Col sm={3}></Col>
                </Row>
            </Container>

            {LocationPopOver('Origin', showDepartures, originAvailable, targetOrigin, refOrigin)}
            {LocationPopOver('Destination', showDestinations, destinationAvailable, targetDestination, refDestination)}
            {PassengersPopOver('Passengers', showPassengers, targetPassengers, refPassengers)}
        </div>
    );
}

export default Home;