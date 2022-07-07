import React, { useContext, useState, useRef } from 'react';
import { Row, Col, Form, FloatingLabel, Popover, Overlay, Button } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSubtract, faLocationDot, faSearch } from '@fortawesome/free-solid-svg-icons';

import { TQueryParams, TLocation, PassengerProps, LocationProps, TDeparture, SelectionMenuProps, PassengerCardProps, PassengerCardButtonProps } from '../Types/Types';

import { fetchDepartures } from '../Connections/Connections';

import '../Styles/SelectionMenu.css';

import moment from 'moment';

const originAvailable = [{ id: 1, city: 'Québec City', state: 'Quebec', geoHash: 'f2m673' }];
const destinationAvailable = [{ id: 1, city: 'Montreal', state: 'Quebec', geoHash: 'f25dvk' }];
const initialQueryParams: TQueryParams = {
    adult: 1,
    child: 0,
    senior: 0,
    lang: 'EN',
    currency: 'CAD'
};

export const OnChangePassengersContext = React.createContext<((type: string, action: string) => void) | null>(null);

export const SelectionMenu = (props: SelectionMenuProps) => {
    const { setDepartures, setLoading, setMessage } = props;

    const todayDate = new Date();
    const format = "YYYY-MM-DD";
    const minDate = moment(todayDate).format(format);

    const [queryParams, setQueryParams] = useState<TQueryParams>(initialQueryParams);
    const [origin, setOrigin] = useState<TLocation>(originAvailable[0]);
    const [destination, setDestination] = useState<TLocation>(destinationAvailable[0]);
    const [date, setDate] = useState<string>(minDate);

    const [showDepartures, setShowDepartures] = useState<boolean>(false);
    const [showDestinations, setShowDestinations] = useState<boolean>(false);
    const [showPassengers, setShowPassengers] = useState<boolean>(false);

    const [targetOrigin, setTargetOrigin] = useState<any>(null);
    const [targetDestination, setTargetDestination] = useState<any>(null);
    const [targetPassengers, setTargetPassengers] = useState<any>(null);

    const refOrigin = useRef(null);
    const refDestination = useRef(null);
    const refPassengers = useRef(null);

    const { adult, child, senior } = queryParams;
    const passengersValue = adult + child + senior;

    const originValue = origin.city;
    const destinationValue = destination.city;

    window.addEventListener('click', (e) => {
        if (document) {
            HandlingClosePopOver(e, 'popover-contained-origin', 'fInputOrigin', setShowDepartures);
            HandlingClosePopOver(e, 'popover-contained-destination', 'fInputDestination', setShowDestinations);
            HandlingClosePopOver(e, 'popover-contained-passengers', 'fInputPassengers', setShowPassengers);
        }
    });

    const rowStyle = {
        margin: '20px 0px 20px 0px',
        borderRadius: '.25rem',
        backgroundColor: 'transparent'
    }

    const colStyle = {
        backgroundColor: 'white',
        border: '1px solid transparent',
        borderRadius: '.25rem',
        padding: '4px 4px 4px 4px',
        boxShadow: '0px 4px 4px hsl(206deg 48% 24% / 10%), 0px 4px 4px hsl(206deg 48% 24% / 10%)'
    }

    const OnshowDepartures = (event: any) => {
        setShowDepartures(!showDepartures);
        setTargetOrigin(event.target);
    };

    const OnshowDestinations = (event: any) => {
        setShowDestinations(!showDestinations);
        setTargetDestination(event.target);
    };

    const OnshowPassengers = (event: any) => {
        setShowPassengers(!showPassengers);
        setTargetPassengers(event.target);
    };

    const OnChange_Date = (event: any) => {
        const selectedDateString = event.target.value;
        setDate(selectedDateString);
    }

    const OnSearch = (event: any) => {
        FetchDeparturesFromAPI();
    };

    const OnChange_Origin = (_location: TLocation) => {
        setOrigin(_location);
        setShowDepartures(false);
    }

    const OnChange_Destination = (_location: TLocation) => {
        setDestination(_location);
        setShowDestinations(false);
    }

    const OnChangePassengers = (type: string, action: string) => {
        const previousValue = queryParams[type as keyof TQueryParams] as number;
        let newValue = (action === 'add') ? previousValue + 1 : previousValue - 1;

        if (newValue < 0) {
            newValue = 0;
        }

        setQueryParams(prevState => ({ ...prevState, [type]: newValue }))
    }

    const FetchDeparturesFromAPI = async () => {
        setMessage(null);
        setDepartures([]);
        setLoading(true);

        const data = await fetchDepartures(origin.geoHash, destination.geoHash, date, queryParams);

        setLoading(false);

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

    return (
        <Row className={"g-2"} style={rowStyle}>
            <Col sm={6} md={3} lg={3} style={colStyle}>
                <FloatingLabel controlId="fInputOrigin" label="Origin" onClick={OnshowDepartures}>
                    <Form.Control placeholder="origin" value={originValue} className={'f-control'} />
                </FloatingLabel>
            </Col>
            <Col sm={6} md={3} lg={3} style={colStyle}>
                <FloatingLabel controlId="fInputDestination" label="Destination" onClick={OnshowDestinations} >
                    <Form.Control placeholder="destination" value={destinationValue} className={'f-control'} />
                </FloatingLabel>
            </Col>
            <Col sm={4} md={2} lg={2} style={colStyle}>
                <FloatingLabel label="Date">
                    <Form.Control type="date" name="dob" placeholder="date" min={minDate} onChange={OnChange_Date} value={date} className={'f-control'} />
                </FloatingLabel>
            </Col>
            <Col sm={4} md={2} lg={2} style={colStyle}>
                <FloatingLabel controlId="fInputPassengers" label="Passengers" onClick={OnshowPassengers}>
                    <Form.Control placeholder="passengers" value={passengersValue} className={'f-control'} />
                </FloatingLabel>

            </Col>
            <Col sm={4} md={2} lg={2}>
                <div className='cButton' onClick={OnSearch}>
                    <FontAwesomeIcon icon={faSearch} style={{ width: '18px', height: '18px', marginRight: '10px' }} color={'white'} />
                    Search
                </div>
            </Col>

            {/* PopOvers */}
            <LocationPopOver
                title={'Origin'}
                visible={showDepartures}
                listItems={originAvailable}
                onChange={OnChange_Origin}
                target={targetOrigin}
                refLocation={refOrigin}
            />
            <LocationPopOver
                title={'Destination'}
                visible={showDestinations}
                listItems={destinationAvailable}
                onChange={OnChange_Destination}
                target={targetDestination}
                refLocation={refDestination}
            />
            <OnChangePassengersContext.Provider value={OnChangePassengers}>
                <PassengersPopOver
                    title={'Passengers'}
                    visible={showPassengers}
                    target={targetPassengers}
                    refPassengers={refPassengers}
                    queryParams={queryParams}
                />
            </OnChangePassengersContext.Provider>
        </Row>
    )
}

export const LocationPopOver = (props: LocationProps) => {
    const { title, visible, listItems, onChange, target, refLocation } = props;

    return (
        <div ref={refLocation}>
            <Overlay
                show={visible}
                target={target}
                placement="bottom-start"
                container={refLocation}
                containerPadding={20}
                transition={true}
            >
                <Popover id={`popover-contained-${title.toLocaleLowerCase()}`}>
                    {/* <Popover.Header as="h3">{title}</Popover.Header> */}
                    <Popover.Body>
                        <div className='l-popover-container'>
                            {listItems.map(item => {
                                const { id, city, state } = item;

                                return (
                                    <div key={id} className={'card-location'} onClick={() => onChange(item)}>
                                        <FontAwesomeIcon icon={faLocationDot} style={{ width: '18px', height: '18px' }} color={'#717578'} />
                                        <div className='loc-name bold'>{city},</div>
                                        <div className='loc-name'>{state}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </Popover.Body>
                </Popover>
            </Overlay>
        </div>
    )
}

export const PassengersPopOver = (props: PassengerProps) => {
    const { title, visible, target, refPassengers, queryParams } = props;

    const { adult, child, senior } = queryParams;

    return (
        <div ref={refPassengers}>
            <Overlay
                show={visible}
                target={target}
                placement="bottom-start"
                container={refPassengers}
                containerPadding={20}
                transition={true}
            >
                <Popover id={`popover-contained-${title.toLocaleLowerCase()}`}>
                    <Popover.Body>
                        <div className='p-popover-container'>
                            <PassengerCard title={'Adults'} type={'adult'} value={adult} hasSeparator={true} />
                            <PassengerCard title={'Children'} type={'child'} value={child} hasSeparator={true} />
                            <PassengerCard title={'Seniors'} type={'senior'} value={senior} hasSeparator={false} />
                        </div>
                    </Popover.Body>
                </Popover>
            </Overlay>
        </div>
    )
}

const PassengerCard = (props: PassengerCardProps) => {
    const { title, type, value, hasSeparator } = props;

    const containerClass = (hasSeparator) ? 'p-card-container has-separator' : 'p-card-container';

    const active = (value > 0);

    return (
        <div className={containerClass}>
            <div style={{ flexGrow: 1 }}>
                <div className='p-card-container-text bold'>{title}</div>
            </div>
            <PassengerCardButton icon={faSubtract} type={type} action={'remove'} active={active} />
            <div>
                <div className='p-card-container-text'>{value}</div>
            </div>
            <PassengerCardButton icon={faPlus} type={type} action={'add'} active={true} />
        </div>
    )
}

const PassengerCardButton = (props: PassengerCardButtonProps) => {
    const { icon, type, action, active } = props;

    const iconSize = '16px';

    const onChange = useContext(OnChangePassengersContext) as ((type: string, action: string) => void);

    return (
        <Button className='p-card-button-container' onClick={() => onChange(type, action)} disabled={!active}>
            <div className='p-card-button-sub-container'>
                <FontAwesomeIcon icon={icon} style={{ width: iconSize, height: iconSize }} color={'#717578'} />
            </div>
        </Button>
    )
}

const HandlingClosePopOver = (e: MouseEvent, popOverId: string, inputId: string, clickEvent: React.Dispatch<React.SetStateAction<boolean>>) => {
    const popOverElement = document.getElementById(popOverId);
    const inputElement = document.getElementById(inputId);

    let clickedOnInputOrPopOver = false;

    if (popOverElement && popOverElement.contains(e.target as HTMLElement)) {
        clickedOnInputOrPopOver = true;

        if (inputId === 'fInputPassengers') {
            inputElement?.focus();
        }
    }
    if (inputElement && inputElement.contains(e.target as HTMLElement)) {
        clickedOnInputOrPopOver = true;
    }

    if (!clickedOnInputOrPopOver) {
        clickEvent(false);
    }
}