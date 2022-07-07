import React, { useState, useEffect, useRef } from 'react';

import { Container, Row, Col, Alert } from 'react-bootstrap';

import { fetchDepartures, TQueryParams } from '../Connections/connections';

import { BusbudLogo } from '../Components/Icons';
import { SelectionMenu, LocationPopOver, PassengersPopOver } from '../Components/SelectionMenu';
import { DepartureCard } from '../Components/DepartureCard';

// export const origin = "f2m673"; //(Québec - geohash: f2m673)
// export const destination = "f25dvk"; //(Montréal - geohash: f25dvk)
// export const date = "2022-08-02"; //(the 2nd of August 2021) for 1 adult.

import './Home.css';

export const initialQueryParams: TQueryParams = {
    adult: 1,
    child: 0,
    senior: 0,
    lang: 'EN',
    currency: 'CAD'
};

const busbudColorLight = 'transparent';
const busbudColorDark = 'rgb(208 243 255)'//'#def7fb'//'#edfcf9';
const titleTextColor = '#0274ca';


const originAvailable = [{ id: 1, city: 'Québec City', state: 'Quebec', geoHash: 'f2m673' }];
const destinationAvailable = [{ id: 1, city: 'Montreal', state: 'Quebec', geoHash: 'f25dvk' }];

export interface TLocation {
    id: number,
    city: string,
    state: string,
    geoHash: string
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
interface TMessage {
    details: string;
    type: string
}

export const OnChangeSmallButtonContext = React.createContext<((type: string, action: string) => void) | null>(null);
export const QueryParamsContext = React.createContext<TQueryParams | null>(null);

const Home = () => {
    const [queryParams, setQueryParams] = useState<TQueryParams>(initialQueryParams);
    const [origin, setOrigin] = useState<TLocation>(originAvailable[0]);
    const [destination, setDestination] = useState<TLocation>(destinationAvailable[0]);
    const [date, setDate] = useState<string>('2022-07-05');
    const [message, setMessage] = useState<TMessage | null>(null);

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

    const OnChange_Origin = (_location: TLocation) => {
        setOrigin(_location);
    }

    const OnChange_Destination = (_location: TLocation) => {
        setDestination(_location);
    }

    const OnChange_Date = (event: any) => {
        const selectedDateString = event.target.value;
        setDate(selectedDateString);
    }

    const OnChangeSmallButton = (type: string, action: string) => {
        const previousValue = queryParams[type as keyof TQueryParams] as number;
        const newValue = (action === 'add') ? previousValue + 1 : previousValue - 1;

        setQueryParams(prevState => ({ ...prevState, [type]: newValue }))
    }

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

    const clickSearch = (event: any) => {
        fetchDeparturesFromAPI();
    };

    const fetchDeparturesFromAPI = async () => {
        setDepartures([]);

        const data = await fetchDepartures(origin.geoHash, destination.geoHash, date, queryParams);

        console.log('RESULT = ', data);

        if (data && data.error) {
            setMessage({ type: 'danger', details: data.error.details });
            return;
        }

        if (data && (!data.departures || data.departures.length < 1)) {
            setMessage({ type: 'warning', details: 'We could not find any departure for this search. Please, try later or chose another departure date.' });
            return;
        }

        const _locations = data.locations;
        const _cities = data.cities;

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
    }

    useEffect(() => {
        //fetchDeparturesFromAPI();
    }, []);

    const { adult, child, senior } = queryParams;
    const passengersValue = adult + child + senior;

    const originValue = origin.city;
    const destinationValue = destination.city;

    return (
        <div className="HomeContainer" >
            <div style={{ backgroundColor: busbudColorDark, paddingBottom: '20px' }}>
                <Container>
                    <Row>
                        <Col>
                            <div style={{ display: 'flex', color: titleTextColor, justifyContent: 'flex-start', padding: '4px 10px 4px 10px' }}>
                                <BusbudLogo />
                                <div style={{ display: 'flex', alignItems: 'flex-end', flexGrow: 1, padding: '0px 10px 3px 20px' }}>
                                    Departures (Coding Challenge)
                                </div>
                            </div>
                        </Col>
                    </Row>

                    {SelectionMenu(
                        clickShowDepartures,
                        clickShowDestinations,
                        clickShowPassengers,
                        setShowDepartures,
                        setShowDestinations,
                        setShowPassengers,
                        OnChange_Date,
                        clickSearch,
                        originValue,
                        destinationValue,
                        date,
                        passengersValue
                    )}
                </Container>
            </div>
            <div style={{ background: busbudColorLight }}>
                <Container>
                    <Row>
                        <Col sm={3}>

                        </Col>
                        <Col sm={6}>
                            {message && (
                                <Alert variant={message.type} onClose={() => setMessage(null)} dismissible>
                                    <Alert.Heading>{(message.type === 'danger') ? 'Error!' : 'Sorry,'}</Alert.Heading>
                                    <p>
                                        {message.details}
                                    </p>
                                </Alert>
                            )}
                        </Col>
                        <Col sm={3}></Col>
                    </Row>
                    <Row>
                        <Col sm={3}>

                        </Col>
                        <Col sm={6}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                {departures.map((departure) => <DepartureCard key={departure.id} departure={departure} />)}
                            </div>
                        </Col>
                        <Col sm={3}></Col>
                    </Row>
                </Container>

                {LocationPopOver('Origin', showDepartures, originAvailable, OnChange_Origin, targetOrigin, refOrigin)}
                {LocationPopOver('Destination', showDestinations, destinationAvailable, OnChange_Destination, targetDestination, refDestination)}

                <QueryParamsContext.Provider value={queryParams}>
                    <OnChangeSmallButtonContext.Provider value={OnChangeSmallButton}>
                        <PassengersPopOver
                            title={'Passengers'}
                            visible={showPassengers}
                            target={targetPassengers}
                            refPassengers={refPassengers}
                        />
                    </OnChangeSmallButtonContext.Provider>
                </QueryParamsContext.Provider>
            </div>
        </div>
    );
}

export default Home;